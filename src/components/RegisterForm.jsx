import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/actions/authActions'


const RegisterForm = ({setLogin}) => {
  const dispatch = useDispatch()
  const {loading, error} = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    dispatch(registerUser(formData))
  }

  return (
    <div className='mt-3'>
      <h2 className='mb-4 p-2 text-center headline'>Event Tracker</h2>
      <h4 className='subheadline'>Register</h4>

      <form className='px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto' onSubmit={handleSub}>
        <div className="">
          <label htmlFor="firstName">First Name: </label>
          <input value={formData.firstName} onChange={onChange} type="text" id='firstName' name='firstName' className='form-control' required />
        </div>
        <div className="">
          <label htmlFor="lastName">Last Name: </label>
          <input value={formData.lastName} onChange={onChange} type="text" id='lastName' name='lastName' className='form-control' required />
        </div>
        <div className="">
          <label htmlFor="email">Email: </label>
          <input value={formData.email} onChange={onChange} type="email" id='email' name='email' className='form-control' required />
        </div>
        <div className="">
          <label htmlFor="password">Password: </label>
          <input value={formData.password} onChange={onChange} type="password" id='password' name='password' className='form-control' required />
        </div>
        <div className='mb-4'>
        {error &&
          <div className='mt-2 mb-2 text-center'>
          <p className='err-text mb-0'>Registration failed, please check your input!</p>
          <p className='err-small'>({error})</p>
          </div>
          }
          <label></label>
          <button className='btn btn-block'>{loading ? 'Loading...' : 'Register'}</button>
        </div>
        <p className='text-center mb-0'>Already a member?</p>
        <p className='text-center text-link' onClick={() => setLogin(true)}> Login</p>
      </form>

    </div>
  )
}

export default RegisterForm