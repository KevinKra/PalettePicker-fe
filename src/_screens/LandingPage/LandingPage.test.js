import React from "react";
import LandingPage from "./LandingPage";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

describe("LandingPage", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(<LandingPage />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
