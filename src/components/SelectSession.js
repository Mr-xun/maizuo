import React,{Component} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import "../style/selectSession.scss";
// import "../js/swiper.min.js"
import Swiper from 'swiper'
import "../css/swiper.min.css"
export default class SelectSession extends Component{
	constructor(props){
		super(props);
		this.state={
			bannerImg:[]
		}
	}
	componentDidMount(){
		var that = this;
		axios.get("/v4/api/cinema/5145/film?__t=1520069232668")
		.then((res)=>{
			console.log(res)
			this.setState({bannerImg:res.data.data.filmList},function(){
				new Swiper(that.refs.swiper, {
				autoplay: true,//可选选项，自动滑动
				freeMode : true,
				freeModeMomentum : true,
				slidesPerView: 'auto',
				oopedSlides: 8,
				})
			})
		})
		
	}
	render(){
		console.log(this.state.bannerImg)
		return(
			<div className="selectSession">
				<div className="banner">
					<div className="swiper-container" ref="swiper">
					  <div className="swiper-wrapper">
					  	{this.state.bannerImg.map(function(item,index){
					  		return(
					  			<div className="swiper-slide">
					  				<div className="imgWrap">
					  					<div className="img">
					  						<img src={item.posterAddress}/>
					  					</div>
					  				</div>
					  				<div className="film_name">{item.filmName}</div>
					  			</div>
					  		)
					  	})}
					  </div>
					</div>
				</div>
				
			</div>
		)
	}
}