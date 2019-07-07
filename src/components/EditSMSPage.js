import React from 'react';
import { connect } from 'react-redux';
import SMSForm from './SMSForm';
import { editSMS , removeSMS } from '../actions/sms';

const EditSMSPage = (props) => {
  console.log(props);
  return (
    <div>
      <SMSForm 
        sms = {props.sms}
        onSubmit={ (sms) => {
          props.dispatch(editSMS(props.sms.id, sms));
          props.history.push('/')
        }}
      />
      <button onClick ={ ()=> {
        props.dispatch(removeSMS( { id: props.sms.id } ))
        props.history.push('/')
      }}>Remove</button>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    sms: state.texts.find((text)=>{
      return text.id === props.match.params.id;
    })
  }
}
export default connect(mapStateToProps)(EditSMSPage);