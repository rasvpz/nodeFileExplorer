const { fstat } = require("fs")
const fs = require("fs")
const path = require("path")

const buildMainContent = (fullStaticPath, pathname) => {

    let mainContent = ''
    let items
    try{
        items = fs.readdirSync(fullStaticPath)
        console.log(items);
    }catch(err){
        console.log(`readdirSync error : ${err}`);
    }

    items.forEach(item => {
       const link = path.join(pathname, item) 
       let icon, stats
       const itemFullStaticPath = path.join(fullStaticPath, item)
       try{
        stats = fs.statSync(itemFullStaticPath)
       }catch(err){
            console.log(`statSync error  ${err}`);
            mainContent = `<div class = "alert alert-danger">Internal Server Error</div>`
            return false
       }
       
       if(stats.isDirectory()){
            icon = '<ion-icon name="folder"></ion-icon>'
       }
       
       else if(stats.isFile()){
            icon = '<ion-icon name="document"></ion-icon>'
       }

       mainContent += `<tr>
            <td width="5%">${icon}</td>
            <td> <a href="${link}"> ${item}</a> </td>
            <td>100m</td>
            <td>20-04-2022, 09:00:00 PM</td>
       </tr>`
    });
    return mainContent
}
module.exports = buildMainContent