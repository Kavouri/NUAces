import React from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

const MONTHS = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12"
};
const Birthday = props => (
  <div className="birthday-container inner-registration">
    <select name="month" value={props.month} onChange={props.handleChange}>
      {_.map(MONTHS, (value, key) =>
        <option key={key} select={key}>{key}</option>)}
    </select>
    <input placeholder="Day" name="day" size="8" value={props.day} onChange={props.handleChange} />
    <input placeholder="Year" name="year" size="16" value={props.year} onChange={props.handleChange} />
  </div>
);

Birthday.propTypes = {
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export {Birthday, MONTHS};
