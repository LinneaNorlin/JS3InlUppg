import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearEvent, getEventById } from '../store/actions/eventAction'
import { useParams } from 'react-router-dom'
// import { deleteEvent } from '../store/actions/eventAction'
import { deleteEvent } from '../store/actions/eventsAction'

import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { confirm } from 'react-confirm-box';

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

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <>
          <div className='bg-light'>
          <h6 className='text-center p-2'>{message}</h6>
          <button className='btn mt-2 ms-2' onClick={onConfirm}>Yes</button>
          <button className='btn mt-2 me-2' onClick={onCancel}>No</button>
          </div>
        </>
      );
    }
  };
  
  const handleDelete = async () => {
      const result = await confirm("Are you sure?", options);
    if (result) {
      try {
        dispatch(deleteEvent(id))      
        navigate('/events')
      } catch (error) {
        console.log(error)
      }
    }
  }



  const { loading, data: event } = useSelector(state => state.event)

  return (
    <div className='mt-5 p-5 bg-card col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
      <p className='text-link text-start mb-3 ' 
        onClick={() => {
        navigate(-1)
        }} >
        <i className="fa-solid fa-backward"></i> Go back
      </p>
      
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
        <button 
          className='btn mt-2' 
          onClick={handleDelete}>
          <span className='text-danger me-2'><strong>X </strong>
          </span> Delete event
        </button>
      </div>
      }

      {loading && <p>Loading... </p>}
    </div>
  )
}

export default EventDetailsView