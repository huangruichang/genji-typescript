import Genji from "genjijs";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import { userModel, numberModel } from "./models";

const genji = new Genji({
  injectAsyncLoading: true,
  autoUpdateAsyncLoading: true
});
export const userModelTypes = genji.model<typeof userModel.actionCreators>(userModel);
export const numberModelTypes = genji.model<typeof numberModel.actionCreators>(numberModel);

genji.start();

const store = genji.getStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
