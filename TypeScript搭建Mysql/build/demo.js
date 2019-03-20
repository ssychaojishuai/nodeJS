"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
function getCon() {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'demo' // 使用数据库名字
    });
    return con;
}
function query(sql, data, callback) {
    //连接数据库
    const con = getCon();
    if (!callback) {
        callback = data;
        data = [];
    }
    //封装对数据库的操作
    con.query(sql, data, (err, rdata) => {
        if (err) {
            console.log("数据库出错:" + err);
        }
        else {
            callback(rdata);
        }
    });
    //关闭链接
    con.end();
}
exports.query = query;
