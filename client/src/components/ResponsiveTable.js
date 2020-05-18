import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './ResponsiveTable.scss';
import { numberWithCommas } from '../utils/numberWithCommas';

const ResponsiveTable = ({ data, expireDates }) => {
  return (
    <div className='table-wrapper'>
      <table className='fl-table table-container'>
        <thead>
          <tr className={'table-top-header'}>
            <th className={'sticky-th call-header'} colSpan={'4'}>
              Call Options
            </th>
            <th></th>
            <th className={'sticky-th put-header'} colSpan={'4'}>
              Put Options
            </th>
          </tr>
          <tr>
            <th className={'sticky-th small-cell'}>Details</th>
            <th className={'sticky-th'}>OI</th>
            <th className={'sticky-th'}>Bid</th>
            <th className={'sticky-th'}>Ask</th>
            <th className={'purple-bg sticky-th'}>Strike</th>
            <th className={'sticky-th'}>Bid</th>
            <th className={'sticky-th'}>Ask</th>
            <th className={'sticky-th'}>OI</th>
            <th className={'sticky-th small-cell'}>Details</th>
          </tr>
        </thead>
        <tbody>
          {expireDates.map((date) => (
            <>
              <tr className={'title-row'}>
                <th className={'meta-date'} colSpan={'9'}>
                  {moment(date).format('MM-DD-YYYY')}
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
                      className={`data-row ${putClass} ${callClass}`}
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
                          <img src={'/graph_icon.svg'} />
                        </Link>
                      </td>
                      <td className={'call-option'}>{call.open_interest}</td>
                      <td className={'call-option'}>
                        {(call.bid / 100).toFixed(2)}
                      </td>
                      <td className={'call-option'}>
                        {(call.ask / 100).toFixed(2)}
                      </td>
                      <td className={'meta-bold light-gray-bg data-strike'}>
                        {numberWithCommas(strike_price / 100)}
                      </td>
                      <td className={'put-option'}>
                        {(put.bid / 100).toFixed(2)}
                      </td>
                      <td className={'put-option'}>
                        {(put.ask / 100).toFixed(2)}
                      </td>
                      <td className={'put-option'}>{put.open_interest}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/contract/${put.id}`,
                            myCustomProps: put,
                          }}
                        >
                          {' '}
                          <img src={'/graph_icon.svg'} />
                        </Link>
                      </td>
                    </tr>
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
