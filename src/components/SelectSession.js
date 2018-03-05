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
			schedules:[],
			showTime:[],
			currentData:0
		}
	}
	getTime(id,currentIndex){
		var that = this;
		axios.get(`/v4/api/schedule?__t=1520134799929&film=0&cinema=${id}`)
		.then((res)=>{
			that.setState({schedules:res.data.data.schedules},function(){
				var schedules = that.state.schedules;
				var showTime=[];
				schedules.map(function(item,index){
					if(`${item.film.id}` === currentIndex){
						var now = new Date(item.showAt);
						var month = now.getMonth()+1;
						if(month < 10){
							month = "0" + month
						}
						var data = now.getDate();
						if(data < 10){
							data = "0" + data
						}
						var hh = now.getHours();            //时  
        				var mm = now.getMinutes();
						if(showTime.indexOf(month + "/" + data) === -1 ){
							showTime.push(month + "/" + data)
						}				
					}
				})
				that.setState({showTime:showTime},function(){
					console.log
					var mySwiperTwo = new Swiper(`.timeSwiper`, {
					slidesPerView : 3,
					slideToClickedSlide: true,
					on: {
					    click: function(){
					    	var currentData = $(this.clickedSlide).attr("data-currentdata");
					    	that.setState({currentData:currentData})
					    }
					  }
					})
				})
			})
		})
	}
	componentDidMount(){
		var that = this;
		var  id = this.props.match.params.fid;
		axios.get(`/v4/api/cinema/${id}/film?__t=1520069232668`)
		.then((res)=>{
			this.setState({bannerImg:res.data.data.filmList},function(){
				var currentIndex  = res.data.data.filmList[0].filmID;
				var currentFilmName = res.data.data.filmList[0].filmName;
				that.setState({currentIndex:currentIndex,filmName:currentFilmName})
				that.getTime(id,currentIndex)
				var mySwiperOne = new Swiper(".imgBaner", {
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
		var now = new Date();
		var month = now.getMonth()+1;
		if(month < 10){
			month = "0" + month
		}
		var data = now.getDate();
		if(data < 10){
			data = "0" + data
		}	
    	this.setState({currentData:month + "/" + data})

	}
	render(){
		var currentIndex = this.state.currentIndex;
		var currentData = this.state.currentData;
		var filmName = this.state.filmName;
		return(
			<div className="selectSession">
				<div className="banner">
					<div className="swiper-container imgBaner" ref="swiper">
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
						<div className="swiper-container timeSwiper"  >
						  <div className="swiper-wrapper">
						 	{this.state.showTime.map(function(item,index){
						 		return(
					  				<div className={currentData == item? "swiper-slide timeBanner active_time" : "swiper-slide timeBanner"} data-currentdata={item}  key={item}>
					  					<div className="showTime">{item}</div>
					  				</div>
						 		)
						 	})}
						  </div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}