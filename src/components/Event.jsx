import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'


const Event = ({ event, theme }) => {

  return (
    
    <Link to={`/events/${event.id}`}  className="d-flex justify-content-between align-items-center bg-card">
      <div className="me-2">
        <h6 className={theme.bgclass}>{event.title}</h6>
      </div>
      <small className={theme.bgclass}>{moment(event.time).fromNow()}</small>
    </Link> 
    
  )
}

export default Event