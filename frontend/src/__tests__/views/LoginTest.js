import React from 'react';
import renderer from 'react-test-renderer';
import Login from "../../containers/Login";

describe('Login', () => {
    it('matches a snapshot if no activity has occurred', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('matches a snapshot if an empty form was submitted', () => {
        const tree = renderer.create(<Login error={'Form isn\'t filled in.'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});