import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './ResponsiveTable.scss';

const ResponsiveTable = ({ data }) => {
  const expire = data.map((el) => el.date_expires);
  const expireDates = [...new Set(expire)];

  return (
    <div className='table-wrapper'>
      <table className='fl-table table-container'>
        <thead>
          <tr className={'table-top-header'}>
            <th className={'blue-bg sticky-th'} colSpan={'4'}>
              Call Options
            </th>
            <th></th>
            <th className={'green-bg sticky-th'} colSpan={'4'}>
              Put Options
            </th>
          </tr>
          <tr>
            <th className={'blue-bg sticky-th small-cell'}>Historic</th>
            <th className={'blue-bg sticky-th'}>OI</th>
            <th className={'blue-bg sticky-th'}>Bid</th>
            <th className={'blue-bg sticky-th'}>Ask</th>
            <th className={'purple-bg sticky-th'}>Strike</th>
            <th className={'green-bg sticky-th'}>Bid</th>
            <th className={'green-bg sticky-th'}>Ask</th>
            <th className={'green-bg sticky-th'}>OI</th>
            <th className={'green-bg sticky-th small-cell'}>Historic</th>
          </tr>
        </thead>
        <tbody>
          {expireDates.map((date) => (
            <>
              <tr className={'title-row'}>
                <th className={'meta-date'} colSpan={'9'}>
                  {moment(date).format('DD-MM-YYYY')}
                </th>
              </tr>
              {data.map((option) => {
                if (option.put && option.date_expires === date) {
                  const {
                    call,
                    put,
                    strike_price,
                    putClass,
                    callClass,
                  } = option;
                  return (
                    <tr
                      key={`${call.id}_${put.id}`}
                      className={`${putClass} ${callClass}`}
                    >
                      <td>
                        {' '}
                        <Link
                          to={{
                            pathname: `/contract/${call.id}`,
                            myCustomProps: call,
                          }}
                        >
                          {' '}
                          A
                        </Link>
                      </td>
                      <td className={'call-option'}>{call.open_interest}</td>
                      <td className={'call-option'}>
                        {(call.bid / 100).toFixed(2)}
                      </td>
                      <td className={'call-option'}>
                        {(call.ask / 100).toFixed(2)}
                      </td>
                      <td className={'meta-bold light-gray-bg'}>
                        {strike_price}
                      </td>
                      <td className={'put-option'}>
                        {(put.bid / 100).toFixed(2)}
                      </td>
                      <td className={'put-option'}>
                        {(put.ask / 100).toFixed(2)}
                      </td>
                      <td className={'put-option'}>{put.open_interest}</td>
                      <Link
                        to={{
                          pathname: `/contract/${put.id}`,
                          myCustomProps: put,
                        }}
                      >
                        {' '}
                        A
                      </Link>
                    </tr>
                    // </Link>
                  );
                }
              })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
