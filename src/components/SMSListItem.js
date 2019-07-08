import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

const SMSListItem = (props) => (
  
  <div className="sms-list-item"> 
    <Link className="sms-list-item-link" to={`/edit/${props.id}`}><h3>{moment(moment(props.sendAt)).format("dddd, MMMM Do YYYY, h:mm a")}</h3></Link>
    <p className="sms-list-item-text" >To: {props.number} - {props.message}</p>
  </div>
);

export default connect()(SMSListItem);