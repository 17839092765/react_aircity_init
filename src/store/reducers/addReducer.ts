import * as types from "../action_types";
import { AnyAction } from "redux";

// 定义参数接口
export interface AddState {
  number: number;
}

// 初始化state
let initialState: AddState = {
  number: 1,
};

// 返回一个reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: AddState = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD:
      // payload为传入的参数
      return { number: state.number + action.payload };
    default:
      return state;
  }
};
