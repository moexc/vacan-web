import { lazy } from 'react';

const Index = lazy(() => import('../pages/Index'))
const Suggest = lazy(() => import('../pages/Index/Suggest'))
const Notice = lazy(() => import('../pages/Index/Notice'))
const AuctionMart = lazy(() => import('../pages/Index/AuctionMart'))
const Report = lazy(() => import('../pages/Index/Report'))
const Contact = lazy(() => import('../pages/Index/Contact'))

const Home = lazy(() => import('../pages/PerCenter/Home'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Error = lazy(() => import('../pages/Pages/Error'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const Register = lazy(() => import('../pages/Authentication/Register'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const TradeList = lazy(() => import('../pages/PerCenter/Trade/TradeList'));
const TradeAdd = lazy(() => import('../pages/PerCenter/Trade/TradeAdd'));

const routes = [
    {path: '/', element: <Index />, layout: 'blank', auth: false, 
        children: [
            {path: '/suggest', element: <Suggest/>},
            {path: '/notice', element: <Notice/>},
            {path: '/auction_mart', element: <AuctionMart/>},
            {path: '/report', element: <Report/>},
            {path: '/contact', element: <Contact/>},
            {index: true, element: <Suggest/>},
        ]
    },
    // 个人中心
    {path: '/home', element: <Home />},
    {path: '/trade', element: <TradeList />},
    {path: '/trade/add', element: <TradeAdd />},
    {path: '/trade/edit', element: <TradeAdd />},
    // 登录、注册
    {path: '/auth/login',element: <Login />,layout: 'blank',auth: false},
    {path: '/auth/register',element: <Register />,layout: 'blank',auth: false},
    {path: '/auth/password-reset',element: <RecoverIdBoxed />,layout: 'blank'},
    //error
    {path: '/pages/error404',element: <ERROR404 />,layout: 'blank'},
    {path: '/pages/error500',element: <ERROR500 />,layout: 'blank'},
    {path: '/pages/error503',element: <ERROR503 />,layout: 'blank'},
    {path: '*',element: <Error />,layout: 'blank'},
];

export { routes };
