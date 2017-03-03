var R = require('ramda');

module.exports.buildNative=function(app,conf){	
	//模拟数据,或者用来去配置路由下的静态文件，需要在dev-config.js routes配置
	var gmroute = require('./lib/gmroute.js');
	var groute = function(routes){
		//[ '/:site/api/:class/:method','{config.apiData}/data/{params.site}/{params.class}/{params.method}.json' ]
		R.map(function(route){
			console.log(route.join('---------->'))
			app.all(R.head(route),gmroute(R.tail(route),conf))
		},routes)
	}
	groute(conf.project.routes)

	
	var combo=require('./lib/combo.js');
	app.all('/',function(req,res,next){
		combo(conf.statics,req,res,next)
	})



}