import React from 'react';

const ConfirmPassword = props => (
  <div className="confirm-pw-container inner-registration">
    <input size="24" placeholder="Confirm Password" name="passwordConfirm" type="password" value={props.passwordConfirm} onChange={props.handleChange}/>
  </div>
);

export default ConfirmPassword;
