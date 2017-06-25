const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const ClosureCompiler = require('google-closure-compiler-js')
  .webpack;
const OfflinePlugin = require('offline-plugin');
//
module.exports = function prod(env) {
  return {
    entry: './entry.js',
    output: {
      path: __dirname,
      filename: 'bundle.js',
    },
    stats: {
      warnings: false,
    },
    // devtool: 'cheap-module-source-map',
    module: {
      rules: [{
        test: /indexB.html$/,
        loaders: ['file-loader?name=index.[ext]', 'extract-loader',
          'html-loader',
        ],
      }, {
        test: /embedEnB.html$/,
        loaders: ['file-loader?name=embedEn.[ext]',
          'extract-loader', 'html-loader',
        ],
      }, {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
            ],
          },
        }],
      }],
    },
    plugins: [
      new HtmlMinifierPlugin({}),
      new ClosureCompiler({
        compiler: {
          language_in: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5',
          compilation_level: 'ADVANCED',
          warning_level: 'QUIET',
          externs: [{ src: `
                      var BABYLON = {};

               ` }],
        },
        // makeSourceMaps: true,
        concurrency: 2,
      }),
      new OfflinePlugin({
        externals: ['./js/babylonOimo.min.js', './js/oimo.min.js',
          './js/pep.min.js', './js/ballistic.babylon',
        ],
        caches: 'all',
        responseStrategy: 'network-first',
        updateStrategy: 'all',
        minify: 'true',
        ServiceWorker: {
          events: 'true',
        },
        AppCache: {
          events: 'true',
        },
      }),
    ],
  };
};
