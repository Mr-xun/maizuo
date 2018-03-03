export default function(state=[],action){
	switch(action.type){
		case "GET_WILL_DATA":
			var newState = [...state];
			newState = newState.concat(action.payload);
			return newState;
		default:
			return state;
	}
	// return state;
}