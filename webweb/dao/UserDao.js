var db=require("./database");

//增加
exports.userDao=function (data,callback) {
    db.query("INSERT into userinfo(NAME) VALUES(?)",data,function (rdata) {
        console.log(rdata);
    });
};
//查询
exports.findOne=function (data,callback) {
    db.query("SELECT * FROM userinfo where name=?",data,function (rdata) {
        callback(rdata);
        console.log(rdata);
    });
};
//删除
exports.deleteOne=function (data,callback) {
   db.query("DELETE FROM userinfo where name=?",data,function (rdata) {

       callback(rdata);
       console.log(rdata);
   });
};
//修改
exports.updateOne=function (data,callback) {
   // var _sql = "UPDATE userinfo SET name = "\"" + data[0]? WHERE id = ?"

    //UPDATE userinfo SET NAME = "十一" WHERE id = "1";
    db.query("UPDATE userinfo SET name =? WHERE id = ?",data,function (rdata) {
        callback(rdata);
        console.log(rdata);
    });
};
