import {prepare,assets} from './build/site.mjs';

export default function(config){
  config.addGlobalData('documents',async()=> (await prepare()).model.documents.filter(p=>!p.hiddenOutput));
  config.on('eleventy.after',async({dir})=>assets(dir.output));
  return {dir:{input:'_eleventy',output:'_site'},templateFormats:['11ty.js']};
}
