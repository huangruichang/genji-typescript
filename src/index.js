"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genjijs_1 = require("genjijs");
const React = require("react");
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const app_1 = require("./app");
const models_1 = require("./models");
const genji = new genjijs_1.default({
    injectAsyncLoading: true,
    autoUpdateAsyncLoading: true
});
exports.userModelTypes = genji.model(models_1.userModel);
exports.numberModelTypes = genji.model(models_1.numberModel);
genji.start();
const store = genji.getStore();
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(app_1.default, null)), document.getElementById("app"));
