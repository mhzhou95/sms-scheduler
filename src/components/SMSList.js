import React from 'react';
import { connect } from 'react-redux';
import SMSListItem from './SMSListItem';
import visibleSMS from '../selectors/sms';

const SMSList = (props) => (
  <div>
    {props.texts.map((sms)=> {
      return <SMSListItem key = {sms.id} {...sms} /> })}
  </div>
);

const mapStateToProps = (state) => {
  return {
    texts: visibleSMS(state.texts)
  }
}

export default connect (mapStateToProps)(SMSList);