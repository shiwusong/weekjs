import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
module.exports = {
	input: 'src/index.js',
	output: {
		name: 'weekjs',
		file: 'dist/weekjs.min.js',
		format: 'umd',
	},
	plugins: [
		babel({
			presets: [
				[
					'@babel/env',
					{
						modules: false,
					},
				],
			],
			plugins: [],
			exclude: 'node_modules/**',
		}),
		uglify(),
	],
}
