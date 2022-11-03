import { Login } from 'components/Login'
import { Register } from 'components/Register'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppRouter } from './AppRouter'

export const AuthRouter = () => {
  const renderApp = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/app/*"
            element={
              <RequireAuth>
                <AppRouter />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    )
  }

  return renderApp()
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let location = useLocation()
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
