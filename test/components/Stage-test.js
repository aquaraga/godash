import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Stage from '../../src/components/Stage';

if (!global.document) {
  global.document = require("jsdom-no-contextify").jsdom("<!doctype html><html><body></body></html>");
}

if (!global.window) {
  global.window = global.document.parentWindow;
}

if (!global.navigator) {
  global.navigator = global.window.navigator;
}

describe('Stage', () => {

  it('should have div as a container', () => {
    const data = {
      "name": "Stage-1"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.className).to.contain("stage");
  });

  it('should have the stage name', () => {
    const data = {
      "name": "Stage-1"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.innerHTML).to.equal("Stage-1");
  });

  it('should show a passed stage', () => {
    const data = {
      "name": "Stage-1",
      "status": "Passed"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.className).to.contain("passed");
  });

  it('should show a cancelled stage', () => {
    const data = {
      "name": "Stage-1",
      "status": "Cancelled"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.className).to.contain("cancelled");
  });

  it('should show a failed stage', () => {
    const data = {
      "name": "Stage-1",
      "status": "Failed"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.className).to.contain("failed");
  });

  it('should show an unknown stage', () => {
    const data = {
      "name": "Stage-1",
      "status": "Unknown"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.className).to.contain("unknown");
  });

  it('should show a building stage', () => {
    const data = {
      "name": "Stage-1",
      "status": "Building"
    };
    let stage = TestUtils.renderIntoDocument(<Stage data={data}/>);

    let box = TestUtils.findRenderedDOMComponentWithTag(stage, "div");
    expect(box.className).to.contain("building");
  });
});
