import Register from '../../containers/Register';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Register', () => {
  it('validates that a form is filled in', () => {
    const state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        month: 'January',
        day: '',
        year: '',  
        error: ''
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        r.validateForm();
    }).toEqual(false);
  });

  it('validates that a form is filled in completely', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: '20',
        year: '1943',  
        error: ''
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        r.validateForm();
    }).toEqual(true);
  });

  it('validates that a form is filled in completely(special-case)', () => {
    const state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        month: '',
        day: '',
        year: '',  
        error: 'ERROR!'
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        !r.validateForm() && r.state.error;
    }).toEqual(true);
  });

  it('validates that the password form matches', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'huntertwo',
        month: 'January',
        day: '20',
        year: '1943',  
        error: ''
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        !r.validateForm() && r.state.error === 'Passwords don\'t match';
    }).toEqual(true);
  });

  it('validates that the email form is rational', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.auatbingo.com!!!!BINGO!!!!husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: '20',
        year: '1943',  
        error: ''
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        !r.validateForm() && r.state.error === 'Email is not valid';
    }).toEqual(true);
  });

  it('validates that the date form is stricly numeric', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: 'ha',
        year: 'nineteenfourtythree',  
        error: ''
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        !r.validateForm() && r.state.error === 'DD-YYYY contains alphabetic characters.';
    }).toEqual(true);
  });

  it('validates that the date form has proper character count', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: '20',
        year: '20177',  
        error: ''
    };

    let r = new Register();
    r.state = state;

    expect(() => {
        !r.validateForm() && r.state.error === 'DD-YYYY has an invalid number of characters.';
    }).toEqual(true);
  });

  it('matches a Register snapshot', () => {
    const tree = renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
