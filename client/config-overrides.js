const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { override, addWebpackPlugin, fixBabelImports } = require('customize-cra')

module.exports = override(
    fixBabelImports('antd', {
        "libraryName": "antd",
        libraryDirectory: 'es',
        "style": 'css'
    }),
    addWebpackPlugin(new BundleAnalyzerPlugin())
)