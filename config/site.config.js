const site = {
    cjyun: {
        name: 'CJYUN',
        title: 'e采云平台',
        short_title: '云平台',
        host: '10.0.0.123',
        port: 80,
        api: 'test-cjyun-api.ecaicn.com'
    },
    cjtlis: {
        name: 'CJTLIS',
        title: 'e采学情系统',
        short_title: '学情系统',
        host: '10.0.0.200',
        port: 80,
        api: 'test-cjtlis-api.ecaicn.com'
    },
    cjcms: {
        name: 'CJCMS',
        title: 'e采备课系统',
        short_title: '备课系统',
        host: '10.0.0.123',
        port: 80,
        api: 'test-cjcms-api.ecaicn.com',
        needLogin: true
    },
    cjhms: {
        name: 'CJHMS',
        title: 'e采课业系统',
        short_title: '课业系统',
        host: '10.0.0.123',
        port: 80,
        api: 'test-cjhms-api.ecaicn.com',
        needLogin: true
    }
}

module.exports = site;
