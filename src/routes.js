import Login from './view/account/login';
import Logout from './view/account/logout';
import App from './containers/App';
import Home from './containers/Home';
import Admin from './containers/Admin';
import HomeIndex from './view/home';
import AdminIndex from './view/admin';

// 需要分块打包异步加载的页面，为了保证开发时热更新能够生效，需要在这里进行静态引入
if (process.env.NODE_ENV === 'develoption') {
    require('./view/home/test/test');
    require('./view/home/test/test2');
    require('./view/home/test/test3');
    require('./view/home/test/test4');
}

const errorLoading = (err) => {
    console.error('页面加载失败', err)
}

const loadRoute = (callback) => (module) => callback(null, module.default);

/**
 * 路由配置
 * 对于需要进行分块打包异步加载的页面，使用import()进行加载，同时在上页面进行require，方便开发时热更新
 * 否则使用 import 引入模块后进行赋值
 */
const routes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => replace('/index') },
    childRoutes: [
        { path: 'login', component: Login },
        { path: 'logout', component: Logout },
        {
            path: 'account',
            childRoutes: [
                { path: 'login', component: Login },
                { path: 'logout', component: Logout }
            ]
        },
        {
            component: App,
            childRoutes: [
                {
                    component: Home,
                    childRoutes: [
                        { path: 'index', component: HomeIndex },
                        { path: 'test', getComponents (nextState, cb) { import('./view/home/test/test').then(loadRoute(cb)).catch(errorLoading); } },
                        { path: 'test2', getComponents (nextState, cb) { import('./view/home/test/test2').then(loadRoute(cb)).catch(errorLoading); } },
                        { path: 'test3', getComponents (nextState, cb) { import('./view/home/test/test3').then(loadRoute(cb)).catch(errorLoading); } },
                        { path: 'test4', getComponents (nextState, cb) { import('./view/home/test/test4').then(loadRoute(cb)).catch(errorLoading); } }
                    ]
                },
                {
                    path: 'admin',
                    component: Admin,
                    indexRoute: { onEnter: (nextState, replace) => replace('/admin/index') },
                    childRoutes: [
                        { path: 'index', component: AdminIndex }
                    ]
                }
            ]
        }
    ]
}

export default routes;
