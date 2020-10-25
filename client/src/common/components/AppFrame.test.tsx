/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 */

import React from "react";
import Enzyme, { shallow } from "enzyme";
// @ts-ignore
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AppFrame } from "./AppFrame";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("app frame", () => {
  test("renders without exploding", () => {
    const wrapper = shallow(<AppFrame />);
    const appFrame = wrapper.find("[data-test='component-app-frame']");
    expect(appFrame.length).toEqual(1);
  });
});
