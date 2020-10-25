/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-24
 */

import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
// @ts-ignore
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AppFrame } from "./AppFrame";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const findByTestAttr = (wrapper: ShallowWrapper, value: string) =>
  wrapper.find(`[data-test='${value}']`);

describe("rendering of <AppFrame />", () => {
  let wrapper: ShallowWrapper;

  /**
   * Create an <AppFrame> component and return it as shallow wrapper.
   */
  beforeEach(() => {
    wrapper = shallow(<AppFrame />);
  });

  test("renders without exploding", () => {
    const appFrame = findByTestAttr(wrapper, "component-app-frame");
    expect(appFrame).toHaveLength(1);
  });

  test("renders app bar and header", () => {
    const appBar = findByTestAttr(wrapper, "component-app-bar");
    const appHeader = findByTestAttr(wrapper, "component-app-header");
    expect(appBar).toHaveLength(1);
    expect(appHeader).toHaveLength(1);
  });

  test("renders app header 'Let It Fly'", () => {
    const headerText = findByTestAttr(wrapper, "component-app-header").text();
    expect(headerText).toBe("Let It Fly");
  });

  test("renders side menu", () => {
    const sideMenu = findByTestAttr(wrapper, "component-side-menu");
    expect(sideMenu).toHaveLength(1);
  });

  test("renders toggle menu button", () => {
    const button = findByTestAttr(wrapper, "toggle-menu-button");
    expect(button).toHaveLength(1);
  });

  test("renders close menu button", () => {
    const button = findByTestAttr(wrapper, "close-menu-button");
    expect(button).toHaveLength(1);
  });
});

describe("function of <AppFrame />", () => {
  let wrapper: ShallowWrapper;

  /**
   * Create an <AppFrame> component and return it as shallow wrapper.
   */
  beforeEach(() => {
    wrapper = shallow(<AppFrame />);
  });

  test("closes menu when closed button is clicked", () => {});
});
