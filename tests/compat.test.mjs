import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createRequire} from 'node:module';
import {load as dom} from 'cheerio';
import {load,front} from '../build/content.mjs';
import {renderer} from '../build/render.mjs';

const model=load(),r=renderer(model);
const copy=createRequire(import.meta.resolve('@11ty/eleventy'))('@11ty/recursive-copy');
test('patched glob dependency remains compatible with Eleventy passthrough copying',async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hmcl-copy-'));
  try{
    const input=path.join(dir,'in'),output=path.join(dir,'out');fs.mkdirSync(path.join(input,'nested'),{recursive:true});
    for(const file of ['a.txt','nested/b.txt','nested/drop.tmp','.hidden'])fs.writeFileSync(path.join(input,file),file);
    await copy(input,output,{dot:true,filter:['**/*','!**/*.tmp']});
    for(const file of ['a.txt','nested/b.txt','.hidden'])assert.equal(fs.readFileSync(path.join(output,file),'utf8'),file);
    assert.equal(fs.existsSync(path.join(output,'nested/drop.tmp')),false);
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('published URLs preserve root docs, folder indexes and non-public changelog entries',()=>{
  assert.equal(model.documents.find(p=>p.path==='_docs/faq.md').url,'/faq.html');
  assert.equal(model.documents.find(p=>p.path==='_launcher/isolation.md').url,'/launcher/isolation.html');
  assert.equal(model.documents.find(p=>p.path==='_pages/launcher.md').output,'/launcher/index.html');
  assert.ok(model.documents.filter(p=>p.hiddenOutput).length>=246);
});
test('existing front matter and JavaScript comment front matter are both supported',()=>{
  assert.deepEqual(front('/* @frontmatter\nlayout: null\n*/\nwindow.test = 1;'),{data:{layout:null},body:'window.test = 1;'});
  assert.equal(front('---\ntitle: 例子\n---\n原文').body,'原文');
});
test('links resolve source paths and fragments without altering code examples',()=>{
  const $=dom(r.markdown.render('[文档](/_docs/help.md?q=1#问题) `/_docs/help.md`'));
  assert.equal($('a').attr('href'),'/help.html?q=1#问题');
  assert.equal($('code').text(),'/_docs/help.md');
});
test('GitHub references only link outside code and existing links',()=>{
  const $=dom(r.markdown.render('GP-123 GC-abcdef0 `GP-456` [GP-789](https://example.com)'));
  assert.equal($('a[href="https://github.com/HMCL-dev/HMCL/pull/123"]').length,1);
  assert.equal($('a[href="https://github.com/HMCL-dev/HMCL/commit/abcdef0"]').length,1);
  assert.equal($('code a').length,0);assert.equal($('a a').length,0);
});
test('GitHub reference spans preserve Kramdown spacing around inline code and links',()=>{
  const result=r.markdown.render('GP-123: 支持 `.jar` ([示例](https://example.com))');
  assert.match(result,/支持 <\/span> <code/);
  assert.match(result,/<\/code> \(<a/);
});
test('notice attributes, Chinese anchors and nested emphasis preserve Kramdown conventions',()=>{
  const $=dom(r.markdown.render('> [!WARNING]\n> 请注意\n\n## Terracotta | 陶瓦联机\n\n*请安装 **Fabric API** 。*\n\n> 原文\n\n{: .notice--info }'));
  assert.equal($('blockquote.notice--warning').text().trim(),'请注意');
  assert.equal($('h2').attr('id'),'terracotta--陶瓦联机');
  assert.equal($('em strong').text(),'Fabric API');
  assert.equal($('blockquote.notice--info').text().trim(),'原文');
});
test('version ordering is numeric rather than lexical',()=>{
  const a=[{slug:'3.9.0'},{slug:'3.10.0'},{slug:'3.2.114'}];
  assert.deepEqual(r.liquid.filters.version_sort(a,'slug').map(x=>x.slug),['3.2.114','3.9.0','3.10.0']);
});
test('unknown/new code blocks render from source rather than old page HTML',()=>{
  const source='const newlyAdded = "测试 <tag>";\n';
  const $=dom(r.markdown.render('```javascript\n'+source+'```'));
  assert.equal($('pre code').text(),source);assert.equal($('tag').length,0);
});
test('CSV empty status is absent, while translated theme defaults are merged',()=>{
  assert.ok(model.site.data.groups.some(p=>p.status===null));
  assert.equal(model.site.data['ui-text'].zh.skip_primary_nav,'转到主导航栏');
  assert.equal(model.site.data['ui-text'].zh.follow_label,false);
});
