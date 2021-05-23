import { combineReducers, ReducersMapObject, AnyAction, Reducer } from "redux";
// import addReducer, { AddState } from "./addReducer";
import EdataReducer, { Edata } from "./edataReducer";
// import LeaveReducer, { leave } from "./leaveReducer";

// 合并reducers，模块化
export interface CombinedState {
  // addReducer: AddState;
  EdataReducer: Edata;
  // LeaveReducer: leave;
}
const reducers: ReducersMapObject<CombinedState, AnyAction> = {
  // addReducer,
  EdataReducer,
  // LeaveReducer,
};
const reducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers);

export default reducer;
