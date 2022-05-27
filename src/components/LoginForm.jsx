import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../store/actions/authActions'

const LoginForm = ({setLogin}) => {
  
  const dispatch = useDispatch()
  // const loading = useSelector(state => state.auth.loading)
//test error...
  const {loading, error} = useSelector(state => state.auth) //funkar loading om jag tar bort loading från slutet? Verkar så!
  // const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const onChange = e => {
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const handleSub = e => {
    e.preventDefault()

    //test error
    // if(error.status === 400) { //hur få tag i status??
    //   setError(true)
    //   return
    // }
    // setError(false)
    
    dispatch(loginUser(formData))
  }

  return (
    <div className='mt-3'>
      <h2 className='mb-4 p-2 text-center headline'>Event Tracker</h2>
      <h4 className='mb-4 p-2 text-center'>Login</h4>
      

      <form className='p-3 bg-card col-12 col-md-10 col-lg-8 col-xl-6 mx-auto' onSubmit={handleSub}>
        <div className="">
          <label htmlFor="email">Email: </label>
          <input value={formData.email} onChange={onChange} type="email" id='email' name='email' className='form-control' required />
        </div>
        <div className="">
          <label htmlFor="password">Password: </label>
          <input value={formData.password} onChange={onChange} type="password" id='password' name='password' className='form-control' required />
        </div>
        <div className='mb-4'>
          {error && <p className='text-danger mt-2 mb-2 text-center'><strong>Validation failed, please check your input!</strong></p>}
          <button className='btn mt-2'>{loading ? 'Loading...' : 'Login'}</button>
          {/* {error && alert('Validation failed, please check your input!')} */}

        </div>
        <p className='text-center mb-0'>Not a member?</p>
        <p className='text-center text-link' onClick={() => setLogin(false)}> Register</p>
      </form>

    </div>
  )
}

export default LoginForm