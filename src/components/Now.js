import React,{Component} from "react";
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import axios from 'axios';
import '../style/now.scss';
import {connect} from 'react-redux';
const mapStateToProps = (state,props) => {
	return {
		NowPlayFilms:state.hotFilms
	}
}
const mapDispatchToProps = (dispatch,props)=>{
	return {
		addNowPlay:function(){
			axios.get("/v4/api/film/now-playing?__t=1519629717680&page=1&count=7")
			.then((res)=>{
				dispatch({
					type:"GET_HOT_DATA",
					payload:res.data.data.films
				})
			})
		}
	}
}
class NowPlayUI extends Component{

	componentWillMount(){

		this.props.addNowPlay()
	}
	render() {
		return (
				<div className="nowPlay">
				{
					this.props.NowPlayFilms.map(function(item,index){
						return(
							<dl key={item.id}>
								<NavLink to={"/detail/"+item.id}>
									<dt>
										<img src={item.poster.thumbnail}/>
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
											<p><b>{item.cinemaCount}</b>家影院上映</p>
											<span><b>{item.watchCount}</b>人购票</span>
										</div>

									</dd>
								</NavLink>
							</dl>
						)
					})
				}
				</div>

		)
	}
}
const NowPlay = connect(mapStateToProps,mapDispatchToProps)(NowPlayUI)
export default NowPlay
// export default class NowPlay extends Component{
// 	constructor(props) {
// 		super(props);
// 		this.state={
// 			NowPlayFilms:[]
// 		}
// 	}
// 	componentDidMount() {
// 		axios.get("/v4/api/film/now-playing?page=1&count=7")
// 		.then((res)=>{
// 			console.log(res);
// 			this.setState({
// 				NowPlayFilms:res.data.data.films
// 			})
// 		})
// 	}
// 	render() {
// 		return(
// 			<Router>
// 				<div className="nowPlay">
// 				{
// 					this.state.NowPlayFilms.map(function(item,index){
// 						return(
// 							<dl key={item.id}>
// 								<NavLink to="/">
// 									<dt>
// 										<img src={item.cover.origin}/>
// 									</dt>
// 									<dd>
// 										<div className="movieName">
// 											<h5>{item.name}</h5>
// 											<p><span>{item.grade}</span><i className="icon iconfont">&#xe623;</i></p>
											
// 										</div>
// 										<div className="movieIntroduce">
// 											{item.intro}
// 										</div>
// 										<div className="movieShow">
// 											<p>{item.cinemaCount}家影院上映</p>
// 											<span>{item.watchCount}人购票</span>
// 										</div>

// 									</dd>
// 								</NavLink>
// 							</dl>
// 						)
// 					})

// 				}
// 				</div>
// 			</Router>

// 		)
// 	}
// } 