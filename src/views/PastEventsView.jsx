import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from '../store/actions/eventsAction'
import Event from '../components/Event'


const PastEventsView = () => {
  const dispatch = useDispatch()
  const { data: events, loading } = useSelector(state => state.events)

  const {userID} = useSelector(state => state.auth)
    useEffect(() => {
      dispatch(getEvents(userID))
    }, [dispatch, userID])
  
  const themePast = {
    bgclass: "bg-past"
  }

  return (
    <div className='mt-3 px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
      <h4 className='subheadline'>Events History</h4>

      { loading && <p>Loading...</p>}
      { !events.length && <h4 className='text-center mt-5'>No past events to show!</h4>}
      { events
      .sort((a, b) => a.time > b.time ? 1 : -1)
      .filter(event => Date.parse(event.time) < Date.now())
      .map(event => 
        <Event key={event.id} event={event} theme={themePast} />) 
      }
      
    </div>
  )
}

export default PastEventsView