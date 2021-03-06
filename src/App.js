import './App.css';
import Navbar from './components/Navbar';
import Views from './views/Views'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkUser } from './store/actions/authActions'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  return (
    <div>
      <Navbar />

      <div className='container'>
        <Views />
      </div>

    </div>
  );
}

export default App;
