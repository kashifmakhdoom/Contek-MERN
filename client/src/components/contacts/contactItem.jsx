import React, {useContext} from 'react'
import { PropTypes } from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({contact}) => {

  const contactContext = useContext(ContactContext);
  const { removeContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onRemove = () => {
    removeContact(_id);
    clearCurrent();
  }

  return (
    <div className='card bg-light' style={{borderRadius: '10px'}}>
      <h3 className="text-primary text-left">
        {name}{' '} <span style={{float: 'right'}} className={'badge ' + (type === 'business' ? 'badge-success' : 'badge-primary')}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (<li>
          <i className='fas fa-envelope-open'>&nbsp;{email}</i>
        </li>)}
        {phone && (<li>
          <i className='fas fa-phone'>&nbsp;{phone}</i>
        </li>)}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onRemove}>Remove</button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem;
