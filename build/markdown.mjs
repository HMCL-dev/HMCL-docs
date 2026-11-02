import MarkdownIt from 'markdown-it';
import attrs from 'markdown-it-attrs';
import footnotes from 'markdown-it-footnote';
import hljs from 'highlight.js';
import {load as html} from 'cheerio';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {planImages} from './images.mjs';

const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function makeMarkdown(model){
  const codeCache=JSON.parse(fs.readFileSync('theme/compat-code.json','utf8')).entries;
  const images=model.images??=planImages();
  const md=new MarkdownIt({html:true,breaks:false,linkify:false,typographer:true,quotes:'“”‘’',xhtmlOut:true}).use(attrs).use(footnotes);
  md.normalizeLink=s=>s.replace(/ /g,'%20');
  md.renderer.rules.s_open=()=>'<del>';md.renderer.rules.s_close=()=>'</del>';
  md.renderer.rules.ordered_list_open=(ts,i,opts,env,self)=>{ts[i].attrs=(ts[i].attrs||[]).filter(([k])=>k!=='start');return self.renderToken(ts,i,opts);};
  md.renderer.rules.heading_open=(ts,i,opts,env,self)=>{ts[i].attrSet('data-hmcl-heading','');return self.renderToken(ts,i,opts);};
  md.renderer.rules.table_open=()=>'<table data-hmcl-table="">\n';
  const footLabel=(t,e)=>e.footnotes.list[t.meta.id]?.label||String(t.meta.id+1);
  md.renderer.rules.footnote_ref=(ts,i,o,e)=>{const t=ts[i],label=footLabel(t,e),suffix=t.meta.subId?':'+t.meta.subId:'';return `<sup id="fnref:${label}${suffix}"><a href="#fn:${label}" class="footnote" rel="footnote" role="doc-noteref">${t.meta.id+1}</a></sup>`;};
  md.renderer.rules.footnote_block_open=()=>'<div class="footnotes" role="doc-endnotes"><ol>';
  md.renderer.rules.footnote_block_close=()=>'</ol></div>';
  md.renderer.rules.footnote_open=(ts,i,o,e)=>`<li id="fn:${footLabel(ts[i],e)}">`;
  md.renderer.rules.footnote_anchor=(ts,i,o,e)=>`&nbsp;<a href="#fnref:${footLabel(ts[i],e)}" class="reversefootnote" role="doc-backlink">↩</a>`;
  md.core.ruler.disable(['replacements','smartquotes']);
  // Separate typographic symbols from text just as Kramdown's AST does.
  // This matters when its GitHub-reference plugin wraps one text node in a span.
  const typographyBoundary='\uE000';
  md.renderer.rules.text=(ts,i)=>escape(ts[i].content).replaceAll(typographyBoundary,'<!-- HMCL_TYPOGRAPHY -->');
  md.core.ruler.after('inline','kramdown_typography',state=>{
    const symbol=s=>typographyBoundary+s+typographyBoundary;
    function visit(tokens){for(const token of tokens){
      if(token.type==='text')token.content=token.content.replace(/\.\.\./g,()=>symbol('…')).replace(/---/g,()=>symbol('—')).replace(/--/g,()=>symbol('–')).replace(/["']/g,(q,i,s)=>{
        const prev=s[i-1]||'',next=s[i+1]||'';
        const close=(prev&&!/[\s\\\[{(\-]/.test(prev))||!next||/\s/.test(next)||next==='s'&&!/\w/.test(s[i+2]||'');
        return symbol(q==='"'?(close?'”':'“'):(close?'’':'‘'));
      });
      if(token.children)visit(token.children);
    }}visit(state.tokens);
  });
  // Kramdown accepts emphasis delimiters next to CJK/punctuation where CommonMark differs.
  md.inline.ruler.before('emphasis','kramdown_emphasis',(state,silent)=>{
    if(state.src[state.pos]!=='*')return false;
    const width=state.src[state.pos+1]==='*'?2:1,marker='*'.repeat(width),start=state.pos+width;
    if(/\s/.test(state.src[start]||' '))return false;
    let end=state.src.indexOf(marker,start);
    while(end>=0&&(/\s/.test(state.src[end-1])||(width===1&&(state.src[end+1]==='*'||state.src[end-1]==='*'))))end=state.src.indexOf(marker,end+width);
    if(end<0)return false;
    if(!silent){const tag=width===2?'strong':'em';state.push(tag+'_open',tag,1);state.md.inline.parse(state.src.slice(start,end),state.md,state.env,state.tokens);state.push(tag+'_close',tag,-1);}
    state.pos=end+width;return true;
  });
  md.renderer.rules.code_inline=(ts,i)=>`<code class="language-plaintext highlighter-rouge">${escape(ts[i].content)}</code>`;
  md.renderer.rules.fence=(ts,i)=>{
    const t=ts[i],lang=t.info.trim().split(/\s/)[0]||'plaintext';
    const key=lang+':'+crypto.createHash('sha256').update(t.content).digest('hex');
    let content=codeCache[key]??escape(t.content);
    if(!Object.hasOwn(codeCache,key)&&hljs.getLanguage(lang)&&lang!=='plaintext')content=hljs.highlight(t.content,{language:lang,ignoreIllegals:true}).value.replace(/class="hljs-([^" ]+)(?: [^"]*)?"/g,(_,name)=>`class="${({keyword:'k',built_in:'nb',type:'kt',literal:'kc',number:'mi',string:'s',comment:'c',title:'nf',attr:'na',variable:'nv',meta:'cp',params:'n',symbol:'ss',regexp:'sr',punctuation:'p',operator:'o'})[name]||'n'}"`);
    return `<div class="language-${lang} highlighter-rouge"${t.info.includes('hmcl-tight-li')?' data-hmcl-tight-list=""':''}><div class="highlight"><pre class="highlight"><code>${content}</code></pre></div></div>\n`;
  };
  function relative(input){
    if(typeof input!=='string')return input;
    const match=input.match(/^([^?#]*)([?#][\s\S]*)?$/),base=match[1];
    return (model.urlMap.get(base)||base)+(match[2]||'');
  }
  function render(source){
    let tocInline=false;
    source=String(source??'').replace(/<!---->/g,'').replace(/^(\s*\d+)\)/gm,'$1\\)').replace(/\* This will become a table of contents[\s\S]*?\{:\s*toc\s*\}/g,()=>{tocInline=true;return '<!-- HMCL_INLINE_TOC -->';});
    source=source.replace(/^(\d+\. [^\n]*\n)(```[^\n]*\n[\s\S]*?\n```)/gm,(_,item,code)=>item+code.replace(/\n/,' hmcl-tight-li\n').split('\n').map(line=>'   '+line).join('\n'));
    // Kramdown block attribute lists attach to the preceding block.
    source=source.replace(/^\{:\s*([^}]+)\}\s*$/gm,(_,a)=>`\n<hmcl-attrs data-attrs="${escape(a.trim())}"></hmcl-attrs>\n`);
    let result=md.render(source);
    const $=html(result,null,false),ids=new Map();
    $('table[data-hmcl-table]').removeAttr('data-hmcl-table').find('td').each((_,e)=>{if(!$(e).contents().length)$(e).html('&nbsp;');});
    $('h1[id=""],h2[id=""],h3[id=""],h4[id=""],h5[id=""],h6[id=""]').removeAttr('id');
    $('li > p:first-child').each((_,e)=>{const p=$(e);if(p.siblings('[data-hmcl-tight-list]').length&&p.parent().children('p').length===1)p.replaceWith(p.html());});
    $('[data-hmcl-tight-list]').removeAttr('data-hmcl-tight-list');
    if(/<li[ >]/.test(source))$('li').each((_,e)=>{
      const el=$(e);if(el.find('br,table,ul,ol,p').length||!el.text().includes(' | '))return;
      const cells=el.text().split(/\s*\|\s*/);el.html(`<table><tbody><tr>${cells.map(s=>`<td>${escape(s)}</td>`).join('')}</tr></tbody></table>`);
    });
    $('hmcl-attrs').each((_,e)=>{
      const marker=$(e),container=marker.parent().is('p')&&marker.parent().text().trim()===''?marker.parent():marker,prev=container.prev();
      for(const item of marker.attr('data-attrs').match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)||[]){if(item.startsWith('.'))prev.addClass(item.slice(1));else if(item.startsWith('#'))prev.attr('id',item.slice(1));}
      container.remove();
    });
    $('[data-hmcl-heading]').each((_,e)=>{
      $(e).removeAttr('data-hmcl-heading');
      const el=$(e);if(el.attr('id'))return;
      let id=el.text().trim().toLowerCase().replace(/\s/g,'-').replace(/[^\p{L}\p{N}\p{M}_-]/gu,'');
      if(!id)id='section';const n=ids.get(id)||0;ids.set(id,n+1);el.attr('id',id+(n?`-${n}`:''));
    });
    $('blockquote').each((_,e)=>{
      const q=$(e),p=q.children('p').first();if(!p.length)return;
      const first=p.contents().first();if(first[0]?.type!=='text')return;
      const m=first.text().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\n|$)/i);
      if(m){q.addClass({'note':'notice--info','tip':'notice--success','important':'notice--primary','warning':'notice--warning','caution':'notice--danger'}[m[1].toLowerCase()]);first[0].data=first[0].data.slice(m[0].length);}
    });
    $('a[href],img[src],script[src]').each((_,e)=>{const el=$(e),a=e.name==='a'?'href':'src';el.attr(a,relative(el.attr(a)));});
    $('img').each((_,e)=>{
      const el=$(e),src=el.attr('src');
      if(el.closest('picture').length||!src?.startsWith('/'))return;
      const [,pathname,suffix]=src.match(/^([^?#]*)(.*)$/);
      let original;try{original=decodeURI(pathname);}catch{return;}
      const webp=images.urls.get(original);if(!webp)return;
      el.wrap('<picture></picture>').before(` <source srcset="${escape(webp.replaceAll(' ','%20')+suffix)}" type="image/webp"> `);
      const previous=el.parent()[0].prev;
      if(previous?.type==='text')previous.data=previous.data.replace(/\s+$/,'');
    });
    function autolinks(parent){
      for(const child of [...(parent.children||[])]){
        if(child.type==='tag'&&['code','pre','script','style','a'].includes(child.name))continue;
        if(child.type==='text'&&/\b(?:GP-\d+|GC-[0-9a-f]{7})\b/.test(child.data)){
          const value=escape(child.data).replace(/\b(GP-(\d+)|GC-([0-9a-f]{7}))\b/g,(_,all,pr,sha)=>`<a href="https://github.com/HMCL-dev/HMCL/${pr?'pull/'+pr:'commit/'+sha}" target="_blank">${all}</a>`);
          // Kramdown emits an HTML span on its own indented line, including
          // separating whitespace around adjacent inline elements.
          $(child).replaceWith(` <span>${value}</span> `);
        }else if(child.children)autolinks(child);
      }
    }
    autolinks($.root()[0]);
    result=$.html().replaceAll('<!-- HMCL_TYPOGRAPHY -->','');
    if(tocInline)result=result.replace('<!-- HMCL_INLINE_TOC -->',inlineTOC(result));
    return result;
  }
  function inlineTOC(content){return `<aside class="sidebar__right"><nav class="toc"><header><h4 class="nav__title"><i class="fas fa-file-alt"></i> 目录</h4></header>${toc(content,'toc__menu','markdown-toc')}</nav></aside>`;}
  function toc(content,cls='toc__menu',id){
    const $=html(content,null,false);const heads=$('h1,h2,h3,h4,h5,h6').toArray().filter(e=>$(e).attr('id')&&!$(e).hasClass('no_toc'));
    if(!heads.length)return '';
    let out='',level=0,base=Number(heads[0].name.slice(1));
    for(const h of heads){if(Number(h.name.slice(1))<base)continue;const n=Number(h.name.slice(1))-base+1;
      if(n>level){for(let i=level;i<n;i++)out+=i===0?`<ul class="${cls}"${id?` id="${id}"`:''}>`:'<ul>';}
      else if(n<level){for(let i=n;i<level;i++)out+='</li></ul>';out+='</li>';}
      else out+='</li>';
      out+=`<li><a href="#${escape($(h).attr('id'))}"${id?` id="${id}-${escape($(h).attr('id'))}"`:''}>${escape($(h).text())}</a>`;level=n;
    }
    for(let i=0;i<level;i++)out+='</li></ul>';return out;
  }
  return {render,relative,toc,inlineTOC};
}
