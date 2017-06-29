const path = require('path');
const url = require('url');
const merge = require('lodash/merge');

const _root = path.resolve(__dirname, '../');
const site = require('./site.config');

function pathResolve () {
    const args = [_root].concat([].slice.call(arguments))
    return path.resolve.apply(path, args)
}

const config = {
    // 站点信息
    info: {                         // 对于存在于site列表中的项目，可只配置站点名称，其它值则会从site列表中取，但这里的配置项目优化级较高
        name: 'CJLAB',
        title: '采集前端实验室',
        short_title: '前端实验室',
        host: '10.0.3.10',
        port: 9903
    },

    root: _root,                                            // 站点根目录
    dir_src: path.join(_root, 'src'),                       // 开发目录
    dir_dist: path.join(_root, 'dist'),                     // 部署目录
    dir_components: path.join(_root, 'src/components'),     // 组件目录
    dir_libs: path.join(_root, 'libs'),                     // 打包库目录

    // 站点列表
    site: site,

    // 通用扩展类库，这部分库会被预编译
    vendors: [
        'react',
        'react-redux',
        'react-router',
        'redux',
        'react-dom'
    ]
};

// 处理站点信息
const siteName = config.info && config.info.name;
if (!siteName) {
    throw new Error('config.info.name 不能为空！');
}
const siteConfig = config.site[siteName.toLowerCase()] || {};
config.info = merge({}, siteConfig, config.info);

/**
 * 路径处理
 * @example
 * config.pathResolve.root();               // => '/'
 * config.pathResolve.root('dir1');         // => '/dir1'
 * config.pathResolve.src();                // => '/src'
 * config.pathResolve.src('dir1');          // => '/src/dir1'
 * config.pathResolve.components();         // => '/src/components'
 * config.pathResolve.components('dir1');   // => '/src/components/dir1'
 */
config.pathResolve = {
    root: pathResolve,
    src: pathResolve.bind(null, config.dir_src),
    dist: pathResolve.bind(null, config.dir_dist),
    components: pathResolve.bind(null, config.dir_components),
    libs: pathResolve.bind(null, config.dir_libs)
};

/**
 * api链接处理
 * @param {string} siteName 
 * @param {string} pathname - 路径，必输
 * @example
 * config.apiResolve('current', 'aaa')      // => 'http://xxx-api.ecaicn.com/aaa'
 * config.apiResolve('cjhms', 'aaa')        // => 'http://cjhms-api.ecaicn.com/aaa'
 */
config.apiResolve = (siteName, pathname) => {
    if (!pathname) {
        return '';
    }
    siteName = siteName && siteName.toLowerCase();
    const apiHost = siteName && siteName !== 'current' ? config.site[siteName].api : config.info.api;
    const apiPath = apiHost ? url.format({
        protocol: 'http',
        host: apiHost,
        pathname
    }) : '';
    return apiPath;
};

/**
 * 站点链接处理
 * @example
 * // 返回当前站点链接
 * config.siteResolve()                 // => 'http://xxx.ecaicn.com'
 * config.siteResolve('current')        // => 'http://xxx.ecaicn.com'
 * config.siteResolve('current', 'aaa') // => 'http://xxx.ecaicn.com/aaa'
 * // 返回cjhms项目站点链接
 * config.siteResolve('cjhms')          // => 'http://cjhms.ecaicn.com'
 * config.siteResolve('cjhms', 'aaa')   // => 'http://cjhms.ecaicn.com/aaa'
 */
config.siteResolve = (siteName, pathname = '') => {
    siteName = siteName && siteName.toLowerCase();
    const {host, port} = siteName && siteName !== 'current' ? config.site[siteName] : config.info;
    const sitePath = url.format({
        protocol: 'http',
        hostname: host,
        port: port === 80 ? '' : port,
        pathname
    });
    return sitePath;
};

module.exports = config;
