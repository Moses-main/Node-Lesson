const http = require('http');
const path  = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;



const logEvent = require('./logEvent');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};

// initialize the object that would be used
const MyEmitter = new Emitter();
MyEmitter.on("log", (msg, filename)=> logEvent(msg, filename));
const PORT  = process.env.PORT || 3500;


const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromise.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ""
            );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            200,{'Content-Type': contentType});
        response.end(
            contentType === "application/json" ? JSON.stringify(data):data
        );
    } catch (err) {
        console.log(err);
        MyEmitter.emit("log", `${req.name} : t${req.message}`, "errlog.txt");
        response.status(500);
        response.end();
    }
};


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    MyEmitter.emit("log", `${req.url} \t${req.method}`, "reqlog.txt");

    const extension = path.extname(req.url);

    let contentType;

    // Using a switch statement
    // to get the extension of the
    // files
    switch (extension) {
        case 'json':
            contentType = 'application/json';
            break;
            // contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.svg':
            contentType: 'image/sv';
            break;
        default:
            contentType = 'text/html';
            break;
    };

    // Using chained tenary operations
    // to get the path of the file
    let filePath =
    contentType === 'text/html' && req.url === '/'
    ? path.join(__dirname, 'views', 'index.html')
    : contentType === 'text/html' && req.url.slice(-1) === '/'
    ? path.join(__dirname, 'views', req.url, 'index.html')	
    : contentType === 'text/html'
    // ? path.join(__dirname,'data', req.url,	'data.json')
    // : contentType === 'application/json'
    ? path.join(__dirname, 'views', req.url)
    : path.join(__dirname, req.url)
    ? path.join(__dirname, req.url)
    : path.join(__dirname, req.url);
 
    // Makes the html extension not required in the browser 
    if (!extension && req.url.slice(-1) !== '/'){
        filePath+='.html';
    }

    const fileExits = fs.existsSync(filePath); // A boolean

    if (fileExits) {
        serveFile(filePath, contentType, res);
        // Then server the file contents
    }else{0
        // 404  Does not exist
        // 301 redirect
        switch (path.parse(filePath).base) {
            case "old-page.html":
                res.writeHead(301,{"location": "/new-page.html"});
                res.end();	
                break;
            
            case "www.html":
                res.writeHead(301,{"location": "/"});
                res.end();	
                break;
            default:
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
                // serve a 404 response


                break;
        } (path.parse(filePath).base);
    }
})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`));
