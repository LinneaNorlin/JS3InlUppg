import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logoutUser } from '../store/actions/authActions'


const Navbar = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)
  
  return (
    // <nav className='d-flex justify-content-between p-2 mb-2'>
    <nav className='col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
      <div className='container'>
        {/* <div>
            <Link className='navbar-brand' to="/"><i class="fa-regular fa-calendar-days"></i></Link>
        </div> */}

        <ul className='nav-links d-flex justify-content-between'>
          {/* <li className='nav-link'><NavLink to="/" className="text-dark" >Events</NavLink></li> */}
          {/* <li className='nav-link'><NavLink to="/" className="text-dark" >Login</NavLink></li> */}
          { isAuth      
          ? (<>
            <li className='nav-link'><NavLink to="/events" className="text-dark" >Events</NavLink></li>
            <li className='nav-link'><NavLink to="/create" className="text-dark" >Create</NavLink></li>
            <li className='nav-link'><NavLink to="/past" className="text-dark" >History</NavLink></li>
            <li className='nav-link'><Link onClick={() => dispatch(logoutUser())} to="/" className="text-dark">Logout</Link></li>
            </>)
          // : <li className='nav-link'><NavLink to="/login" className="text-dark" >Login</NavLink></li>
          // : <li className='nav-link'><NavLink to="/" className="text-dark" >Login</NavLink></li>
          :
          // <>
            <Link className='mt-4' to="/"></Link>
          // </>

          }
        </ul>

      </div>
    </nav>
  )
}

export default Navbar