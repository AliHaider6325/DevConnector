import { SET_ALERT , REMOVE_ALERT } from "../actions/type"
export interface Alert {
  id: string;
  msg: string;
  alertType: string;
}
const initialState : Alert[] =[
    
]

export default function(state : Alert[] = initialState,action:any){
    switch(action.type){
        case SET_ALERT:
            return [...state,action.payload]
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id!==action.payload);
        default:
            return state;
    }
}
