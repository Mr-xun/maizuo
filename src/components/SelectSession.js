import React,{Component} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import "../style/selectSession.scss";
import $ from 'jquery';
import Swiper from 'swiper'
import "../css/swiper.min.css"
export default class SelectSession extends Component{
	constructor(props){
		super(props);
		this.state={
			bannerImg:[],
			currentIndex:0,
			filmName:"",
			schedules:[]
		}
	}
	getTime(id,currentIndex){
		var that = this;
		axios.get(`/v4/api/schedule?__t=1520134799929&film=0&cinema=${id}`)
		.then((res)=>{
			this.setState({schedules:res.data.data.schedules},function(){
				var schedules = that.state.schedules;
				schedules.map(function(item,index){
					if(`${item.film.id}` === currentIndex){
						console.log(item)
					}
				})
			})
		})
	}
	componentDidMount(){
		var that = this;
		var  id = this.props.match.params.fid;
		console.log(id)
		axios.get(`/v4/api/cinema/${id}/film?__t=1520069232668`)
		.then((res)=>{
			this.setState({bannerImg:res.data.data.filmList},function(){
				var currentIndex  = res.data.data.filmList[0].filmID;
				var currentFilmName = res.data.data.filmList[0].filmName;
				that.setState({currentIndex:currentIndex,filmName:currentFilmName})
				that.getTime(id,currentIndex)
				var mySwiper = new Swiper(that.refs.swiper, {
				slidesPerView : 4,
				centeredSlides : true,
				slideToClickedSlide: true,
				on: {
				    slideChangeTransitionEnd: function(){
				    	currentIndex = $('.swiper-slide-active').attr("data-index");
				    	currentFilmName = $('.swiper-slide-active').attr("data-name")
				    	that.setState({currentIndex:currentIndex,filmName:currentFilmName},function(){
							that.getTime(id,currentIndex)
				    	})
				    }
				  }
				})
			})
		})
		
	}
	render(){
		console.log(this.state)
		var currentIndex = this.state.currentIndex;
		var filmName = this.state.filmName;
		return(
			<div className="selectSession">
				<div className="banner">
					<div className="swiper-container" ref="swiper">
					  <div className="swiper-wrapper">
					  	{this.state.bannerImg.map(function(item,index){
					  		return(
					  			<div className="swiper-slide" data-index={item.filmID} data-name={item.filmName} key={item.filmID}>
					  				<div className={currentIndex == item.filmID? "imgWrap active_img" : "imgWrap"}>
					  					<div className="img">
					  						<img  src={item.posterAddress}/>
					  					</div>
					  				</div>
					  				<div className={currentIndex == item.filmID? "film_name active_name" : "film_name"}>{filmName}</div>
					  			</div>
					  		)
					  	})}
					  </div>
					</div>
				</div>
				<div className="chooseTime">
					<div className="chooseTime_title">
						
					</div>
				</div>
			</div>
		)
	}
}