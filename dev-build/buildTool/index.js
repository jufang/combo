module.exports.buildNative=function(app,conf){
	var combo=require('./lib/combo.js');
	app.all('/',function(req,res,next){
		combo(conf.statics,req,res,next)
	})
}