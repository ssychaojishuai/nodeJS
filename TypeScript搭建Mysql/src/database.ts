import * as mysql from 'mysql';


function getCon(){
    let con = mysql.createConnection({
        host: 'localhost', // 数据库地址
        user: 'root', // 数据库名
        password: 'root', // 数据库密码
        port: 3306, // 端口号
        database: 'demo' // 使用数据库名字
    });
    return con;
}

export function query(sql:string,data:any,callback?:any){
    //连接数据库
    const con = getCon();
    if(!callback){
        callback = data;
        data = [];
    }
    //封装对数据库的操作
    con.query(sql,data,(err:any,rdata:any)=>{

        if(err){
            console.log("数据库出错:"+err);
        }else{
            callback(rdata);
        }
        
    });
    
    //关闭链接
    con.end();
}


