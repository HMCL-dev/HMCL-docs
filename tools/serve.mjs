import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon'};
export function server(directory='_site',port=4173){
  const root=path.resolve(directory);
  return new Promise(resolve=>{
    const s=http.createServer((req,res)=>{
      let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
      let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
      if(!fs.existsSync(file)&&/^\/assets\/.+\.(?:png|jpe?g|gif|tiff?)\.webp$/.test(pathname)&&fs.existsSync(file.slice(0,-5))){
        res.writeHead(301,{Location:encodeURI(pathname.slice(0,-5))+new URL(req.url,'http://localhost').search});return res.end();
      }
      if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){
        if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'+new URL(req.url,'http://localhost').search});return res.end();}
        file=path.join(file,'index.html');
      }
      const found=fs.existsSync(file)&&fs.statSync(file).isFile();if(!found)file=path.join(root,'404.html');
      res.writeHead(found?200:404,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
      if(req.method==='HEAD')return res.end();
      if(fs.existsSync(file))fs.createReadStream(file).pipe(res);else res.end('Not found');
    });s.listen(port,'127.0.0.1',()=>resolve(s));
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname)){
  await server(process.argv[2]||'_site',Number(process.env.PORT||4173));console.log(`Preview: http://127.0.0.1:${process.env.PORT||4173}/`);
}
