import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Import component to be tested
import PriceContainer from '../components/PriceContainer';

const price = {
  ask: 15100,
  bid: 14000,
};

configure({ adapter: new Adapter() });

describe('Price container component tests', () => {
  const wrapper = shallow(<PriceContainer price={price} />);

  it('should render responsive table component', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have one item for ask and one item for bid', () => {
    const element = wrapper.find('h2');
    expect(element.length).toBe(2);
  });

  it('should render the correct text', () => {
    const element = wrapper.find('h2');
    const firstItemText = element.at(0).text();
    expect(firstItemText).toBe('BTC ask price: $15100');

    const secondItemText = element.at(1).text();
    expect(secondItemText).toBe('BTC bid price: $14000');
  });

  it('should reflect changes in BTC price', () => {
    const new_price = {
      ask: 16400,
      bid: 15800,
    };

    const newWrapper = shallow(<PriceContainer price={new_price} />);
    const element = newWrapper.find('h2');
    expect(element.length).toBe(2);
    const firstItemText = element.at(0).text();
    expect(firstItemText).toBe('BTC ask price: $16400');

    const secondItemText = element.at(1).text();
    expect(secondItemText).toBe('BTC bid price: $15800');
  });
});
