import React, {Component} from 'react';
import {BrowserRouter as Router,Route,NavLink,Link} from 'react-router-dom';
import axios from 'axios';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import '../style/home.scss';
import {connect} from 'react-redux'
const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>123</div>
);
const mapStateToProps = (state,props) =>{
	return {
		swiperFilms:state.swiperFilms,
		hotFilms:state.hotFilms,
		willFilms:state.willFilms
	}
}
const mapDispatchToProps = (dispatch,props) =>{
	return {
		addSwiper:function(){
			axios.get("/v4/api/billboard/home?__t=1519629717676")
			.then((res)=>{
				dispatch({
					type:"GET_SWIRPER_DATA",
					payload:res.data.data.billboards
				})
			})
		},
		addHot:function(){
			axios.get("/v4/api/film/now-playing?__t=1519629717680&page=1&count=5")
			.then((res)=>{
				console.log(this.props)
				dispatch({
					type:"GET_HOT_DATA",
					payload:res.data.data.films
				})
			})
		},
		addWill:function(){
			axios.get("v4/api/film/coming-soon?__t=1519629717683&page=1&count=3")
			.then((res)=>{
				console.log(this.props)
				dispatch({
					type:"GET_WILL_DATA",
					payload:res.data.data.films
				})
			})
		}
	}
}
class HomeUI extends Component{
	componentDidMount(){
		this.props.addSwiper();
		this.props.addHot();
		this.props.addWill();

	}
	render() {
		return (
			<div id="home">
				<Carousel
 		          autoplay={true}
 		          autoplayInterval={3000}
 		          infinite
 		          selectedIndex={1}
 		        >
 		        {this.props.swiperFilms.map(function(item,index) {
 		        	return (
 		        		<a key={item.id}><img style={{ width: '100%', verticalAlign: 'top' }} src={item.imageUrl}/></a>
 		        	)
 		        })}
 		        </Carousel>
 		        <div className="hot_playing">
 		        	{this.props.hotFilms.map(function(item,index){
		        		return (
		        			<dl key={item.id}>
		        				<dt>
		        					<a><img style={{ width: '100%', verticalAlign: 'top' }} src={item.cover.origin}/></a>
								</dt>
		        				<dd>
			        				<div className="movie_message">
										<p><a >{item.name}</a></p>
										<span><a >{item.cinemaCount}家影院上线 {item.watchCount}人购票</a></span>
									</div>
									<div className="movie_grade">
										<em>{item.grade}</em>
									</div>
		        				</dd>
		        			</dl>
		        		)
		        	})}	
		        	<div className="hot_title">
						<button>更多热映电影</button>
					</div>
		        </div>
		        <div className="will_playing">
 					<div className="line">
 						<span>即将上映</span>
 					</div>
 					{this.props.willFilms.map(function(item,index){
		        		return (
		        			<dl key={item.id}>
		        				<dt>
		        					<a><img style={{ width: '100%', verticalAlign: 'top' }} src={item.cover.origin}/></a>
								</dt>
		        				<dd>
										<p>{item.name}</p>
										<span>2月28日上线</span>
		        				</dd>
		        			</dl>
		        		)
		        	})}	
	        		<div className="comming_title">
						<button>更多即将上映热映电影</button>
					</div>
		        </div>
 		     </div>
		)
	}
}
const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUI);
export default Home;
// export default class Home extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state={
// 			// swiperFilms:[],
// 			hotFilms:[],
// 			willFilms:[]
// 		}
// 	}
// 	componentDidMount() {
// 		console.log(this)
// 		// console.log(this.props)
// 		// axios.get("/v4/api/billboard/home?__t=1519629717676")
// 		// .then((res)=>{
// 		// 	console.log(this.props)
// 			// this.setState({
// 			// 	swiperFilms:res.data.data.billboards
// 			// })
// 			// this.props.store.dispatch({
// 			// 	type:"GET_SWIRPER_DATA",
// 			// 	payload:res.data.data.billboards
// 			// })
// 		// })
// 		axios.get("v4/api/film/now-playing?__t=1519629717680&page=1&count=5")
// 		.then((res)=>{
// 			this.setState({
// 				hotFilms:res.data.data.films
// 			})
// 		})
// 		axios.get("v4/api/film/coming-soon?__t=1519629717683&page=1&count=3")
// 		.then((res)=>{
// 			this.setState({
// 				willFilms:res.data.data.films
// 			})
// 		})
// 	}
// 	render() {
// 		// var swiperFilms = this.props.store.getState().swiperFilms;
// 		return (
// 			<div id="home">
// 			   {/*<Carousel
// 		          autoplay={true}
// 		          autoplayInterval={3000}
// 		          infinite
// 		          selectedIndex={1}
// 		        >
// 		        {swiperFilms.map(function(item,index) {
// 		        	return (
// 		        		<a key={item.id}><img style={{ width: '100%', verticalAlign: 'top' }} src={item.imageUrl}/></a>
// 		        	)
// 		        })}
// 		        </Carousel>*/}
// 		        <div className="hot_playing">
// 		        	{this.state.hotFilms.map(function(item,index){
// 		        		return (
// 		        			<dl key={item.id}>
// 		        				<dt>
// 		        					<a><img style={{ width: '100%', verticalAlign: 'top' }} src={item.cover.origin}/></a>
// 								</dt>
// 		        				<dd>
// 			        				<div className="movie_message">
// 										<p><a >{item.name}</a></p>
// 										<span><a >{item.cinemaCount}家影院上线 {item.watchCount}人购票</a></span>
// 									</div>
// 									<div className="movie_grade">
// 										<em>{item.grade}</em>
// 									</div>
// 		        				</dd>
// 		        			</dl>
// 		        		)
// 		        	})}	
// 		        	<div className="hot_title">
// 						<button>更多热映电影</button>
// 					</div>
// 		        </div>
// 		        <div className="will_playing">
// 					<div className="line">
// 						<span>即将上映</span>
// 					</div>
// 					{this.state.willFilms.map(function(item,index){
// 		        		return (
// 		        			<dl key={item.id}>
// 		        				<dt>
// 		        					<a><img style={{ width: '100%', verticalAlign: 'top' }} src={item.cover.origin}/></a>
// 								</dt>
// 		        				<dd>
// 										<p>{item.name}</p>
// 										<span>2月28日上线</span>
// 		        				</dd>
// 		        			</dl>
// 		        		)
// 		        	})}	
// 	        		<div className="comming_title">
// 						<button>更多即将上映热映电影</button>
// 					</div>
// 		        </div>
// 			</div>
// 		)
// 	}
// }
