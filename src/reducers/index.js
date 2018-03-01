import todoReducer from './todoReducer';
import swiperReducer from './swiperReducer';
import hotReducer from './hotReducer';
import willReducer from './willReducer';
import detailReducer from './detailReducer';
import homeHotReducer from './homeHotReducer';
import homeWillReducer from './homeWillReducer';
export default {
	todo_list: todoReducer,
	hotFilms:hotReducer,
	swiperFilms:swiperReducer,
	willFilms:willReducer,
	details:detailReducer,
	homehotFilms:homeHotReducer,
	homewillFilms:homeWillReducer
}