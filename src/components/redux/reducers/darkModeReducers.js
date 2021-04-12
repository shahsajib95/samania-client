import { ACTIVE_DARKMODE, DEACTIVE_DARKMODE } from "../constants/DarkMode"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    nav: {
        color: '#FFFFFF',
        text: '#3D3D3D',
    },
    footer: {
        color: '#FFFFFF',
        text: '#3D3D3D',
    },
    theme: 'white',
    color: '#FFFFFF',
    text: '#3D3D3D',
    loading: true
}

export default (modeData = initialState, action) => {
    switch (action.type) {
        case ACTIVE_DARKMODE:
            return {
                active: action.payload,
                nav: {
                    color: '#424141',
                    text: '#FFFFFF',
                },
                footer: {
                    color: '#424141',
                    text: '#FFFFFF',
                },
                theme: 'dark',
                color: '#3D3D3D',
                text: '#FFFFFF',
                loading: false
            };
        case DEACTIVE_DARKMODE:
            return {
                active: action.payload,
                nav: {
                    color: '#00AEFF',
                    text: '#FFFFFF',
                },
                footer: {
                    color: '#A8E3FF',
                    text: '#FFFFFF',
                },
                theme: 'white',
                color: '#FFFFFF',
                text: '#3D3D3D',
                loading: false
            };
        default: return modeData

    }
}