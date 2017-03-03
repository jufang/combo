var R = require('ramda');
var path = require('path');
var fs = require('fs');

module.exports = R.curry(function(route,config,req,res,next){
	//route   [ '{config.apiData}/data/{params.site}/{params.class}/{params.method}.json' ]
	var head = R.head(route);
    if (!head) {
        res.send("请配置数据文件");
        return;
    }
    var formatstr = R.curry(function(str, data) {
	    //url访问链接：/home/api/cart/loadCart 对应路由规则:'/:site/api/:class/:method'
	    //data.params={ site: 'home', class: 'cart', method: 'loadCart' }
	    return str.replace(/\{([^\}]+)\}/g, function(all, a, b) {
	        var pathfn = R.pipe(R.split('.'), R.path(R.__, data));
	        return pathfn(a);
	    });
	});
    function parsepath(path1){
    	req.config = config
    	return formatstr(path1, req)
    }
    function readFile(path){
    	return fs.readFileSync(path,'utf-8')
    }
    function sendJson(str){
    	res.set('Content-type','application/json')
    	res.send(str)
    }
    R.cond([
    		[R.test(/json$/),R.pipe(
    			parsepath,
    			R.ifElse(fs.existsSync,
    				R.pipe(readFile, sendJson),
    				next
    			)
    		)],
    		[R.T, next]
    	])(head)
})