import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logoutUser } from '../store/actions/authActions'


const Navbar = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)
  
  return (
    // <nav className='col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
    // <div className='container'>
    
    //Tar bort navbar klassen, för att få bort synlig navbargräns, sätt mt
    <nav class="navbar-expand-lg navbar-light bg-light mt-2">
      <div class="container-fluid">

      { isAuth      
          ? (<>

        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
        {/* <ul className='nav-links d-flex justify-content-between'> */}
          <ul class="navbar-nav">
          {/* { isAuth      
          ? (<> */}
            <li className='nav-item'><NavLink to="/events" className="nav-link" >Events</NavLink></li>
            <li className='nav-item'><NavLink to="/create" className="nav-link" >Create</NavLink></li>
            <li className='nav-item'><NavLink to="/past" className="nav-link" >History</NavLink></li>
            <li className='nav-item'><Link onClick={() => dispatch(logoutUser())} to="/" className="nav-link">Logout</Link></li>
            {/* </>)
          :
            <Link className='mt-4' to="/"></Link>
          } */}
          </ul>
        </div>

        </>)
        :
          <Link className='mt-4' to="/"></Link>
        }

      </div>
    </nav>

  )
}

export default Navbar