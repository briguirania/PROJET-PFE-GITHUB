/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { RouteConfig } from '@src/modules/shared/routes'
import { lazy } from 'react'
import GuestGuard from '../../shared/guards/GuestGuard'
import { PATH } from '@src/modules/auth/routes/paths'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'



const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.HOME,
    component: lazy(() => import('../Home')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
