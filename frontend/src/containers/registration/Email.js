import React from 'react';

const Email = (props) => (
<div className="email-container inner-registration">
    <input type="email" size="24" placeholder="Email" name="email" value={props.email} onChange={props.handleChange}/>
</div>
);

export default Email;
