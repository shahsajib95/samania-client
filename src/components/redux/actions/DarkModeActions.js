import { ACTIVE_DARKMODE, DEACTIVE_DARKMODE } from "../constants/DarkMode"

export const activeDarkmode = (mode) => async (dispatch) =>{
    dispatch({type: ACTIVE_DARKMODE, payload: true})
}
export const deactiveDarkmode = (mode) => async (dispatch) =>{
    dispatch({type: DEACTIVE_DARKMODE, payload: false})
}