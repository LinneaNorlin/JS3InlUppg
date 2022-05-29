const actiontypes = () => {
  return {
    events: {
      setEvents: 'SET_EVENTS',
      loading: 'EVENTS_LOADING',
      failure: 'EVENT_FAILURE',
      addNewEvent: 'ADD_NEW_EVENT',
      //test add deletebtn
      removeOne: 'REMOVE_ONE'
    },
    event: {
      loadEventStart: 'LOAD_EVENT_START',
      loadEventSuccess: 'LOAD_EVENT_SUCCESS',
      loadEventFailure: 'LOAD_EVENT_FAILURE',
      clearEvent: 'CLEAR_EVENT'
    },
    auth: {
      loading: 'AUTH_LOADING',
      authFailure: 'AUTH_FAILURE',
      authSuccess: 'AUTH_SUCCESS',
      logout: 'LOGOUT'
    }
  }
}

export default actiontypes;