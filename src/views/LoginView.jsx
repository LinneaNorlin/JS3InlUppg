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
      // navigate(state?.from || "/")
      try {navigate(state.from)} 
      catch {navigate("/events")}
    }
  }, [user, navigate])
  // }, [user, navigate, state.from]) //kan ej lägga till, som terminalen säger, för då får jag inte upp loginform!


  return (
    <div className='mt-3'>
      { login
        ? <LoginForm setLogin={setLogin} />
        : <RegisterForm setLogin={setLogin} />
      }
    </div>
  )
}

export default LoginView