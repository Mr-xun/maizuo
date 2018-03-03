import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Carousel} from 'antd-mobile';
import '../style/home.scss';
import {connect} from 'react-redux'
const mapStateToProps = (state,props) =>{
	return {
		swiperFilms:state.swiperFilms,
		hotFilms:state.homehotFilms,
		willFilms:state.homewillFilms
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
				dispatch({
					type:"GET_HOMEHOT_DATA",
					payload:res.data.data.films
				})
			})
		},
		addWill:function(){
			axios.get("v4/api/film/coming-soon?__t=1519629717683&page=1&count=3")
			.then((res)=>{
				dispatch({
					type:"GET_HOMEWILL_DATA",
					payload:res.data.data.films
				})
			})
		}
	}
}
// var path = {
//   pathname:'/orders',
//   state:{name:123},
// }
class HomeUI extends Component{
	componentDidMount(){
		this.props.addSwiper();
		this.props.addHot();
		this.props.addWill();

	}
	toDate(premiereAt){
		var now = new Date(premiereAt);
		var month = now.getMonth()+1;
		var data = now.getDate();
		return month + "月" + data + "日"
	}
	goMoreHot(){
		this.props.history.push("/movie/now-playing");
	}
	goMoreWill(){
		this.props.history.push("/movie/comming-playing");
	}

	render() {
		var that = this;
		return (
			<div id="home">
{/*			<Link to={path}>用户</Link>*/}
				<Carousel
 		          autoplay={true}
 		          autoplayInterval={3000}
 		          infinite
 		          selectedIndex={1}
 		        >
 		        {this.props.swiperFilms.map(function(item,index) {
 		        	return (
 		        		<a key={item.id}><img alt="加载中" style={{ width: '100%', verticalAlign: 'top' }} src={item.imageUrl}/></a>
 		        	)
 		        })}
 		        </Carousel>
 		        <div className="hot_playing">
 		        	{this.props.hotFilms.map(function(item,index){
		        		return (
		        			<Link key={item.id} to={"/detail/"+item.id}>
		        			<dl >
		        				<dt>
		        					<img alt="加载中" style={{ width: '100%', verticalAlign: 'top' }} src={item.cover.origin}/>
								</dt>
		        				<dd>
			        				<div className="movie_message">
										<p>{item.name}</p>
										<span>{item.cinemaCount}家影院上线 {item.watchCount}人购票</span>
									</div>
									<div className="movie_grade">
										<em>{item.grade}</em>
									</div>
		        				</dd>
		        			</dl>
		        			</Link>
		        		)
		        	})}	
		        	<div className="hot_title">
						<button onClick={()=>that.goMoreHot()}>更多热映电影</button>
					</div>
		        </div>
		        <div className="will_playing">
 					<div className="line">
 						<span>即将上映</span>
 					</div>
 					{this.props.willFilms.map(function(item,index){
		        		return (
		        			<Link key={item.id} to={"/detail/"+item.id}>
		        			<dl >
		        				<dt>
		        					<img alt="加载中" style={{ width: '100%', verticalAlign: 'top' }} src={item.cover.origin}/>
								</dt>
		        				<dd>
										<p>{item.name}</p>
										<span>{that.toDate(item.premiereAt)}上线</span>
		        				</dd>
		        			</dl>
		        			</Link>
		        		)
		        	})}	
	        		<div className="comming_title">
						<button onClick={()=>that.goMoreWill()}>更多即将上映热映电影</button>
					</div>
		        </div>
 		     </div>
		)
	}
}
const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUI);
export default Home;
