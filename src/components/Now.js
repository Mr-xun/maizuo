import React,{Component} from "react";
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import axios from 'axios';
import '../style/now.scss';
export default class NowPlay extends Component{
	constructor(props) {
		super(props);
		this.state={
			NowPlayFilms:[]
		}
	}
	componentDidMount() {
		axios.get("/v4/api/film/now-playing?page=1&count=7")
		.then((res)=>{
			console.log(res);
			this.setState({
				NowPlayFilms:res.data.data.films
			})
		})
	}
	render() {
		return(
			<Router>
				<div className="nowPlay">
				{
					this.state.NowPlayFilms.map(function(item,index){
						return(
							<dl>
								<NavLink to="/">
									<dt>
										<img src={item.cover.origin}/>
									</dt>
									<dd>
										<div className="movieName">
											<h5>{item.name}</h5>
											<p><span>{item.grade}</span><i className="icon iconfont">&#xe623;</i></p>
											
										</div>
										<div className="movieIntroduce">
											{item.intro}
										</div>
										<div className="movieShow">
											<p>{item.cinemaCount}家影院上映</p>
											<span>{item.watchCount}人购票</span>
										</div>

									</dd>
								</NavLink>
							</dl>
						)
					})

				}
				</div>
			</Router>

		)
	}
} 