import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearEvent, getEventById } from '../store/actions/eventAction'
import { deleteEvent } from '../store/actions/eventsAction'
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
          <div className='confirm text-center p-2'>
            <h6 className='mt-4 p-1'><strong>{message}</strong></h6>
            <div className='m-4 d-flex flex-column align-items-center'>
              <button className='btn-confirm btn-yes d-flex align-items-center ps-3 pe-4' 
                onClick={onConfirm}>
                <i className="fa-solid fa-trash-can err-text p-0 m-0 h5"></i> 
                <span className='ms-2'> Yes, delete</span>
              </button>
              <button className='btn-confirm btn-no' onClick={onCancel}>No, keep</button>
            </div>
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
    <div className='event-details'>
      <div className='mt-5 p-5 bg-card col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
        <p className='text-link text-start mb-3 ms-1 p-1' 
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
            className='btn mt-2 d-flex align-items-center ps-3 pe-4' 
            onClick={handleDelete}>
            <i className="fa-solid fa-trash-can err-text h5 p-0 m-0"></i>
            <span className='ms-2'> Delete event</span>
          </button>
        </div>
        }

        {loading && <p>Loading... </p>}
      </div>
    </div>
  )
}

export default EventDetailsView