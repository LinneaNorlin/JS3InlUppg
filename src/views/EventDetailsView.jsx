import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearEvent, getEventById } from '../store/actions/eventAction'
import { useParams } from 'react-router-dom'
import { deleteEvent } from '../store/actions/eventAction'
import { useNavigate } from 'react-router-dom'
// test time format
import moment from 'moment'
// import 'moment/locale/sv'

const EventDetailsView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getEventById(id))
    return () => {
      dispatch(clearEvent())
    }
  }, [dispatch, id])

  const { loading, data: event } = useSelector(state => state.event)

  // const { loading, data: event, error } = useSelector(state => state.event)


  return (
    <div className='mt-5 p-5 bg-card col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
      <p className='text-link text-start mb-3 ' onClick={() => {
        navigate(-1)
      }} ><i className="fa-solid fa-backward"></i> Go back</p>
      
      { event && 
      <div>
        <div className='mt-2 d-flex justify-content-between align-items-center'>
          
          <div className='col-6'>
            <h4>{event.title}</h4> 
            <div className='mt-2'>
              <small>{moment(event.time).format('MMMM Do YYYY, h:mm a')}</small>
            </div>
          </div>
          
          <button className='circle col-6 mb-1 pe-none'>
            To do <br></br>
            {moment(event.time).fromNow()}!
          </button>

        </div>
        
        <div>
          <p className='mt-2'>{event.body}</p>
        </div>

        <div className='mt-3'>
          {/* <p className='text-center'>To do {moment(event.time).fromNow()}!</p> */}
        </div>

        <button 
          className='btn mt-2' 
          onClick={() => dispatch(deleteEvent(event.id))}>
          <span className='text-danger me-2'><strong>X </strong>
          </span> Delete event
        </button>
        
      </div>
      }

      {loading && <p>Loading... </p>}
      {/* {!event && <p>Test</p> } */}

      {/* <div className='text-center mt-5'> */}
        {/* <Link className='link' to="/">To event list</Link> */}
        {/* <p className='text-link' onClick={() => { */}
          {/* navigate(-1) */}
        {/* }} >Go back</p> */}
      {/* </div> */}

    </div>
  )
}


export default EventDetailsView