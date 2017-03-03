var express = require('express');
var http=require("http");
var path = require("path");
var swig=require("swig");
//加载combo依赖
var combo = require('combohandler');
var router=require("./router/comboRouter.js");

var app = express();



// 设置swig模板
app.set("view engine","html");
app.engine("html",swig.renderFile);

//设置路由地址
app.use(router);

//设置静态文件目录
app.use(express.static(__dirname+"/static"));


//(1)配置combo,直接使用npm插件
app.get('/javascripts', combo.combine({rootPath: path.join(__dirname, 'static')+'/javascripts'}), combo.respond);
app.get('/stylesheets', combo.combine({rootPath: path.join(__dirname, 'static')+'/stylesheets'}), combo.respond);

if(process.env.GOMECARTFRONT==="dev"){
	var devconfig = require("./dev-build/dev-config.js");
	var devtool=require('./dev-build/buildTool');
	devtool.buildNative(app,devconfig.config)
	app.listen(3000,function(){
		console.log((new Date-0)+"my app run on port 3000");
	})
}


/*app.all("/:site/api/*",function(req,res){
	res.json({success:false,errMsg:"接口404"});
});
app.use(function(req,res){
	res.redirect("/?status=404");
});*/