const { request } = require("http");

const respond = (request, response) => {
    console.log('Repond Fired')
    response.write('Repond Fired')
    response.end()
}

module.exports = respond;