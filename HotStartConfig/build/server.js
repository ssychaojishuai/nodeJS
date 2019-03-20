"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const cache = { userCache: true };
//====================
const server = http.createServer(function (request, response) {
    console.log("create a server...");
    response.setHeader("Content-type", "text/html;charset=UTF-8");
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<head><meta charset="utf-8"/></head>');
    response.write("<body>Hello world,we use typescript to develop</br>热启动已配置</body>");
    response.end();
});
server.listen(3000, function () {
    console.log("Server listening on port 3000");
    console.log("test...");
});
