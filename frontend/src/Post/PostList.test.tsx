import React, { useEffect } from "react";
import { mount, shallow } from "enzyme";
import PostList from "./PostList";
import IconButton from "@material-ui/core/IconButton";

it("renders without crashing", () => {
  shallow(<PostList />);
});