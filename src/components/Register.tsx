import Icon from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'utils/api/api'
import loginImg from '../assets/login.png'
import './style.less'

export const Register = () => {
  let navigate = useNavigate()

  const [user, setUser] = useState({
    fristName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleRegister = useCallback(async () => {
    if (!user.fristName || !user.lastName || !user.email || !user.userName || !user.password) {
      message.error('Please fill in all fields!')
      return
    }
    setLoading(true)
    await api
      .registerAPI(user)
      .then(async res => {
        if (res.data.success) {
          localStorage.setItem('token', 'Test')
          message.success('Successful Registration')
          navigate('/app/home')
        } else message.error(res.data.message)
      })
      .catch(err => {
        message.error(err.data.message)
      })
    setLoading(false)
  }, [user])

  return (
    <div className="root-container">
      <div className="root-login">
        {/* <div className="loginImage">
          <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
        </div> */}
        <div className="loginForm">
          <h2>Register</h2>
          <div className="login-form">
            <div className="input-form">
              <p style={{ marginBottom: 4 }}>FristName</p>
              <Input
                value={user.fristName}
                onChange={e => setUser({ ...user, fristName: e.target.value })}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="FristName"
              />
            </div>
            <div className="input-form">
              <p style={{ marginBottom: 4 }}>LastName</p>
              <Input
                value={user.lastName}
                onChange={e => setUser({ ...user, lastName: e.target.value })}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="LastName"
              />
            </div>
            <div className="input-form">
              <p style={{ marginBottom: 4 }}>Email</p>
              <Input
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />
            </div>
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
              onClick={handleRegister}
              className="login-form-button"
              loading={loading}
              style={{ marginBottom: 20 }}
            >
              Submit
            </Button>
            <div className="register-form">
              <Button type="link" onClick={() => navigate('/login')}>
                Back to login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
