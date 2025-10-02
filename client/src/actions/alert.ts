import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./type";
import type { AppDispatch } from "../store";
export interface AlertPayload {
  id: string;
  msg: string;
  alertType: string;
}

export const setAlert = (msg: string, alertType: string) => {
  return (dispatch: AppDispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id } as AlertPayload,
    });
    setTimeout(()=>{
        dispatch({
            type:REMOVE_ALERT,
            payload:id
        })
    },3000)
  };
};
