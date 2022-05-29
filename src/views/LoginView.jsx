import { useState, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


const LoginView = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.token)
  const { state } = useLocation()
  const [login, setLogin] = useState(true)

  useEffect(() => {
    if(user) {
      try {navigate(state.from)} 
      catch {navigate("/events")}
    }
  }, [user, navigate])

  return (
    <div>
      { login
        ? <LoginForm setLogin={setLogin} />
        : <RegisterForm setLogin={setLogin} />
      }
    </div>
  )
}

export default LoginView