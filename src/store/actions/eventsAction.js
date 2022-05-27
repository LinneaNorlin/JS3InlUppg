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

export const addEvent = (event) => { //vad är event? Allt jag stoppar in i parantesen där jag dispatchar addEventfunktionen i CEV?
  console.log(event) //Ja, det här är formData (det jag fyllt i)
  return async dispatch => {
    dispatch(loading(true))
    try {
      const res = await axios.post('http://localhost:8080/events', event)
      console.log(res.data) //det här är oxå formData, men med id oxå
      dispatch(addToList(res.data))
    }
    catch(err) {
      dispatch(eventsFailure(err.message))
    }
  }
}

//test
// export const deleteEvent = (id) => {
//   return async dispatch => {
//     dispatch(loading(true))
//     try {
//       const res = await axios.delete('http://localhost:8080/events/' + id)
//       console.log(res.data)
//       dispatch(removeOne(res.data))
//     }
//     catch(err) {
//       dispatch(eventsFailure(err.message))
//       // return
//     }
//   }
// }
// export const removeOne = (id) => {
//   return {
//       type: actiontypes().events.removeOne,
//       payload: id //event.id el event & event i parantesen
//   }
// }
// export const deleteEvent = (id) => {
//   return async dispatch => {
//     dispatch(loading(true))
//     try {
//       const res = await axios.delete('http://localhost:8080/events/' + id)
//       dispatch(setEvents(res.data))
//     }
//     catch(err) {
//       dispatch(eventsFailure(err.message))
//     }
//   }
// }


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
