import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Stage from '../../src/components/Stage';
import sinon from 'sinon';
import Gocd from '../../src/lib/Gocd';

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

  describe('with job status details', () => {
    beforeEach(() => {
      let jobDetails = [{"name": "Job-1", "status": "Passed"}, 
        {"name": "Job-2", "status": "Failed"}];
      sinon.stub(Gocd, "fetchJobs").withArgs("details").returns(jobDetails);
    });


    it('should not show stage status', () => {
      const data = {
        "name": "Stage-1",
        "status": "Failed",
        "details_path": "details"
      };
      let stage = TestUtils.renderIntoDocument(<Stage drillDown={true} data={data}/>);

      let box = TestUtils.findRenderedDOMComponentWithClass(stage, "stage");

      expect(box.className).to.not.contain("failed");
    });


    it('should stack job statuses', () => {
      const data = {
        "name": "Stage-1",
        "status": "Failed",
        "details_path": "details"
      };
      let stage = TestUtils.renderIntoDocument(<Stage drillDown={true} data={data}/>);
      let box = TestUtils.findRenderedDOMComponentWithClass(stage, "stage");

      expect(box.className).to.contain("fill-height-or-more");
      let jobs = TestUtils.scryRenderedDOMComponentsWithClass(stage, "job");
      expect(jobs.length).to.equal(2);
      expect(jobs[0].className).to.contain("passed");
      expect(jobs[1].className).to.contain("failed");
    });

    afterEach(() => {
      Gocd.fetchJobs.restore();
    });

  });
});
