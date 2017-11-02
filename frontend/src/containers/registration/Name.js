import React from 'react';

const Name = (props) => (
<div className="name-container inner-registration">
    <input placeholder="First" size="18" name="firstName" value={props.firstName} onChange={props.handleChange}/>
    <input placeholder="Last" size="18" name="lastName" value={props.lastName} onChange={props.handleChange}/>
</div>
);

export default Name;
