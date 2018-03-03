import React,{Component} from 'react';
import {Route ,NavLink} from 'react-router-dom';
import Now from './Now';
import Will from './Will';
import '../style/movie.scss';
export default class Movie extends Component {
	// constructor(props) {
	// 	super(props);
	// }
	render() {
		return(

				<div id="movie" >
					<div className="movie_nav">
						<div className="movie_nav_now">
							<NavLink activeClassName="isChoosed" to="/movie/now-playing">正在热映</NavLink>
						</div>
						<div className="movie_nav_comming">
							<NavLink activeClassName="isChoosed" to="/movie/comming-playing">即将上映</NavLink>
						</div>
					</div>
					<Route path="/movie/now-playing" component={Now} />
					<Route path="/movie/comming-playing" component={Will} />
				</div>

		)
	}
}