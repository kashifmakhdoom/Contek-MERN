import React, {useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { 
  SHOW_ALERT,
  HIDE_ALERT
 } from './../types';

 const AlertState = props => {
   const initialState = [];

   const [state, dispatch] = useReducer(alertReducer, initialState);

   // Show Alert
   const showAlert = (msg, type, timeout=5000) => {
    const id = uuidv4();
    dispatch({
      type: SHOW_ALERT,
      payload: {msg, type, id}
    });

    setTimeout(() => dispatch({type: HIDE_ALERT, payload: id}), timeout);
   };

   
   return (
     <AlertContext.Provider
      value={{
       alerts: state,
       showAlert
      }}>
       {props.children}
     </AlertContext.Provider>
   )
 }

 export default AlertState;
