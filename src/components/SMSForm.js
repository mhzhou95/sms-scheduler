import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class SMSForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      number: props.sms? props.sms.number : '',
      message: props.sms? props.sms.message : '',
      timeHours: props.sms? moment(props.sms.sendAt).hour() : '',
      timeMinutes: props.sms? moment(props.sms.sendAt).minute() : '',
      timeFinal: '',
      sendAt: '',
      error: '',
      calendarFocused: false,
      createdAt: props.sms? moment(props.sms.sendAt) : moment(),
    }
  }
  onNumberChange = (event) => {
    const number = event.target.value;
    if (!number || number.match(/^[0-9]{1,10}$/)){
      this.setState( () => ({
        number: number
      })) 
    }
  }
  onMessageChange = (event) => {
    const message = event.target.value;
    this.setState(()=> ({
      message: message
    }))
  } 
  onTimeHoursChange = (event) => {
    const time = event.target.value;
    if (!time || time.match(/^[0-9]{1,2}$/)){
      this.setState( () => ({
        timeHours: time
      })) 
    }
  }
  onTimeMinutesChange = (event) => {
    const timeTwo = event.target.value;
    if (!timeTwo || timeTwo.match(/^[0-9]{1,2}$/)){
      this.setState( () => ({
        timeMinutes: timeTwo
      })) 
    }
  }
  onSetTime = () => {
    const day = this.state.createdAt.format("D")
    this.setState( () => ({
      timeFinal: moment().date(day).hours(this.state.timeHours).minutes(this.state.timeMinutes).seconds(0)
    }))
  }
  onDateChange = (createdAt) => {
    this.setState(()=> ({ createdAt: createdAt }))
  }
  onFocusChange = ({ focused}) => {
    this.setState( ()=> ({calendarFocused: focused}))
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.onSetTime();
    console.log(this.state.timeFinal);
    if (!this.state.number || !this.state.message || this.state.number.length < 10 || this.state.timeFinal.length < 4){
      this.setState(()=> ({
        error: 'Either phone number or Time is not valid Message is empty'
      }))
    }else{
      this.setState(()=> ({ error: ''}));
      this.props.onSubmit({
        number: this.state.number,
        message: this.state.message,
        sendAt: this.state.timeFinal.valueOf()
      }); 
    }
  }
  render() {
    return(
      <div>
      {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}> 
          <input type="text" placeholder = "phone number" autoFocus value={this.state.number} onChange={this.onNumberChange} />
          <input type="text" placeholder = "message" value ={this.state.message} onChange= {this.onMessageChange} />
          <div>
            <input type="text" placeholder = "00" value = {this.state.timeHours} onChange={this.onTimeHoursChange} />
             : 
            <input type="text" placeholder = "00" value = {this.state.timeMinutes} onChange={this.onTimeMinutesChange} />
            <select> 
              <option value= "AM">AM</option>
              <option value= "PM">PM</option>
            </select>
          </div>
          <div>
          <SingleDatePicker 
            date = {this.state.createdAt}
            onDateChange = {this.onDateChange}
            focused = {this.state.calendarFocused}
            onFocusChange = {this.onFocusChange}
            numberOfMonths = {1}
          /> </div>
          <button>Create SMS</button>
        </form>
      </div>
    );
  }
}

export default SMSForm;