import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Error from '../../src/components/Error';

describe('Error', () => {

  it('should have a div as container', () => {
    let error = TestUtils.renderIntoDocument(<Error msg={"Cannot contact gocd"}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(error, "div");
    expect(box.className).to.equal("error");
  });

  it('should show the error message', () => {
    let error = TestUtils.renderIntoDocument(<Error msg={"Cannot contact gocd"}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(error, "div");
    expect(box.innerHTML).to.equal("Cannot contact gocd");
  });
});