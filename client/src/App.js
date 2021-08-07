import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Alerts from './components/layout/Alerts'
import PrivateRoute from './components/routing/privateRoute'

import AuthState from './context/auth/authState'
import ContactState from './context/contact/contactState'
import AlertState from './context/alert/alertState'

import setAuthToken from './utils/setAuthToken'
import './App.css'

if (localStorage.getItem('_token')) {
  setAuthToken(localStorage.getItem('_token'))
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App
