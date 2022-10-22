"use strict";
const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 1111;

const server = http.createServer((request,response)=> {

    let path = './' + request.url;
    console.log(path);

    fs.readFile(path,function (err,data){
        if (!err) {
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1 ? 'text/plain': 
            {
                                '.html' : 'text/html',
                                '.ico' : 'image/x-icon',
                                '.jpg' : 'image/jpeg','.jpeg':'image/jpeg',
                                '.png' : 'image/png',
                                '.gif' : 'image/gif',
                                '.css' : 'text/css',
                                '.ttf' : 'font/ttf',
                                '.js' : 'text/javascript'
                                }[ request.url.substr(dotoffset) ];
            response.setHeader('Content-type' , mimetype);
            response.end(data);
            console.log( request.url, mimetype );
        } else {
            console.log ('file not found: ' + request.url);
            response.writeHead(404, "Not Found");
            response.end();
        }   });
    });
server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}/index.html`);

});
