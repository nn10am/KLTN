import { Button, Input, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '@ant-design/icons'
import './style.less'
import loginImg from '../assets/login.png'
import api from 'utils/api/api'

export const Login = () => {
  let navigate = useNavigate()
  let location = useLocation()

  const [user, setUser] = useState({
    userName: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigateLogin()
  }, [])

  const handleLogin = useCallback(async () => {
    if (!user.userName || !user.password) {
      message.error('Please enter your userName and password!')
      return
    }
    setLoading(true)
    await api
      .loginAPI(user)
      .then(async res => {
        if (res.data.success) {
          localStorage.setItem('token', 'Test')
          message.success('Succesfully Login')
          navigateLogin()
        } else message.error(res.data.message)
      })
      .catch(err => {
        message.error(err.data.message)
      })
    setLoading(false)
  }, [user])

  const navigateLogin = () => {
    const from = (location?.state as any)?.from?.pathname || '/app/home'
    navigate(from, { replace: true })
  }

  return (
    <div className="root-container">
      <div className="root-login">
        {/* <div className="loginImage">
          <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
        </div> */}
        <div className="loginForm">
          <h2>Login</h2>
          <div className="login-form">
            <div className="input-form">
              <p style={{ marginBottom: 4 }}>Username</p>
              <Input
                value={user.userName}
                onChange={e => setUser({ ...user, userName: e.target.value })}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </div>
            <div className="input-form">
              <p style={{ marginBottom: 4 }}>Password</p>
              <Input
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </div>
            <Button
              type="primary"
              onClick={handleLogin}
              className="login-form-button"
              loading={loading}
              style={{ marginBottom: 20 }}
            >
              Log in
            </Button>
            <div className="register-form">
              <Button type="link" onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
