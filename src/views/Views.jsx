import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventsView from './EventsView'
import EventDetailsView from './EventDetailsView'
import CreateEventView from './CreateEventView'
import { ProtectedRoute } from '../routes/ProtectedRoute'
import LoginView from './LoginView'
import PastEventsView from './PastEventsView'


const Views = () => {
  return (
    <Routes>
      {/* <Route path='/' element={ <EventsView /> } /> */}
      {/* <Route path='/events/:id' element={ <EventDetailsView /> } /> */}
      {/* <Route path='/create' element={ <CreateEventView /> } /> */}

      <Route path='/events/:id' element={ 
        <ProtectedRoute>
          <EventDetailsView />
        </ProtectedRoute>
      } />
      <Route path='/events' element={ 
        <ProtectedRoute>
          <EventsView /> 
        </ProtectedRoute>
      } />
      <Route path='/create' element={ 
        <ProtectedRoute>
          <CreateEventView /> 
        </ProtectedRoute>
      } />
      {/* test add route to history */}
      <Route path='/past' element={ 
        <ProtectedRoute>
          <PastEventsView /> 
        </ProtectedRoute>
      } />

      {/* <Route path='/login' element={ <LoginView /> } /> */}
      <Route path='/' element={ <LoginView /> } />

    </Routes>
  )
}

export default Views