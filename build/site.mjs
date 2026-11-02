import fs from 'node:fs';
import path from 'node:path';
import {minify as minifyJS} from 'terser';
import {load,walk,read,front} from './content.mjs';
import {renderer} from './render.mjs';
import {writeWebp} from './images.mjs';

let state;
export async function prepare(){
  if(state)return state;
  const model=load(),r=renderer(model);state={model,r};
  for(const p of model.documents){p.rendered=await r.body(p);p.content=p.rendered;}
  return state;
}
export async function renderPage(p){return (await prepare()).r.page(p);}
const xml=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function output(out,file,value){const p=path.join(out,file.replace(/^\//,''));fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,value);}
export async function assets(out){
  const {model,r}=await prepare();
  for(const dir of ['theme/minimal-mistakes/assets','theme/minimal-mistakes/prebuilt/assets','assets'])for(const file of walk(dir)){
    const rel=path.relative(dir,file);if(/\.(?:scss|map)$/.test(rel))continue;
    const p=path.join(out,'assets',rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(file,p);
  }
  fs.copyFileSync('favicon.ico',path.join(out,'favicon.ico'));
  for(const [target,inputs] of Object.entries(model.config.post_process.terser)){
    const code=[];
    for(const input of inputs){
      const source=['.'+input,'theme/minimal-mistakes'+input].find(f=>fs.existsSync(f));if(!source)throw Error('Missing script '+input);
      const original=read(source),parsed=front(original);
      code.push(parsed.body===original?original:await r.template(parsed.body,{url:input,layout:null}));
    }
    const result=await minifyJS(code.join(';'));output(out,target,result.code);
  }
  for(const p of [...model.config.post_process.remove_files,...model.config.post_process.remove_dirs])fs.rmSync(path.join(out,p.replace(/^\//,'')),{force:true,recursive:true});
  // Styles are deliberately pinned to the published version for the first migration.
  const cssDir='theme/minimal-mistakes/prebuilt/assets/css';
  for(const p of walk(cssDir))output(out,'assets/css/'+path.relative(cssDir,p),fs.readFileSync(p));
  await writeWebp(out,model.images);
  const index=await r.template(model.index.body,model.index.data);JSON.parse(index);output(out,'index.json',index);
  const redirects={};
  for(const d of model.redirects){
    const to=d.redirect_to.startsWith('/')?model.site.url+d.redirect_to:d.redirect_to;redirects[d.permalink]=to;
    output(out,d.permalink,`<!DOCTYPE html>\n<html lang="en-US">\n  <meta charset="utf-8">\n  <title>Redirecting&hellip;</title>\n  <link rel="canonical" href="${xml(to)}">\n  <script>location=${JSON.stringify(to)}</script>\n  <meta http-equiv="refresh" content="0; url=${xml(to)}">\n  <meta name="robots" content="noindex">\n  <h1>Redirecting&hellip;</h1>\n  <a href="${xml(to)}">Click here if you are not redirected.</a>\n</html>\n`);
  }
  output(out,'redirects.json',JSON.stringify(redirects));
  const date=s=>s?r.liquid.filters.date_to_xmlschema(s):model.site.time;
  const feed=(collection)=>{
    const file=collection?`feed/${collection}.xml`:'feed.xml';const url=model.site.url+'/'+file;
    const docs=collection?[...model.site[collection]].filter(p=>p.date).sort((a,b)=>new Date(a.date)-new Date(b.date)).reverse().slice(0,10):[];
    const entries=docs.map(p=>`<entry><title type="html">${xml(xml(p.title))}</title><link href="${xml(model.site.url+p.url)}" rel="alternate" type="text/html" title="${xml(p.title)}"/><published>${date(p.date)}</published><updated>${date(p.last_modified_at||p.date)}</updated><id>${xml(model.site.url+p.id)}</id><content type="html" xml:base="${xml(model.site.url+p.url)}"><![CDATA[${p.rendered.replaceAll(']]>',']]]]><![CDATA[>')}]]></content>${p.author?`<author><name>${xml(p.author)}</name></author>`:''}${p.excerpt?`<summary type="html">${xml(r.markdown.render(p.excerpt).trim())}</summary>`:''}</entry>`).join('');
    output(out,file,`<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><generator uri="https://www.11ty.dev/">Eleventy</generator><link href="${url}" rel="self" type="application/atom+xml"/><link href="${model.site.url}/" rel="alternate" type="text/html"/><updated>${model.site.time}</updated><id>${url}</id><title type="html">${xml(model.site.title+(collection?' | '+collection[0].toUpperCase()+collection.slice(1):''))}</title><subtitle>${xml(model.site.description)}</subtitle>${entries}</feed>`);
  };
  feed();for(const name of model.config.feed.collections)feed(name);
  const urls=model.documents.filter(p=>!p.hiddenOutput).map(p=>p.url).concat(Object.keys(redirects));
  output(out,'sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${xml(model.site.url+u)}</loc></url>`).join('')}</urlset>`);
  output(out,'robots.txt',`Sitemap: ${model.site.url}/sitemap.xml\n`);
}
