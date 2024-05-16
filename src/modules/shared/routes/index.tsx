/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, Fragment } from 'react'
import { Routes, Route, RouteProps } from 'react-router-dom'

import pages from './routes'
import LazyLoad from '../components/LazyLoad/LazyLoad'

export type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | undefined
  layout?: React.ComponentType<any> | typeof Fragment | undefined
} & RouteProps

export const renderRoutes = (routes: RouteConfig[] = []) => (
  <Suspense fallback={<LazyLoad />}>
    <Routes>
      {routes.map((route, index) => {
        const Component = route.component
        const Guard = route?.guard || Fragment
        const Layout = route?.layout || Fragment

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        )
      })}
    </Routes>
  </Suspense>
)

const routes: RouteConfig[] = [...pages]

export default routes
