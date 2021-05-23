import * as types from "../action_types";
import { AnyAction } from "redux";

// 定义参数接口
export interface Edata {
  edata: object;
}

// 初始化state
let initialState: Edata = {
  edata: {},
};

// 返回一个reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: Edata = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.EDATA:
      console.log(action, 88888888);
      // payload为传入的参数
      return { edata: action.state };
    default:
      return state;
  }
};
