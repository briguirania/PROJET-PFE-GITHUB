/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATH } from '@src/modules/auth/routes/paths'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { RouteConfig } from '@src/modules/shared/routes'
import { lazy } from 'react'

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard as any,
    path: PATH.PULL,
    component: lazy(() => import('../index')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
