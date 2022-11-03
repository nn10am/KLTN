import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.less'

export const Home = () => {
  let navigate = useNavigate()
  let location = useLocation()

  const handleLogout = () => {
    navigate('/login')
    localStorage.removeItem('token')
  }

  return (
    <div className="root-container">
      <h2>Home</h2>
      <div className="register-form">
        <Button type="primary" onClick={handleLogout} style={{ marginBottom: 20 }}>
          Logout
        </Button>
      </div>
    </div>
  )
}
