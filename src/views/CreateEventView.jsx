import { useEffect, useState } from 'react'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addEvent } from '../store/actions/eventsAction'
import EventsView from './EventsView'

const CreateEventView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const loading = useSelector(state => state.events.loading)
  const {loading, error} = useSelector(state => state.events)

  const [addedEvent, setAddedEvent] = useState(false)
  const [trimError, setTrimError] = useState(false) //ändrat från error till trimError, för att kunna ta in error i useselector

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    time: '' //sparas som string, kan konvertera om till ms sen för jmf
  })

  const onChange = e => {
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  //Add userId, behöver en useSelector där man tar in user först
  const {userID} = useSelector(state => state.auth)

  const handleSubmit = e => {
    e.preventDefault()
      //must fix validate both form fields better!
      if(formData.title.trim() === '' || formData.body.trim() === '') {
        setTrimError(true)
        return 
      }
      const evt = {
        ...formData,
        userId: userID
      }
    setTrimError(false)
    dispatch(addEvent(evt)) //Skickar med userId här, enl const evt, addat till formData.
    setAddedEvent(true)
  }

  useEffect(() => {
    if(error) {
      console.log(error)
    }
    else if(!loading && addedEvent) {
      navigate('/events')
    }    
  }, [loading, addedEvent, navigate])

  return (
    
    <div className='mt-3'>      
      <h2 className='mb-3 p-2 text-center'>Create new event</h2>
      
      <form onSubmit={handleSubmit} className="p-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
        <input type="text" name='title' onChange={onChange} value={formData.title} placeholder='Event title' className='form-control' autoFocus />
        {trimError && <p className='err-text mt-2 mb-2 ms-2'>You must fill in both fields!</p>}

        <textarea name="body" onChange={onChange} value={formData.body} placeholder='Information about the event...' className='form-control' cols="30" rows="10"></textarea>

        <input type="datetime-local" max="9999-12-31T00:00" name='time' onChange={onChange} value={formData.time} className='form-control' required />
        
        {!trimError && error && 
          <div className='mt-2 mb-2 ms-2'>
          <p className='err-text mb-0'>Save event failed, please try again!</p>
          <p className='err-small'>({error})</p>
          </div>
        }

        <button className='btn mt-2'>{ loading ? 'Loading...' : 'Add event'}</button>
      </form>
      
      <div>
        <div className='border-top border-grey mt-5'>
          <EventsView />
        </div>
      </div>

    </div>
  )
}

export default CreateEventView