import axios from 'axios'
import actiontypes from '../actiontypes'

export const getEvents = (userId) => {
  return async dispatch => {
    dispatch(loading(true))
    try {
      const res = await axios.get('http://localhost:8080/events?userId=' + userId)
      dispatch(setEvents(res.data))
    }
    catch(err) {
      dispatch(eventsFailure(err.message))
    }
  }
}

export const addEvent = (event) => {
  // console.log(event)
  return async dispatch => {
    dispatch(loading(true))
    try {
      const res = await axios.post('http://localhost:8080/events', event)
      // console.log(res.data)
      dispatch(addToList(res.data))
    }
    catch(err) {
      dispatch(eventsFailure(err.message))
    }
  }
}

export const deleteEvent = (id) => {
  return async dispatch => {
    dispatch(loading(true))
    try {
      const res = await axios.delete('http://localhost:8080/events/' + id)
      dispatch(loading(false))
    } 
    catch (err) {
      dispatch(eventsFailure(err.message))
    }
  }
}

const addToList = (event) => {
  return {
    type: actiontypes().events.addNewEvent,
    payload: event
  }
}

const loading = (payload) => {
  return {
    type: actiontypes().events.loading,
    payload
  }
}

const setEvents = (events) => {
  return {
    type: actiontypes().events.setEvents,
    payload: events
  }
}

const eventsFailure = (payload) => {
  return {
    type: actiontypes().events.failure,
    payload
  }
}
