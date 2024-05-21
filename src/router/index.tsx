import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import AuthCheck from '../components/AuthCheck';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: <AuthCheck auth={route.auth} path={route.path}>
            {route.layout === 'blank' ? 
                <BlankLayout header={route.header}>{route.element}</BlankLayout> : 
                <DefaultLayout>{route.element}</DefaultLayout>
            }
        </AuthCheck>,
    };
});

const router = createBrowserRouter(finalRoutes);
// const router = createHashRouter(finalRoutes);

export default router;
