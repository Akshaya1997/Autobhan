import React from "react";
import PostList from "./Post/PostList";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <PostList />
    </Provider>
  );
}

export default App;
