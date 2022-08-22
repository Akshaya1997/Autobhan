import React, { useEffect } from "react";
import { mount, shallow } from "enzyme";
import PostList from "./PostList";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducer from "../reducer";
import { render, fireEvent } from "@testing-library/react";

const store = createStore(reducer);

it("renders without crashing", () => {
  shallow(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
});

describe("Parent Component", () => {
  it("renders Child component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PostList />
      </Provider>
    );
    expect(wrapper.containsMatchingElement(<PostList />)).toEqual(true);
  });
});

test("Add Post title in tooltip", async () => {
  const baseDom = render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  fireEvent.mouseMove(await baseDom.findByTestId("addPost")); //To hover element and show tooltip
  expect(baseDom.getByTitle("Add a Post")).toBeInTheDocument();
});


test("renders Edit Icon", async () => {
  const baseDom = render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  
  expect(await baseDom.findAllByTestId("editPost")).toBeTruthy();
});


test("renders Add Icon", async () => {
  const baseDom = render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  
  expect(await baseDom.findAllByTestId("addPost")).toBeTruthy();
});


test("renders Delete Icon", async () => {
  const baseDom = render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  
  expect(await baseDom.findAllByTestId("deletePost")).toBeTruthy();
});

test("renders Table", async () => {
  const baseDom = render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  
  expect(await baseDom.findAllByTestId("table")).toHaveLength(1);
});

test("renders Pagination", async () => {
  const baseDom = render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  
  expect(await baseDom.findAllByTestId("pagination")).toHaveLength(1);
});
