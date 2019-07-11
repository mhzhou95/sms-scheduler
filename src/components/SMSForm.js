import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class SMSForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.sms ? props.sms.number : '',
      message: props.sms ? props.sms.message : '',
      timeHours: props.sms ? moment(props.sms.sendAt).hour() : '',
      timeMinutes: props.sms ? moment(props.sms.sendAt).minute() : '',
      timeFinal: '',
      sendAt: '',
      value: 'AM',
      error: '',
      calendarFocused: false,
      createdAt: props.sms ? moment(props.sms.sendAt) : moment()
    };
  }
  onNumberChange = event => {
    const number = event.target.value;
    if (!number || number.match(/^[0-9]{1,10}$/)) {
      this.setState(() => ({
        number: number
      }));
    }
  };
  onMessageChange = event => {
    const message = event.target.value;
    this.setState(() => ({
      message: message
    }));
  };
  onTimeHoursChange = event => {
    const time = event.target.value;
    if (!time || time.match(/^[0-9]{1,2}$/)) {
      this.setState(() => ({
        timeHours: time
      }));
    }
  };
  onTimeMinutesChange = event => {
    const timeTwo = event.target.value;
    if (!timeTwo || timeTwo.match(/^[0-9]{1,2}$/)) {
      this.setState(() => ({
        timeMinutes: timeTwo
      }));
    }
  };
  onSetTime = () => {
    const day = this.state.createdAt.format('D');
    const month = parseInt(this.state.createdAt.format('M'), 10) - 1;
    if (this.state.value === 'PM') {
      const hoursPM = parseInt(this.state.timeHours, 10) + 12;
      this.setState(() => ({
        timeFinal: moment()
          .month(month)
          .date(day)
          .hours(hoursPM)
          .minutes(this.state.timeMinutes)
          .seconds(0)
      }));
    } else {
      this.setState(() => ({
        timeFinal: moment()
          .month(month)
          .date(day)
          .hours(this.state.timeHours)
          .minutes(this.state.timeMinutes)
          .seconds(0)
      }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt: createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onHandleChange = event => {
    const value = event.target.value;
    this.setState(() => ({ value: value }));
  };
  onSubmit = event => {
    event.preventDefault();
    this.onSetTime();
    // half a second delay so this.onSetTime() can run
    setTimeout(() => {
      if (
        !this.state.number ||
        !this.state.message ||
        this.state.number.length < 10 ||
        this.state.timeFinal.length < 4
      ) {
        this.setState(() => ({
          error: 'Please Enter valid number message and time'
        }));
      } else {
        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
          number: this.state.number,
          message: this.state.message,
          sendAt: this.state.timeFinal.valueOf()
        });
      }
    }, 500);
  };
  render() {
    return (
      <div>
        <div className='form-error'>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <form onSubmit={this.onSubmit} className='sms-form'>
          <input
            className='input-text-number'
            type='text'
            placeholder='9 digit phone #'
            autoFocus
            value={this.state.number}
            onChange={this.onNumberChange}
          />
          <input
            className='input-text-message'
            type='text'
            placeholder='message'
            value={this.state.message}
            onChange={this.onMessageChange}
          />
          <div>
            <input
              className='input-time'
              type='text'
              placeholder='00'
              value={this.state.timeHours}
              onChange={this.onTimeHoursChange}
            />
            <div className='input-time-colon'> : </div>
            <input
              className='input-time'
              type='text'
              placeholder='00'
              value={this.state.timeMinutes}
              onChange={this.onTimeMinutesChange}
            />
            <select
              className='selector-drop-down'
              onChange={this.onHandleChange}
            >
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
            <SingleDatePicker
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
            />
          </div>

          <button className='form-submit'>
            {this.props.sms ? 'Update SMS' : 'Create SMS'}
          </button>
        </form>
      </div>
    );
  }
}

export default SMSForm;
