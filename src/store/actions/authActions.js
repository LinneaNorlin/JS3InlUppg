import axios from 'axios'
import actiontypes from '../actiontypes'
// import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

const apiCall = (url, user, dispatch) => {
  axios.post(url, user)
  .then(res => {
    // console.log(res.data) //accessToken och hela user
    // console.log(user)//bara email och password
    // console.log(res.data.user.id) //ger user id
    dispatch(authSuccess(res.data))//plockar ut accessToken & hela user
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
      const data = { //lägger till const data för att få med user id när spara event
        accessToken: token,
        user: {
          id: jwt_decode(token).sub //sub är user id i den decodade token (ser i consollen, i redux, state)
        }
      }
      console.log(token)
      if(jwt_decode(token).exp * 1000 > Date.now()) {
        dispatch(authSuccess(data)) //sätter data här ist för token i tidigare version, får med både token och userid
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