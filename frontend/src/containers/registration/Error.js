import React from 'react';

const Error = (props) => (
    <div class="error-container inner-registration">
        {`ERROR: ${props.error}`}
    </div>
);

export default Error;