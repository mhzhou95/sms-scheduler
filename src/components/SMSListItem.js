import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

const SMSListItem = (props) => (
  
  <div> 
    <Link to={`/edit/${props.id}`}><h3>{moment(moment(props.sendAt)).format("dddd, MMMM Do YYYY, h:mm a")}</h3></Link>
    <p>{props.number} - {props.message}</p>
    <p>{props.sendAt}</p>
  </div>
);

export default connect()(SMSListItem);