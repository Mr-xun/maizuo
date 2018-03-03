import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import '../style/now.scss';
// import {connect} from 'react-redux';
// import LazyLoad from 'react-lazyload';
let page = 1;
// const mapStateToProps = (state,props) => {
// 	return {
// 		NowPlayFilms:state.hotFilms
// 	}
// }
// const mapDispatchToProps = (dispatch,props)=>{
// 	return {
// 		addNowPlay:function(page){
// 			axios.get(`/v4/api/film/now-playing?__t=1519629717680&page=${page}&count=7`)
// 			.then((res)=>{
// 				dispatch({
// 					type:"GET_HOT_DATA",
// 					payload:res.data.data.films
// 				})
// 			})
// 		}
// 	}
// }

// class NowPlayUI extends Component{
// 	constructor(props){
// 		super(props);
// 		this.state={
// 			load:false
// 		}
// 		this.moreFilms = this.moreFilms.bind(this);
// 	}
// 	componentWillMount(){
// 		this.props.addNowPlay(page)
// 	}
// 	componentDidMount(){
// 		  window.document.getElementsByClassName("my-drawer")[0].addEventListener('scroll', this.moreFilms);
// 	}


// 	moreFilms(e){
// 	 	var clientHeight = e.target.clientHeight;
// 	 	var scrollTop = e.target.scrollTop;
// 	 	var scrollHeight = e.target.scrollHeight;
	 
// 	    if(scrollTop >= Math.floor(scrollHeight / 3) ){
// 	    	scrollHeight = 100000000000;
// 	    	this.setState({load:true})
// 	    	if(this.state.load){
// 				page ++;
// 				console.log(page)
// 				this.props.addNowPlay(page)
// 			}
// 	    	console.log(this)
    	 	
// 	    }
// 	    	console.log(scrollTop,scrollHeight,Math.floor(scrollHeight / 3))
// 	}
// 	render() {
// 		return (
// 				<div className="nowPlay" >
// 				{
// 					this.props.NowPlayFilms.map(function(item,index){
// 						return(
// 							<dl key={item.id}>
// 								<NavLink to={"/detail/"+item.id}>
// 									<dt>
// 										<img src={item.poster.thumbnail}/>
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
// 											<p><b>{item.cinemaCount}</b>家影院上映</p>
// 											<span><b>{item.watchCount}</b>人购票</span>
// 										</div>

// 									</dd>
// 								</NavLink>
// 							</dl>
// 						)
// 					})
// 				}
// 				</div>

// 		)
// 	}
// }
// const NowPlay = connect(mapStateToProps,mapDispatchToProps)(NowPlayUI)
// export default NowPlay
export default class NowPlay extends Component{
	constructor(props) {
		super(props);
		this.state={
			NowPlayFilms:[]
		}
		this.moreFilms = this.moreFilms.bind(this)
	}
	addNowPlay(page){
		axios.get(`/v4/api/film/now-playing?__t=1519629717680&page=${page}&count=7`)
		.then((res)=>{
			var newData = this.state.NowPlayFilms.concat(res.data.data.films)
			this.setState({NowPlayFilms:newData})
		})
	}
	moreFilms(e){
	 	// var clientHeight = e.target.clientHeight;
	 	var scrollTop = e.target.scrollTop;
	 	var scrollHeight = e.target.scrollHeight;
	 	var that = this;

	 		if(scrollTop >= Math.floor(scrollHeight / 3) ){	  
	    		switch(page){
	    			case 1 : 
	    			page = 2;
	    			that.addNowPlay(page);break;
	    			case 2 : 
	    			page = 3;
	    			that.addNowPlay(page) ;break;
	    			case 3 : 
	    			page = 4;
	    			that.addNowPlay(page) ;break;
	    			case 4 : 
	    			page = 5;
	    			that.addNowPlay(page) ;break;
	    			case 5 : 
	    			page = 6;
	    			that.addNowPlay(page) ;break;
	    			case 6 : 
	    			page = 7;
	    			that.addNowPlay(page) ;break;
	    			case 8 : 
	    			page = 9;
	    			that.addNowPlay(page) ;break;
	    			default:return
	    		}
	    		return 
		    }
		    scrollHeight = 100000000000000; 	    
	    	
	}
	componentDidMount() {
		page = 1;
		this.addNowPlay(page)
		window.document.getElementsByClassName("my-drawer")[0].addEventListener('scroll', this.moreFilms);
	}
	render() {
		return(
				<div className="nowPlay">
				{
					this.state.NowPlayFilms.map(function(item,index){
						return(
							<dl key={item.id}>
								<NavLink to={"/detail/"+item.id}>
									<dt>
										<img alt="加载中" src={item.poster.thumbnail}/>
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
		)
	}
} 