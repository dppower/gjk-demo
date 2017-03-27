import { rollup } from "rollup";
import nodeResolve = require('rollup-plugin-node-resolve');
import commonjs = require( 'rollup-plugin-commonjs');

rollup(
    {
        entry: "../../build-es/app/main-aot.js",
        plugins: [
            nodeResolve({
                jsnext: true,
                module: true
            }),
            commonjs({
                include: "../../node_modules/rxjs/**"
            })
        ],
        onwarn(warning) {
            if (warning.code === 'THIS_IS_UNDEFINED') return;
            console.warn(warning.message);
        }
    }
).then(bundle => {

    bundle.write(
        {
            format: "iife",
            dest: "../../docs/build-aot.js",
            sourceMap: false
        }
    ).catch(err => console.log(err.stack));
});

