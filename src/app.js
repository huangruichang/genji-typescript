"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const index_1 = require("./index");
const mapStateToProps = rootState => {
    return Object.assign(Object.assign({}, rootState), { rootState });
};
const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        add: () => {
            dispatch({
                type: index_1.numberModelTypes.add,
                payload: 1
            });
        },
        addAsync: () => {
            dispatch({
                type: index_1.numberModelTypes.addAsync,
                payload: 10
            });
        },
        saveAsync: () => {
            dispatch({
                type: index_1.numberModelTypes.saveAsync
            });
        },
        saveOther: () => {
            dispatch({
                type: index_1.userModelTypes.saveOther
            });
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)((props) => {
    react_1.useEffect(() => {
        props.saveAsync();
    }, []);
    return (React.createElement("div", null,
        props.number.saveAsyncLoading ? (React.createElement("div", null, "Loading...")) : (React.createElement("div", { onClick: props.saveAsync }, "init num from mock (click me)")),
        React.createElement("div", { onClick: props.add }, "action test (click me)"),
        props.number.addAsyncLoading ? (React.createElement("div", null, "Loading...")) : (React.createElement("div", { onClick: props.addAsync }, "effect test (click me)")),
        props.user.saveOtherLoading ? (React.createElement("div", null, "Loading...")) : (React.createElement("div", { onClick: props.saveOther }, "save num from other model (click me)")),
        React.createElement("div", null,
            "current number is: ",
            props.number.num)));
});
