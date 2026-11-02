import {renderPage} from '../build/site.mjs';

export default class {
  data(){return {pagination:{data:'documents',size:1,alias:'document'},permalink:data=>data.document.output,eleventyExcludeFromCollections:true};}
  async render(data){return renderPage(data.document);}
}
