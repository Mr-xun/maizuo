import React,{Component} from 'react';
import {BrowserRouter as Router , Route ,NavLink} from 'react-router-dom';
import Now from './Now';
import '../style/movie.scss';
export default class Movie extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Router>
				<div id="movie">
					<div className="movie_nav">
						<div className="movie_nav_now">
							<NavLink  to="/movie/now-playing">正在热映</NavLink>
						</div>
						<div className="movie_nav_comming">
							<NavLink to="/movie/comming-playing">即将上映</NavLink>
						</div>
					</div>
					<Route path="/movie/now-playing" component={Now} />
				</div>
				
		          
			</Router>
		)
	}
}