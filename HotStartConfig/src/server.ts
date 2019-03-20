import * as http from 'http';
interface ICache{
    userCache:boolean;
    [propName:string]:any
}
const cache:ICache = {userCache:true}


//====================
const server = http.createServer(function(request:http.IncomingMessage,response:http.ServerResponse):void{
    console.log("create a server...");
    response.setHeader("Content-type", "text/html;charset=UTF-8");
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write('<head><meta charset="utf-8"/></head>');
    response.write("<body>Hello world,we use typescript to develop</br>热启动已配置</body>");
    response.end();
});
 
server.listen(3000,function(){
    console.log("Server listening on port 3000");
    console.log("test...");
});