import {
    SHOW_CITY_LIST,
    HIDE_CITY_LIST
} from 'constants/actions/sidebar';

export const toggleSidebar = () => (dispatch, getState) => {
    const { sidebar } = getState();
    const type = sidebar.isCityListShown ? HIDE_CITY_LIST : SHOW_CITY_LIST;
    
    dispatch({ type });
};