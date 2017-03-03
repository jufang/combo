module.exports.config = {
	"apiData":"D:/my_workspace/nodeTest/combo/combo",
	"statics":[
		"D:/my_workspace/nodeTest/combo/combo/static"
	],
	"project": {
        "routes": [
           	[
                "/:site/api/:class/:method",
                "{config.apiData}/data/{params.site}/{params.class}/{params.method}.json"
            ]
        ]
    }
}