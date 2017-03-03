var R = require('ramda');
var path = require('path');
var fs = require('fs');

module.exports = function(statics,req,res,next){
	var contentType;
	var mainfn = R.ifElse(
			R.anyPass(
				[R.isEmpty,
				R.pipe(
					R.keys,
					R.head,
					R.head,
					R.equals('?'),
					R.not
					)
				]
			),
			next,
			R.pipe(
				R.keys,
	            R.head,
	            R.match(/\?([^\?]+)\??/),
	            R.tail,
	            R.head,
	            R.split(','),
	            setContentType,
	            R.map(R.replace(".min.",".")),
	            R.map(absPath),
	            R.map(readFile),
	            R.join('\n'),
	            responsefn
				)
		)
	mainfn(req.query)

    function setContentType(arr) {
        contentType = R.ifElse(R.test(/js$/),
            R.always("text/javascript"),
            R.always("text/css"))(R.head(arr));
        return arr;
    }
 
    function absPath(path1) {
        return R.reduce(
            function(a, b) {
                return R.ifElse(fs.existsSync, R.reduced, R.always(a))(path.join(b, a));
            },
            path1,
            statics);
    }

    function readFile(path) {
        return fs.readFileSync(path, 'utf-8');
    }

    function responsefn(str) {
        res.setHeader('Content-Type',contentType);
        res.send(str);
    }
}