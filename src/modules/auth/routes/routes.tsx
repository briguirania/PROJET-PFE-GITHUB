/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { RouteConfig } from '@src/modules/shared/routes'
import { lazy } from 'react'
import GuestGuard from '../../shared/guards/GuestGuard'
import { PATH } from './paths'

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.LOGIN,
    component: lazy(() => import('../features/Login/Login')),
    layout: (props: any) => <UniverseWrapper {...props} includeGlobe />,
  },
]

export default routes
