var express = require('express');
var router = express();


router.get('/node-combo',function(req,res){
	res.render('node-combo', { title: '第一个combo' });
})
router.get('/my-combo',function(req,res){
	res.render('my-combo', { title: '这是我的combo' });
})
module.exports = router