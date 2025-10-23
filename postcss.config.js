export default {
	plugins: {
		'postcss-nesting': {},
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'logical-properties-and-values': false,
			},
			browsers: 'last 2 versions'
		},
		'autoprefixer': {}
	}
}
