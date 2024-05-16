import { RouteConfig } from '.'
import authRoutes from '../../auth/routes/routes'
import homeRoute from '../../Home/routes/routes'
import pullRoutes from '../../PullRequest/routes/routes'

const routes: RouteConfig[] = [...authRoutes, ...homeRoute, ...pullRoutes]

export default routes
