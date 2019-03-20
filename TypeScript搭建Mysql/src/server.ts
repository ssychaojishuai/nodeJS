import * as http from 'http';
import {query} from './database';

//保存demo
let sql :string = "insert into demo(name,age) values (?,?)";
let user:string[] = ["tony","23"];
query(sql,user,(rdata:any)=>{
    console.log("保存成功");
});


/**
 * 使用nodejs连接数据库查询表后，在查询后返回一RowDataPacket类型的对象
 * 是一个数组，数组里面是JSON格式的数据，但是每个JSON前面都有一个RowDataPacket,
 * 得到的RowDataPacket对象数组可直接使用,获取字段内容
 * 以下方法可去除RowDataPacket,但是返回值不是json数组,是string数组,
 * 不能通过.name获取对应的名字
 * 
 */
let getSql = "select * from demo";
query(getSql,(rdata:any)=>{
    //console.log(rdata[0].name);//可通过[下标].字段获取相应信息
    let dataString:string = JSON.stringify(rdata);
    console.log(dataString);
    //dataString返回值为"[{"id":1,"name":"小明","age":18},{"id":2,"name":"小黑","age":18},{"id":3,"name":"小黑","age":18},{"id":4,"name":"小黑","age":18},{"id":5,"name":"小黑","age":18},{"id":6,"name":"小黑","age":18},{"id":7,"name":"小红","age":20},{"id":8,"name":"小黑","age":18},{"id":9,"name":"小红","age":20},{"id":10,"name":"小黑","age":18},{"id":11,"name":"小黑","age":18},{"id":12,"name":"小黑","age":18},{"id":13,"name":"小红","age":20},{"id":14,"name":"tom","age":20},{"id":15,"name":"tom","age":20}]"
    var rrdata:string[] = JSON.parse(dataString);
    //rrdata返回值为" [Object, Object, Object, Object, Object, Object, Object, Object, …]"
    //console.log(rrdata);
    //console.log(rrdata[0]);//Object {id: 1, name: "小明", age: 18}
    
})
