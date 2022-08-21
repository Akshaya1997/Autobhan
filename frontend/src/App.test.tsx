import React from "react";
import { mount,shallow } from "enzyme";
import App from "./App";
import PostList from "./Post/PostList";


it("renders without crashing", () => {
  shallow(<App />);
});

it("renders Post List Dashboard", () => {
  const wrapper = shallow(<App />);
  const dashboard = <PostList/>;
  expect(wrapper.contains(dashboard)).toEqual(true);
});
