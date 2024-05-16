/* eslint-disable @typescript-eslint/no-explicit-any */
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout'
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import GuestGuard from '../../shared/guards/GuestGuard'
import { PATH } from './paths'
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { RouteConfig } from '@src/modules/shared/routes'



const routes: RouteConfig[] = [
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.LOGIN,
    component: lazy(() => import('../features/Login/Login')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
