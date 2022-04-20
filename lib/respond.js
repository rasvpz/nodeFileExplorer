const url  = require("url");
const path  = require("path");
const fs  = require("fs");
const buildBreadCrumb = require('./breadcrumb.js')
const buildMainContent = require('./mainContent.js')

const staticBasePath = path.join(__dirname, '..', 'static')

const respond = (request, response) => {
    // console.log('Repond Fired')
    // response.write('Repond Fired')
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
       return false
   }   
   let stats
   try{
    stats = fs.lstatSync(fullStaticPath)
        }catch(err){
            console.log(`lstatSync Error ; ${err}`);
        }
        if(stats.isDirectory()){
            let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8')
            let pathElements = pathname.split('/').reverse()
            pathElements = pathElements.filter(element => element !== '')
            const folderName = pathElements[0]
            
            const breadcrumb = buildBreadCrumb(pathname)

            const mainContent = buildMainContent(fullStaticPath, pathname)
            data = data.replace('Home', folderName)
            data = data.replace('pathname', breadcrumb)
            data = data.replace('mainContent', mainContent)


            response.statusCode = 200
            response.write(data)
            response.end()
        }
        console.log(pathname)
}
module.exports = respond;