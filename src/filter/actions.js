import {SET_FILTER} from './actionTypes.js';

export const setFilter = filterType => {
	console.log("dddd",filterType);
	return{
		type: SET_FILTER,
		filter: filterType
	}
};
