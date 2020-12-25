const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, "src", "script.js"),
        "fibonacci-worker": path.resolve(__dirname, "src", "js", "fibonacci-worker.js")
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules:[
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {url: false}
                },{
                    loader: "less-loader"
                }]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
    ],
    watch: true
}