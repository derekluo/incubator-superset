import React from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import QuerySearch from '../../../src/SqlLab/components/QuerySearch';

describe('QuerySearch', () => {
  const search = sinon.spy(QuerySearch.prototype, 'refreshQueries');
  const mockedProps = {
    actions: {},
    height: 0,
  };
  it('is valid', () => {
    expect(
      React.isValidElement(<QuerySearch {...mockedProps} />),
    ).to.equal(true);
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<QuerySearch {...mockedProps} />);
  });

  it('should have three Select', () => {
    expect(wrapper.find(Select)).to.have.length(3);
  });

  it('updates fromTime on user selects from time', () => {
    wrapper.find('[name="select-from"]')
      .simulate('change', { value: 0 });
    expect(wrapper.state().from).to.equal(0);
  });

  it('updates toTime on user selects to time', () => {
    wrapper.find('[name="select-to"]')
      .simulate('change', { value: 0 });
    expect(wrapper.state().to).to.equal(0);
  });

  it('updates status on user selects status', () => {
    wrapper.find('[name="select-status"]')
      .simulate('change', { value: 'success' });
    expect(wrapper.state().status).to.equal('success');
  });

  it('should have one input for searchText', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('updates search text on user inputs search text', () => {
    wrapper.find('input').simulate('change', { target: { value: 'text' } });
    expect(wrapper.state().searchText).to.equal('text');
  });

  it('refreshes queries when enter (only) is pressed on the input', () => {
    const callCount = search.callCount;
    wrapper.find('input').simulate('keyDown', { keyCode: 'a'.charCodeAt(0) });
    expect(search.callCount).to.equal(callCount);
    wrapper.find('input').simulate('keyDown', { keyCode: '\r'.charCodeAt(0) });
    expect(search.callCount).to.equal(callCount + 1);
  });

  it('should have one Button', () => {
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('refreshes queries when clicked', () => {
    const callCount = search.callCount;
    wrapper.find(Button).simulate('click');
    expect(search.callCount).to.equal(callCount + 1);
  });
});
