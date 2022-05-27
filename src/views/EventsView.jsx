import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEvents } from '../store/actions/eventsAction'
import Event from '../components/Event'

const EventsView = () => {

  const dispatch = useDispatch()
  const { data: events, loading } = useSelector(state => state.events)
  const {userID} = useSelector(state => state.auth)
  
  useEffect(() => {
    if(userID) {
      dispatch(getEvents(userID))
    }
  }, [dispatch, userID])

  const themeNow = {
    bgclass: "bg-now"
  }

  return (
    <div className='mt-3 px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
      <h2 className='mb-4 p-2 text-center'>Event List</h2>
      
      { loading && <p>Loading...</p>}

      { !events.length && <h4 className='text-center mt-5'>No events to show!</h4>}
      
      { events
      .sort((a, b) => a.time > b.time ? 1 : -1)
      .filter(event => Date.parse(event.time) >= Date.now())
      .map(event => 
      <Event key={event.id} event={event} theme={themeNow} />) 
      }

      <div className='text-center text-link mt-5'>
        <Link to="/create" className='text-link' onClick={() => window.scrollTo(0, 0)}><i className="fa-solid fa-plus"></i> Add Event?</Link> 
      </div>

    </div>    
  )
}
export default EventsView