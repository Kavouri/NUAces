import React from 'react';
import renderer from 'react-test-renderer';
import HomePageView from '../../views/HomePageView';

describe('HomePageView', () => {
  it('matches a snapshot if partners are not present', () => {
    const tree = renderer.create(<HomePageView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('matches a snapshot if partners are present', () => {
    const tree = renderer.create(<HomePageView partners={[{ name: 'partner1', id: 1 }, { name: 'partner2', id: 2 }]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
