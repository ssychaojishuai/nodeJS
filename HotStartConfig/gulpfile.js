
/**
 * 用gulp的watch()来监视ts文件的变化并重启服务器
 */
let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json');//使用tsconfig.json文件配置tsc
let exec = require('child_process').exec;

let child;
//目录常量
const PATHS = {
    scripts : ['./src/**/*.ts'],
    output : './build'
}


//编译ts文件
gulp.task('build-ts',['restart'],function(){
    return gulp.src(PATHS.scripts)
    .pipe(tsp())
    .pipe(gulp.dest(PATHS.scripts,['build-ts']));
});

//见识ts文件变化
gulp.task('watch-ts',['build-ts'],function(){
    gulp.watch(PATHS.scripts,['build-ts']);
});

//自动重启服务
gulp.task('restart',function(){
    child = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
        console.log(`stdout : ${stdout}`);
        console.log(`stderr : ${stderr}`);
        
        if(error !== null){
            console.log(`exec error:${error}`);
        }
    });
});

//开始任务
gulp.task('dev',['build-ts','restart','watch-ts']);

/*
 * 在开发时，直接在项目目录运行gulp dev，就可以启动编译和服务器了。
   此后，gulp会监视ts文件的改动，然后编译ts文件并重启服务器。
   刷新页面，就可以看到新结果已经输出在浏览器页面中了;
   需要留意的是,由于gulp负责监视ts文件的变化，
   因此请在tsconfig.json将"watch"设置为false或者删掉这个属性
 */
/*====================================================================*/
/**
 * 使用tsconfig.json文件监控ts文件变化并重启服务器
 * 需要将tsconfig.json文件里'watch'属性设置为true,打开监视
 */

let tsChild,       //监视ts文件修改子进程
    serverChild;   //重启服务器子进程

//编译ts文件
gulp.task('build-ts',function(){
    tsChild = exec('tsc',(error,stdout,stderr)=>{
        console.log(`tsc======>stdout : ${stdout}`);
        console.log(`tsc======>stderr : ${stderr}`);
        if(error !== null){
            console.log(`exec error:${error}`);
        }
    });
});

//自动重启服务器
gulp.task('restart',function(){
    serverChild = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
        console.log(`tsc======>stdout : ${stdout}`);
        console.log(`tsc======>stderr : ${stderr}`);
        if(error !== null){
            console.log(`exec error:${error}`);
        }
    });
});

//开始任务
gulp.task('tsc',['build-ts','restart']);

/**
 * 现gulp版本为3.9.1,如果gulp版本为4.0.0及以上则会出现运行报错
 * 报错信息:Task function must be specified
 * 因为4.0版本gulp.task方法运行方式改变了,只有两种方式运行gulp.series和gulp.parallel
 *  gulp.series：按照顺序执行
 *  gulp.paralle：可以并行计算
 * 所以再以gulp3的方式指定依赖任务会报错
 */


