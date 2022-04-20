const path = require('path')
const buildBreadCrumb = pathname => {
    const pathChunks = pathname.split('/').filter(element => element !== '')
    console.log(`PathChunks ${pathChunks}`)
    let breadcrumb = `<li><a href="/">Home <span class="glyphicon glyphicon-chevron-right"></span> </a></li>`
    let link = '/'
    pathChunks.forEach((item, index) => {
        link = path.join(link, item)
        if(index !== pathChunks.length -1){            
            breadcrumb += `<li><a href="${link}">${item} <span class="glyphicon glyphicon-chevron-right"></span> </a></li>`
        }else{
            breadcrumb += `<li class="active">${item}</li>`
        }
  });
  return breadcrumb
}
module.exports = buildBreadCrumb