import fs from 'node:fs';
import path from 'node:path';
import {Liquid} from 'liquidjs';
import {minify} from 'html-minifier-terser';
import {front,read} from './content.mjs';
import {makeMarkdown} from './markdown.mjs';

export function renderer(model){
  const markdown=makeMarkdown(model);
  const liquid=new Liquid({jsTruthy:false,strictFilters:true,strictVariables:false,dynamicPartials:false,dateTimezoneOffset:480});
  const cache=new Map();
  function includeFile(name){
    name=name.replace(/^\//,'');if(name.includes('..'))throw Error('Invalid include path');
    for(const base of ['_includes','theme/minimal-mistakes/_includes'])for(const ext of ['', '.html']){const p=path.join(base,name+ext);if(fs.existsSync(p))return read(p);}
    throw Error('Missing include: '+name);
  }
  for(const tag of ['include','include_cached'])liquid.registerTag(tag,{
    parse(token){
      const match=token.args.match(/^(\S+)\s*([\s\S]*)$/);this.name=match[1].replace(/^['"]|['"]$/g,'');this.args=[];
      const regex=/(\w+)\s*=\s*("[^"]*"|'[^']*'|[^\s]+)/g;let m;
      while((m=regex.exec(match[2])))this.args.push([m[1],m[2]]);
    },
    *render(ctx){
      if(this.name==='toc'&&!this.args.length)return '<!-- HMCL_INLINE_TOC -->';
      const args={};for(const [k,v] of this.args)args[k]=yield liquid.evalValue(v,ctx);
      if(this.name==='toc.html')return markdown.toc(args.html||'',args.class||'toc__menu',args.id);
      const source=includeFile(this.name);if(!cache.has(source))cache.set(source,liquid.parse(source));
      return yield liquid.render(cache.get(source),{...ctx.getAll(),include:args});
    }
  });
  liquid.registerFilter('markdownify',s=>markdown.render(s));
  liquid.registerFilter('relative_url',s=>typeof s==='string'?`${model.site.baseurl||''}${markdown.relative(s)}`:s);
  liquid.registerFilter('absolute_url',s=>s===undefined||s===null?'':new URL(markdown.relative(String(s)),model.site.url+'/').href);
  liquid.registerFilter('jsonify',s=>JSON.stringify(s??null));
  liquid.registerFilter('date_to_xmlschema',s=>typeof s==='string'?s.replace(' ','T').replace(/\s([+-]\d\d)(\d\d)$/,'$1:$2'):new Date(s).toISOString());
  liquid.registerFilter('version_sort',(xs,key)=>[...(xs||[])].sort((a,b)=>{const x=a[key].split('.').map(Number),y=b[key].split('.').map(Number);for(let i=0;i<Math.max(x.length,y.length);i++){const n=(x[i]||0)-(y[i]||0);if(n)return n;}return 0;}));
  liquid.registerFilter('number_of_words',s=>String(s||'').trim().split(/\s+/).length);
  liquid.registerFilter('smartify',s=>s);
  liquid.registerFilter('normalize_whitespace',s=>String(s||'').replace(/\s+/g,' '));
  const context=(p,extra={})=>({site:model.site,page:p,jekyll:{environment:'production'},...extra});
  async function template(s,p,extra){return liquid.parseAndRender(s,context(p,extra));}
  async function body(p){
    let value=await template(p.raw,p);
    value=markdown.render(value);
    value=value.replace('<!-- HMCL_INLINE_TOC -->',markdown.inlineTOC(value));
    return value;
  }
  async function page(p){
    let content=p.rendered;let name=p.layout;const seen=new Set();
    while(name&&name!=='compress'){
      if(seen.has(name))throw Error('Cyclic layout '+name);seen.add(name);
      let file=['_layouts','theme/minimal-mistakes/_layouts'].map(d=>path.join(d,name+'.html')).find(f=>fs.existsSync(f));
      if(!file)throw Error('Missing layout '+name);
      const layout=front(read(file));content=await template(layout.body,p,{content,layout:layout.data});name=layout.data.layout;
    }
    content=content.replace(/<p class="page__meta">[\s\S]*?<\/p>/g,p=>p.replace(/\s+/g,' ').replace(/ +<\/p>/g,'</p>'));
    const result=await minify(content,{collapseWhitespace:true,ignoreCustomFragments:[/<p class="page__meta">[\s\S]*?<\/p>/,/<picture>[\s\S]*?<\/picture>/],removeComments:true,keepClosingSlash:true,caseSensitive:true,removeOptionalTags:false});
    return result.replace(/<br\s*\/?>(?!\s)/g,'<br /> ');
  }
  return {liquid,markdown,template,body,page};
}
