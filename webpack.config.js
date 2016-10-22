var path = require('path');
var webpack = require('webpack');
var config;
var nodeEnv;
var component;

var allConfigs = {
    MapUI: {
        context: __dirname,
        entry: "./src/js/mapui/mapui.app.js",
        output: {
            path: "dist/app/bundles/mapui",
            filename: "mapui-packed.js"
        },
        resolve: {
            root: path.resolve('./mapui'),
            extensions: ['', '.js', '.jsx']
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                },
                'API_DOMAIN' :  '""'
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015','react']
                    }
                },
                {
                    test: require.resolve('react'),
                    loader: 'expose?React'
                }
            ]
        },
        node: {
            //console: 'empty',
            //fs: 'empty',
            //net: 'empty',
            tls: 'empty'
        }
    }
};

component = process.env.COMPONENT === undefined ? "No component specified!" : process.env.COMPONENT;
nodeEnv = process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV;

console.log("Building component: " + component);
console.log("Building for: " + nodeEnv);

config = allConfigs[component];

module.exports = config;
