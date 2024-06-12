import { PATH } from '@src/modules/auth/routes/paths'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const isShowChildren = isAuthenticated
  return isShowChildren ? <Navigate to={PATH.REPO} /> : children
}

export default GuestGuard
