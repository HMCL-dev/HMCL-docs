import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {server} from './serve.mjs';

let running=false,queued=false;
async function build(){
  if(running){queued=true;return;}
  running=true;
  const ok=await new Promise(resolve=>{const p=spawn(process.execPath,['tools/build.mjs'],{stdio:'inherit'});p.on('exit',code=>resolve(code===0));});
  running=false;
  if(queued){queued=false;return build();}
  return ok;
}
if(!await build())process.exit(1);
await server('_site',Number(process.env.PORT||4173));
console.log(`Preview: http://127.0.0.1:${process.env.PORT||4173}/ ; rebuilds on source changes, refresh browser to view.`);
let timer;
const changed=()=>{clearTimeout(timer);timer=setTimeout(build,200);};
for(const dir of ['_docs','_launcher','_modpack','_multiplayer','_downloads','_eula','_changelog','_changelogs','_pages','_data','_includes','_layouts','assets','theme','build','_eleventy','redirects']){
  if(fs.existsSync(dir))fs.watch(dir,{recursive:true},changed);
}
fs.watch('.',(_,name)=>{if(['index.md','index.json','settings.yaml','404.md','_config.yml','eleventy.config.js'].includes(String(name)))changed();});
