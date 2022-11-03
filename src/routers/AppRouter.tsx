import { Home } from 'components/Home'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

export const AppRouter = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    if (token) navigate(location?.pathname || '/app', { replace: true })
  }

  const renderApp = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/app/*" element={<Navigate to="/home" replace />} />
        </Routes>
      </>
    )
  }

  return renderApp()
}
