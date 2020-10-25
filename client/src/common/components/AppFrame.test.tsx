import React from "react";
import Enzyme, { shallow } from "enzyme";
// @ts-ignore
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AppFrame } from "./AppFrame";

Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders without exploding", () => {
  const wrapper = shallow(<AppFrame />);
  expect(wrapper).toBeTruthy();
});
