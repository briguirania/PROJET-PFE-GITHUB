import { RouteConfig } from '.';
import authRoutes from '../../auth/routes/routes';
import homeRoute from '../../Home/routes/routes';

 const routes: RouteConfig [] =[
  ...authRoutes,
  ...homeRoute
]


export default routes
