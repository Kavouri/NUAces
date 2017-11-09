import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { UnwrappedLogin } from '../../containers/Login';


describe('Login', () => {
    it('matches a snapshot if no activity has occurred', () => {
        const tree = renderer.create(<MemoryRouter><UnwrappedLogin /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('matches a snapshot if an empty form was submitted', () => {
        const tree = renderer.create(<MemoryRouter><UnwrappedLogin /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
