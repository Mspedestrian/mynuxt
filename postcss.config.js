module.exports = {
    plugins: {
        // require('precss'),
        // require('autoprefixer')
        postcss:[
        	require('postcss-px2rem')({'remUnit':75,'baseDpr':2}),
        	// require('postcss-px2rem-exclude') ({'remUnit': 75,'exclude': '/node_modules/i'}),
        	exclude: [
			  path.resolve(__dirname, "node_modules")
			],
        ]

    }
}