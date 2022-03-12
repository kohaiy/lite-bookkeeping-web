import { useRoutes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RouteHandler from './RouteHandler';
import routes, { RouteParams } from './routes';

export const history = createBrowserHistory();

const routeWrapper = (route: RouteParams) => {
    route.element = <RouteHandler auth={route.auth}>{route.element}</RouteHandler>;
    if (route.children?.length) {
        route.children.map((r) => routeWrapper(r));
    }
    return route;
};
const wrapperRoutes = routes.map((r) => routeWrapper(r));

const Router: React.FC = () => {
    return useRoutes(wrapperRoutes);
};

export default Router;
