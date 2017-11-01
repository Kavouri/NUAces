import React from 'react';

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
  
const Birthday = (props) => (
<div class="birthday-container inner-registration">
    <select name="month" value={props.month} onChange={props.handleChange}>
        {Object.keys(MONTHS).map(function(key, index) {
            return <option select={key}>{key}</option>})}
    </select>
    <input placeholder="Day" name="day" size="8" value={props.day} onChange={props.handleChange}/>
    <input placeholder="Year" name="year" size="16" value={props.year} onChange={props.handleChange}/>
</div>
);

export {Birthday, MONTHS};
