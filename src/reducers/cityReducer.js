export default function(state=[],action){
	switch(action.type){
		case "GET_CITY_DATA":
			return action.payload;
		default:
			return state;
	}
	return state;
}