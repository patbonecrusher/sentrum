// module.exports = {
//   /**
//    * This is the main entry point for your application, it's the first file
//    * that runs in the main process.
//    */
//   entry: './src/index.ts',
//   // Put your normal webpack config below here
//   module: {
//     rules: require('./webpack.rules'),
//   },
//   resolve: {
//     extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
//   },
// };

const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(src) {
    return path.join(__dirname, src);
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    target: 'electron-main',
    entry: './src/main/main.ts',
    module: {
        rules
    },
    resolve: {
        alias: {
            '@main': srcPaths('src/main'),
            '@models': srcPaths('src/models'),
            '@renderer': srcPaths('src/renderer'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
};