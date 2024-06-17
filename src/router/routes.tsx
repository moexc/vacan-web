import { lazy } from 'react';

const Login = lazy(() => import('../pages/Authentication/Login'));
const Register = lazy(() => import('../pages/Authentication/Register'));

const Index = lazy(() => import('../pages/Index'))
const Suggest = lazy(() => import('../pages/Index/Suggest'))
const Notice = lazy(() => import('../pages/Index/Notice'))
const AuctionMart = lazy(() => import('../pages/Index/AuctionMart'))
const Report = lazy(() => import('../pages/Index/Report'))
const Contact = lazy(() => import('../pages/Index/Contact'))

const Bidding = lazy(() => import('../pages/Bidding'))

const Home = lazy(() => import('../pages/PerCenter/Home'));
const TradeList = lazy(() => import('../pages/PerCenter/Trade/TradeList'));
const TradeCompile = lazy(() => import('../pages/PerCenter/Trade/TradeCompile'));
const GoodsList = lazy(() => import('../pages/PerCenter/Goods/GoodsList'))
const GoodsCompile = lazy(() => import('../pages/PerCenter/Goods/GoodsCompile'))
const OrderList = lazy(() => import('../pages/PerCenter/Order/OrderList'))


const GoodsDetail = lazy(() => import('../pages/Goods/GoodsDetail'))
const Pay = lazy(() => import('../pages/Order/Pay'))
const PayResult = lazy(() => import('../pages/Order/PayResult'))

const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));

const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Error = lazy(() => import('../pages/Pages/Error'));

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
    {path: '/goods_detail/:id', element: <GoodsDetail/>, layout: 'blank'},
    {path: '/pay/:orderId', element: <Pay/>, layout: 'blank'},
    {path: '/pay/result/:orderId', element: <PayResult/>, layout: 'blank'},
    {path: '/bid', element: <Bidding />, layout: 'blank'},
    // 个人中心
    {path: '/home', element: <Home />},
    {path: '/trade', element: <TradeList />},
    {path: '/trade/add', element: <TradeCompile />},
    {path: '/trade/edit', element: <TradeCompile />},
    {path: '/goods', element: <GoodsList />},
    {path: '/goods/add', element: <GoodsCompile />},
    {path: '/goods/edit', element: <GoodsCompile />},
    {path: '/order', element: <OrderList/>},
    
    // 登录、注册
    {path: '/auth/login',element: <Login />,layout: 'blank',auth: false, header: false},
    {path: '/auth/register',element: <Register />,layout: 'blank',auth: false, header: false},
    {path: '/auth/password-reset',element: <RecoverIdBoxed />,layout: 'blank'},
    //error
    {path: '/pages/error404',element: <ERROR404 />,layout: 'blank'},
    {path: '/pages/error500',element: <ERROR500 />,layout: 'blank'},
    {path: '/pages/error503',element: <ERROR503 />,layout: 'blank'},
    {path: '*',element: <ERROR404 />,layout: 'blank'},
];

const gotoLogin = () => {
    window.location.href='/auth/login'
}

export { routes, gotoLogin };
