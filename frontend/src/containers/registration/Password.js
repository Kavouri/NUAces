import React from 'react';

const Password = (props) => (
<div class="password-container inner-registration">
    <input size="24" placeholder="Password" name="password" type="password" value={props.password} onChange={props.handleChange}/>
</div>
);

export default Password;