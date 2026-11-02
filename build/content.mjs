import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {parse as csv} from 'csv-parse/sync';

export const root=process.cwd();
export function walk(dir){return fs.existsSync(dir)?fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name,'en')).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]):[];}
export function read(file){return fs.readFileSync(path.resolve(root,file),'utf8');}
export function front(text){
  const m=text.match(/^(?:---|\/\*\s*@frontmatter)\s*\r?\n([\s\S]*?)^(?:---|\*\/)\s*\r?\n?/m);
  return m&&m.index===0?{data:YAML.parse(m[1])||{},body:text.slice(m[0].length)}:{data:{},body:text};
}
export function merge(a,b){const out={...a};for(const [k,v] of Object.entries(b))out[k]=v&&typeof v==='object'&&!Array.isArray(v)&&out[k]&&typeof out[k]==='object'&&!Array.isArray(out[k])?merge(out[k],v):v;return out;}
export function load(){
  const config=YAML.parse(read('_config.yml'));
  const data={};
  for(const file of walk('theme/minimal-mistakes/_data')){
    const ext=path.extname(file),name=path.basename(file,ext);
    if(['.yml','.yaml'].includes(ext))data[name]=YAML.parse(read(file));
  }
  for(const file of walk('_data')){
    const ext=path.extname(file),name=path.basename(file,ext);
    if(['.yml','.yaml'].includes(ext))data[name]=merge(data[name]||{},YAML.parse(read(file)));
    if(ext==='.csv')data[name]=csv(read(file),{columns:true,skip_empty_lines:true,bom:true}).map(row=>Object.fromEntries(Object.entries(row).map(([k,v])=>[k,v===''?null:v])));
  }
  const site={...config,data,posts:[],related_posts:[],time:new Date(process.env.SOURCE_DATE_EPOCH?Number(process.env.SOURCE_DATE_EPOCH)*1000:Date.now()).toISOString()};
  const documents=[],urlMap=new Map();
  function doc(file,collection){
    const {data:meta,body}=front(read(file));let defaults={};
    for(const d of config.defaults||[]){const s=d.scope||{};if((!s.type||s.type===collection)&&(!s.path||file.startsWith(s.path)))defaults=merge(defaults,d.values||{});}
    const p=merge(defaults,meta);p.path=file;p.relative_path=file;p.collection=collection||p.collection;p.explicitDate=!!p.date;
    if(collection&&!p.date)p.date=new Date(process.env.SOURCE_DATE_EPOCH?Number(process.env.SOURCE_DATE_EPOCH)*1000:fs.statSync(file).mtimeMs).toISOString();
    p.slug=path.basename(file,path.extname(file));
    p.url=p.permalink||(collection?(collection==='docs'?`/${p.slug}.html`:`/${collection}/${file.slice(collection.length+2).replace(/\.md$/,'.html')}`):`/${p.slug}.html`);
    if(file==='index.md')p.url='/';
    if(file==='404.md')p.url='/404.html';
    p.output=p.url.endsWith('/')?`${p.url}index.html`:p.url;
    p.raw=body;p.content=body;p.id=p.url.replace(/\.html$/,'');
    documents.push(p);urlMap.set('/'+file,p.url);return p;
  }
  for(const name of Object.keys(config.collections)){
    site[name]=walk('_'+name).filter(f=>f.endsWith('.md')).map(f=>doc(f,name));
    site[name].sort((a,b)=>(a.explicitDate&&b.explicitDate?(Date.parse(a.date)||0)-(Date.parse(b.date)||0):0)||(a.path<b.path?-1:a.path>b.path?1:0));
    site[name].forEach((p,i,items)=>{const adjacent=x=>x?{url:x.url,title:x.title}:null;p.previous=adjacent(items[i-1]);p.next=adjacent(items[i+1]);});
    if(config.collections[name].output===false)for(const p of site[name])p.hiddenOutput=true;
  }
  for(const file of [...walk('_pages').filter(f=>f.endsWith('.md')),'index.md','404.md','settings.yaml'])doc(file);
  const index=front(read('index.json'));
  const redirects=walk('redirects').filter(f=>/\.ya?ml$/.test(f)).map(f=>front(read(f)).data);
  for(const p of documents)for(const from of [].concat(p.redirect_from||[]))redirects.push({permalink:from,redirect_to:p.url});
  return {site,config,documents,urlMap,index,redirects};
}
