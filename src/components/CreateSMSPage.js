import React from 'react';
import SMSForm from './SMSForm';
import { connect } from 'react-redux';
import { addSMS } from '../actions/sms';

class CreateSMSPage extends React.Component {
  onSubmit = (text) => {
    this.props.addSMS(text);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h2>Add SMS</h2>
        <SMSForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSMS: (text) => dispatch(addSMS(text))
});

export default connect (undefined, mapDispatchToProps)(CreateSMSPage);