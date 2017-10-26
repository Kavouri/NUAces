import { mapStateToProps } from '../../containers/HomePage';

describe('Homepage', () => {
  it('maps redux state to partner prop', () => {
    const state = { partners: { partnerList: ['partner1, partner2'] } };
    expect(mapStateToProps(state)).toEqual({ partners: ['partner1, partner2'] });
  });
});
