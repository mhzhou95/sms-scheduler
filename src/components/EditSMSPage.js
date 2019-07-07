import React from 'react';
import { connect } from 'react-redux';
import SMSForm from './SMSForm';
import { startEditSMS , startRemoveSMS} from '../actions/sms';

export class EditSMSPage extends React.Component{
  onRemove = () => {
    this.props.startRemoveSMS({id: this.props.sms.id})
    this.props.history.push('/')
  }
  onSubmit = (sms) => {
    this.props.startEditSMS(this.props.sms.id, sms);
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <SMSForm 
          sms = {this.props.sms}
          onSubmit={this.onSubmit}
        />
        <button onClick ={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    sms: state.texts.find((text)=>{
      return text.id === props.match.params.id;
    })
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startEditSMS: (id, sms) => dispatch(startEditSMS(id, sms)),
  startRemoveSMS: (data) => dispatch(startRemoveSMS(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSMSPage);