export default function(state=[],action){
	switch(action.type){
		case "GET_HOT_DATA":
		var newState = [...state];
		newState = newState.concat(action.payload);
		return newState;
		default:
			return state;
	}
	// return state;
}