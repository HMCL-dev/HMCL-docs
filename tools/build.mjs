import Eleventy from '@11ty/eleventy';
import fs from 'node:fs';
import path from 'node:path';

const arg=process.argv.indexOf('--output');
const out=arg<0?'_site':process.argv[arg+1];
const absolute=path.resolve(out);
if(absolute!==path.resolve('_site')&&!absolute.startsWith(path.resolve('.cache')+path.sep))throw Error('Output must be _site or inside .cache');
fs.rmSync(absolute,{recursive:true,force:true});
const engine=new Eleventy('_eleventy',out,{configPath:'eleventy.config.js'});
await engine.write();
