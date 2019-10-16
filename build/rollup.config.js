import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
export default [
    {
        input: 'src/index.js',
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            resolve()
        ],
        output: [
            {
                format: 'esm',
				file: 'dist/index.js',
				indent: '\t'
            }
        ]
    }
];
