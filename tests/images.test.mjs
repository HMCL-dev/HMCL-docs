import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import {load as html} from 'cheerio';
import {planImages,writeWebp} from '../build/images.mjs';
import {load} from '../build/content.mjs';
import {renderer} from '../build/render.mjs';

test('WebP encoding writes only to output, preserves originals and reuses provided alternatives',async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hmcl-webp-'));
  try{
    const source=path.join(dir,'source'),out=path.join(dir,'output');fs.mkdirSync(source);
    const image=sharp({create:{width:17,height:11,channels:4,background:'#12345680'}});
    await image.clone().png().toFile(path.join(source,'new.png'));
    await image.clone().png().toFile(path.join(source,'provided.png'));
    await image.clone().webp().toFile(path.join(source,'provided.png.webp'));
    await image.clone().gif().toFile(path.join(source,'animation.gif'));
    const original=new Map(fs.readdirSync(source).map(name=>[name,fs.readFileSync(path.join(source,name))]));
    const plan=planImages(source);
    fs.cpSync(source,path.join(out,'assets'),{recursive:true});
    await writeWebp(out,plan);
    const metadata=await sharp(path.join(out,'assets/new.png.webp')).metadata();
    assert.equal(metadata.format,'webp');assert.equal(metadata.width,17);assert.equal(metadata.height,11);assert.equal(metadata.hasAlpha,true);
    assert.deepEqual(fs.readdirSync(source).sort(),[...original.keys()].sort());
    for(const [name,bytes] of original){
      assert.deepEqual(fs.readFileSync(path.join(source,name)),bytes);
      assert.deepEqual(fs.readFileSync(path.join(out,'assets',name)),bytes);
    }
    assert.equal(plan.urls.get('/assets/new.png'),'/assets/new.png.webp');
    assert.equal(plan.urls.get('/assets/provided.png'),'/assets/provided.png.webp');
    assert.equal(fs.existsSync(path.join(out,'assets/animation.gif.webp')),false);
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('picture prefers WebP and retains the original image and authored picture markup',()=>{
  const model=load();model.images={urls:new Map([['/assets/demo.png','/assets/demo.png.webp']]),pending:[]};
  const r=renderer(model);
  const $=html(r.markdown.render('![原图](/assets/demo.png?v=1 "说明")'));
  assert.equal($('picture source').attr('type'),'image/webp');
  assert.equal($('picture source').attr('srcset'),'/assets/demo.png.webp?v=1');
  assert.equal($('picture img').attr('src'),'/assets/demo.png?v=1');
  assert.equal($('picture img').attr('alt'),'原图');assert.equal($('picture img').attr('title'),'说明');
  const explicit=html(r.markdown.render('<picture><source srcset="/own.avif" type="image/avif"><img src="/assets/demo.png"></picture>'));
  assert.equal(explicit('picture').length,1);assert.equal(explicit('source').attr('srcset'),'/own.avif');
});
