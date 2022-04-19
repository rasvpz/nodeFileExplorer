const url  = require("url");
const path  = require("path");
const fs  = require("fs");

const staticBasePath = path.join(__dirname, '..', 'static')

const respond = (request, response) => {
    console.log('Repond Fired')
    response.write('Repond Fired')
    // const pathname = url.parse(request.url, true).pathname
    // console.log(url.parse(request.url, true).pathname)
    let pathname = url.parse(request.url, true).pathname
    if(pathname === '/favicon.ico'){
        return false;
    }
    console.log(pathname);
    // to perform the path like http:/abdul%rashhed/home
    pathname = decodeURIComponent(pathname)
    const fullStaticPath = path.join(staticBasePath, pathname)
   if(!fs.existsSync(fullStaticPath)){
    //    console.log(`${fullStaticPath} does not exist`);
       response.write(`- ${fullStaticPath} does not exist`)
       response.end()
   }else{
    response.write('File Found')
    response.end()
   }
}

module.exports = respond;