import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import {walk} from './content.mjs';

// The plan reads source assets; conversion writes exclusively to the build output.
export function planImages(directory='assets',publicPath='/assets'){
  const urls=new Map(),pending=[];
  for(const source of walk(directory)){
    const relative=path.relative(directory,source).split(path.sep).join('/');
    const url=publicPath+'/'+relative;
    if(fs.existsSync(source+'.webp'))urls.set(url,url+'.webp');
    else if(/\.(png|jpe?g|tiff?)$/i.test(source)){
      urls.set(url,url+'.webp');
      pending.push({source,relative:relative+'.webp'});
    }
  }
  return {urls,pending};
}

export async function writeWebp(output,plan){
  const pending=[...plan.pending];
  // Bound CPU/memory use on the shared CI host. Match the old encoder's quality=100.
  await Promise.all(Array.from({length:2},async()=>{
    while(pending.length){
      const {source,relative}=pending.shift(),target=path.join(output,'assets',relative);
      fs.mkdirSync(path.dirname(target),{recursive:true});
      await sharp(source).webp({quality:100}).toFile(target);
    }
  }));
}
