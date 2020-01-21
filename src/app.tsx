import * as React from "react";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { userModelTypes, numberModelTypes } from "./index";
import { Dispatch, Action } from "redux";
import { GenjiDispatch, Indexable } from "genjijs";
import { number } from "prop-types";

interface IProps {
  dispatch: GenjiDispatch;
  add: () => void;
  saveAsync: () => void;
  addAsync: () => void;
  number: Indexable<{
    num: number;
  }>;
  saveOther: () => void;
  user: Indexable<{}>;
}

type IPropsPartial = Partial<IProps>;

const mapStateToProps = rootState => {
  return { ...rootState, rootState };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    add: () => {
      dispatch({
        type: numberModelTypes.add,
        payload: 1
      });
    },
    addAsync: () => {
      dispatch({
        type: numberModelTypes.addAsync,
        payload: 10
      });
    },
    saveAsync: () => {
      dispatch({
        type: numberModelTypes.saveAsync
      });
    },
    saveOther: () => {
      dispatch({
        type: userModelTypes.saveOther
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props: IPropsPartial) => {
  useEffect(() => {
    props.saveAsync();
  }, []);

  return (
    <div>
      {props.number.saveAsyncLoading ? (
        <div>Loading...</div>
      ) : (
        <div onClick={props.saveAsync}>init num from mock (click me)</div>
      )}
      <div onClick={props.add}>action test (click me)</div>
      {props.number.addAsyncLoading ? (
        <div>Loading...</div>
      ) : (
        <div onClick={props.addAsync}>effect test (click me)</div>
      )}

      {props.user.saveOtherLoading ? (
        <div>Loading...</div>
      ) : (
        <div onClick={props.saveOther}>
          save num from other model (click me)
        </div>
      )}

      <div>current number is: {props.number.num}</div>
    </div>
  );
});
