import React from 'react';
import { connect } from 'react-redux';
import { removeSMS } from '../actions/sms';
import { Link } from 'react-router-dom';
import moment from 'moment';

const SMSListItem = (props) => (
  
  <div> 
    <Link to={`/edit/${props.id}`}><h3>{props.number}</h3></Link>
    <p>{props.message} - {moment(moment(props.sendAt)).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
    <p>{props.sendAt}</p>
  </div>
);

export default connect()(SMSListItem);