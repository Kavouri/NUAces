import Error from '../../../containers/registration/Error';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Error', () => {
  it('matches a snapshot', () => {
    const tree = renderer.create(<Error error="error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
