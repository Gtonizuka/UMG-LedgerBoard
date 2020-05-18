import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Import component to be tested
import ResponsiveTable from '../components/ResponsiveTable';

const expireDates = [
  '2021-06-25 20:00:00+0000',
  '2021-06-10 20:00:00+0000',
  '2020-06-25 20:00:00+0000',
];
const data = [
  {
    call: {
      id: '1111',
      ask: 100,
      bid: 50,
    },
    put: {
      id: '222',
      ask: 50,
      bid: 10000,
    },
    strike_price: 500000,
    date_expires: '2021-06-25 20:00:00+0000',
  },
  {
    call: {
      id: '333',
      ask: 200,
      bid: 100000,
    },
    put: {
      id: '555',
      ask: 240,
      bid: 222,
    },
    strike_price: 1000000,
    date_expires: '2021-06-10 20:00:00+0000',
  },
];

configure({ adapter: new Adapter() });

describe('Responsive table component tests', () => {
  const wrapper = shallow(
    <ResponsiveTable expireDates={expireDates} data={data} />
  );

  it('should render responsive table component', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a header', () => {
    const element = wrapper.find('tr th');
    expect(element.length).toBe(15);
  });

  it('should have a element that contains the header text', () => {
    const element = wrapper.find('tr th.call-header');
    expect(element.length).toBe(1);

    const result = element.text();
    expect(result).toBe('Call Options');
  });

  it('should have the exact number of date rows', () => {
    const element = wrapper.find('tr.title-row');
    expect(element.length).toBe(expireDates.length);

    const secondRow = element.at(1).text();
    expect(secondRow).toBe('06-10-2021');

    const thirdRow = element.at(2).text();
    expect(thirdRow).toBe('06-25-2020');
  });

  it('should have the exact number of rows for contracts', () => {
    const element = wrapper.find('.data-row');
    expect(element.length).toBe(data.length);
  });

  it('should correctly format strike price', () => {
    const element = wrapper.find('.data-strike');
    const strikePriceEl = element.at(1).text();
    expect(strikePriceEl).toBe('10,000');
  });
});
