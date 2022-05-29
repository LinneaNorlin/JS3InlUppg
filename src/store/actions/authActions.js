import axios from 'axios'
import actiontypes from '../actiontypes'
import jwt_decode from 'jwt-decode'

const apiCall = (url, user, dispatch) => {
  axios.post(url, user)
  .then(res => {
    dispatch(authSuccess(res.data))
  })
  .catch(err => dispatch(authFailure(err.message)))
}

export const registerUser = (user) => {
  return dispatch => {
    dispatch(loading())
    apiCall('http://localhost:8080/register', user, dispatch)
  }
}

export const loginUser = user => {
  return dispatch => {
    dispatch(loading())
    apiCall('http://localhost:8080/login', user, dispatch)
  }
}

export const logoutUser = () => {
  return {
    type: actiontypes().auth.logout
  }
}

export const checkUser = () => {
  return dispatch => {
    let token = localStorage.getItem('token')
    if(token) {
      const data = { 
        accessToken: token,
        user: {
          id: jwt_decode(token).sub
        }
      }
      // console.log(token)
      if(jwt_decode(token).exp * 1000 > Date.now()) {
        dispatch(authSuccess(data))
      } else {
        localStorage.removeItem('token')
      }
    }
  }
}

const loading = () => {
  return {
    type: actiontypes().auth.loading
  }
}

const authFailure = (err) => {
  return {
    type: actiontypes().auth.authFailure,
    payload: err
  }
}

const authSuccess = data => {
  return {
    type: actiontypes().auth.authSuccess,
    payload: data
  }
}