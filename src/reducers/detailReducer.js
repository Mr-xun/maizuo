export default function(state=[],action){
	switch(action.type){
		case "GET_DETAIL_DATA":
			var newState = [];
			newState.push(action.payload);
			return newState;
		default:
			return state;
	}
	return state;
}