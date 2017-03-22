declare module "rollup" {

    export interface SourceMap {
        file: string;
        sources: string[];
        toString(): string;
        toUrl(): string
    }

    export type BundleFormat = "amd" | "cjs" | "iife" | "umd" | "es";

    export interface GenerateOptions {
        format?: BundleFormat;
        exports?: "auto" | "default" | "named" | "none";
        moduleId?: string; // id of amd/umd bundle
        moduleName?: string; // name for umd/iife module
        globals?: { [id: string]: string; }; // import _ from "underscore" => globals: { "underscore": "_" }
        indent?: boolean;
        interop?: boolean;
        banner?: string;
        footer?: string;
        intro?: string;
        outro?: string;
        sourceMap?: boolean;
        sourceMapFile?: string;
        useStrict?: boolean
    }
    export interface WriteOptions extends GenerateOptions {
        dest: string;
    }

    export interface Bundle {
        generate(options: GenerateOptions): { code: string, Map: SourceMap };
        write(options: WriteOptions): Promise<any>;
    }

    export interface RollupConfig {
        entry: string;
        cache?: Bundle;
        external?: (id: string) => boolean | string[];
        paths?: { [id: string]: string; };
        onwarn?: (warning: { code: string, message: string }) => void;
        plugins?: {}[];
        treeshake?: boolean;
    }

    export function rollup(config: RollupConfig): Promise<Bundle>;
}

declare module "rollup-plugin-node-resolve" {
    interface PluginOptions {
        // use "module" field for ES6 module if possible
        module?: boolean; // Default: true

        // use "jsnext:main" if possible
        // – see https://github.com/rollup/rollup/wiki/jsnext:main
        jsnext?: boolean;  // Default: false

        // use "main" field or index.js, even if it's not an ES6 module
        // (needs to be converted from CommonJS to ES6
        // – see https://github.com/rollup/rollup-plugin-commonjs
        main?: boolean;  // Default: true

        // if there's something your bundle requires that you DON'T
        // want to include, add it to 'skip'. Local and relative imports
        // can be skipped by giving the full filepath. E.g., 
        // `path.resolve('src/relative-dependency.js')`
        skip?: string[];  // Default: []

        // some package.json files have a `browser` field which
        // specifies alternative files to load for people bundling
        // for the browser. If that's you, use this option, otherwise
        // pkg.browser will be ignored
        browser?: boolean;  // Default: false

        // not all files you want to resolve are .js files
        extensions?: string[];  // Default: ['.js']

        // whether to prefer built-in modules (e.g. `fs`, `path`) or
        // local ones with the same names
        preferBuiltins?: boolean;  // Default: true
    }
    function nodeResolve(options?: PluginOptions): {};
    export = nodeResolve;
}

declare module "rollup-plugin-commonjs" {
    interface PluginOptions {
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include?: string; // Default: undefined
        exclude?: string[];  // Default: undefined

        // search for files other than .js files (must already
        // be transpiled by a previous plugin!)
        extensions?: string[];  // Default: [ '.js' ]

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal?: boolean;  // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap?: boolean;  // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)
        namedExports?: { [module: string]: string[] };  // Default: undefined

        // sometimes you have to leave require statements
        // unconverted. Pass an array containing the IDs
        // or a `id => boolean` function. Only use this
        // option if you know what you're doing!
        ignore?: (id: string) => boolean | string[];
    }
    function commonjs(options?: PluginOptions): {};
    export = commonjs;
}