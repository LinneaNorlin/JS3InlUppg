import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logoutUser } from '../store/actions/authActions'


const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)
  
  return (
    <nav className="navbar-expand-lg nav-txt nav-bg">
      <div className="container-fluid p-1 ms-2">

      { isAuth      
        ? (<>
        <button
          className="navbar-toggler nav-txt"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className='nav-item'><NavLink to="/events" className="text-link" >Events</NavLink></li>
            <li className='nav-item'><NavLink to="/create" className="text-link" >Create</NavLink></li>
            <li className='nav-item'><NavLink to="/past" className="text-link" >History</NavLink></li>
            <li className='nav-item'><Link onClick={() => dispatch(logoutUser())} to="/" className="text-link">Logout</Link></li>
          </ul>
        </div>
        </>)
        : <Link className='mt-4' to="/"></Link>
        }

      </div>
    </nav>

  )
}

export default Navbar