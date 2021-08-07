import React, {Fragment, useContext} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const {isAuthenticated, logout, user} = authContext

  const contactContext = useContext(ContactContext)
  const {clearContacts} = contactContext

  const onLogout = () => {
    logout();
    clearContacts();
  }

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i><span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
          <Link to='/register'>
            <i className='fas fa-file-medical' />
            &nbsp;Register
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <i className='fas fa-key' />
            &nbsp;Login
          </Link>
        </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary' style={{width: '100%'}}>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li className='margin: 0 10px; display: inline'>
          <Link to='/'>
            <i className='fas fa-home' />
            &nbsp;Home
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <i className='fas fa-user' />
            &nbsp;About
          </Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contek',
  icon: 'fas fa-address-card',
}

export default Navbar
