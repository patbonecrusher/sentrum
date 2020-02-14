// const rules = require('./webpack.rules');
// const plugins = require('./webpack.plugins');

// rules.push({
//   test: /\.css$/,
//   use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
// });

// module.exports = {
//   module: {
//     rules,
//   },
//   plugins: plugins,
//   resolve: {
//     extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
//   },
// };

const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(src) {
    return path.join(__dirname, src);
}

module.exports = {
    mode: 'development',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
        rules
    },
    resolve: {
        alias: {
            '@main': srcPaths('src/main'),
            '@models': srcPaths('src/models'),
            '@renderer': srcPaths('src/renderer'),
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
};