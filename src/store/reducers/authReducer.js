import actiontypes from "../actiontypes";

const initState = {
  token: null,
  userID: null,
  loading: false,
  error: null
}

const authReducer = (state = initState, action) => {
  switch(action.type) {

    case actiontypes().auth.loading:
      return {
        ...state,
        loading: true
      }

    case actiontypes().auth.authFailure:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actiontypes().auth.authSuccess:
      localStorage.setItem('token', action.payload.accessToken)
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.accessToken,
        userID: action.payload.user.id
      }

    case actiontypes().auth.logout:
      localStorage.removeItem('token')
      return {
        ...initState
      }

    default:
      return state
  }
}

export default authReducer;