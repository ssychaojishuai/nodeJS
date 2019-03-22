//引入到这个dao模块
var dao=require("../dao/UserDao");
//暴露这个模块方法
//新增
exports.userAdd=function (data,callback) {
    dao.userDao(data,function (rdata) {
        callback(ture);
    })
}
//查询
exports.userFind=function (data,callback) {
    dao.findOne(data,function (rdata) {
        callback(rdata);
    })
}
//删除
exports.userDelete=function (data,callback) {
    dao.deleteOne(data,function (rdata) {
        callback(rdata);
    })
}
//修改
exports.userUpdate=function (data,callback) {
    dao.updateOne(data,function (rdata) {
        callback(rdata);
    })
}