import actiontypes from "../actiontypes";
import axios from 'axios'


export const getEventById = (id) => {
  return async dispatch => {
    dispatch(loadEventStart())

    try {
      const res = await axios.get('http://localhost:8080/events/' + id)
      dispatch(loadEventSuccess(res.data))
    } 
    catch (err) {
      dispatch(loadEventFailure(err.message))
    }
  }
}

const loadEventStart = () => {
  return {
    type: actiontypes().event.loadEventStart
  }
}

const loadEventSuccess = (event) => {
  return {
    type: actiontypes().event.loadEventSuccess,
    event: event
  }
}

const loadEventFailure = (err) => {
  return {
    type: actiontypes().event.loadEventFailure,
    payload: err
  }
}

export const clearEvent = () => {
  return {
    type: actiontypes().event.clearEvent
  }
}

//test add deletebtn
export const deleteEvent = (id) => {
  return async dispatch => {
    dispatch(loadEventStart())

    try {
      const res = await axios.delete('http://localhost:8080/events/' + id)
      dispatch(loadEventSuccess(res.data))
    } 
    catch (err) {
      dispatch(loadEventFailure(err.message))
    }
  }
}