import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import '../style/will.scss';
// import {connect} from 'react-redux';
var page = 1;
// const mapStateToProps = (state,props) =>{
// 	return {
// 		CommingPlayFilms:state.willFilms
// 	}
// }
// const mapDispatchToProps = (dispatch,props) =>{
// 	return {
// 		addWIllPlay:function(page){
// 			axios.get(`/v4/api/film/coming-soon?__t=1519629717683&page=${page}&count=7`)
// 			.then((res)=>{
// 				dispatch({
// 					type:"GET_WILL_DATA",
// 					payload:res.data.data.films
// 				})
// 			})
// 		}
// 	}
// }
// var page = 1;
// class WillPlayUI extends Component {
// 	constructor(props){
// 		super(props);
// 		this.moreFilms = this.moreFilms.bind(this);
// 	}
// 	componentWillMount(){
// 		this.props.addWIllPlay(page)
// 	}
// 	componentDidMount(){
// 		  window.document.getElementsByClassName("my-drawer")[0].addEventListener('scroll', this.moreFilms);
// 	}
// 	moreFilms(e){
// 	 	var clientHeight = e.target.clientHeight;
// 	 	var scrollTop = e.target.scrollTop;
// 	 	var scrollHeight = e.target.scrollHeight;
// 	    if(scrollTop > clientHeight / 2 ){
// 	    	page ++;
//     	 	this.props.addWIllPlay(page)
// 	    }
// 	}
// 	toDate(premiereAt){
// 		var now = new Date(premiereAt);
// 		var month = now.getMonth()+1;
// 		var data = now.getDate();
// 		return month + "月" + data + "日"
// 	}
// 	toDay(premiereAt){
// 		var now = new Date(premiereAt);
// 		var month = now.getMonth()+1;
// 		var data = now.getDate();
// 		var day = now.getDay();
// 		switch (day) {
// 		  case 0:day="天";break
// 		  case 1:day="一";break
// 		  case 2:day="二";break
// 		  case 3:day="三";break
// 		  case 4:day="四";break
// 		  case 5:day="五";break
// 		  case 6:day="六";break
// 		 }
// 		return "星期" + day;
// 	}

// 	render() {
// 		var that = this;
// 		return (
// 				<div className="willPlay">
// 				{
// 					this.props.CommingPlayFilms.map(function(item,index){
// 						return(
// 							<dl key={item.id}>
// 								<NavLink to={"/detail/"+item.id}>
// 									<dt>
// 										<img src={item.poster.thumbnail}/>
// 									</dt>
// 									<dd>
// 										<div className="movieName">
// 											<h5>{item.name}</h5>
											
											
// 										</div>
// 										<div className="movieIntroduce">
// 											{item.intro}
// 										</div>
// 										<div className="movieShow">
// 											<p><b>{that.toDate(item.premiereAt)}上映</b>&nbsp;&nbsp;&nbsp;&nbsp;<span>{that.toDay(item.premiereAt)}</span></p>

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
// const WillPlay = connect(mapStateToProps,mapDispatchToProps)(WillPlayUI);
// export default WillPlay
export default class WillPlay extends Component{
	constructor(props) {
		super(props);
		this.state={
			WillPlayFilms:[]
		}
		this.moreFilms = this.moreFilms.bind(this)
	}
	addNowPlay(page){
		axios.get(`/v4/api/film/coming-soon?__t=1519629717683&page=${page}&count=7`)
		.then((res)=>{
			var newData = this.state.WillPlayFilms.concat(res.data.data.films)
			this.setState({WillPlayFilms:newData})
		})
	}
	moreFilms(e){
	 	// var clientHeight = e.target.clientHeight;
	 	var scrollTop = e.target.scrollTop;
	 	var scrollHeight = e.target.scrollHeight;
	    if(scrollTop >= Math.floor(scrollHeight / 3) ){	    	
			switch(page){
	    			case 1 : 
	    			page = 2;
	    			this.addNowPlay(page);break;
	    			case 2 : 
	    			page = 3;
	    			this.addNowPlay(page) ;break;
	    			case 3 : 
	    			page = 4;
	    			this.addNowPlay(page) ;break;
	    			case 4 : 
	    			page = 5;
	    			this.addNowPlay(page) ;break;
	    			case 5 : 
	    			page = 6;
	    			this.addNowPlay(page) ;break;
	    			case 6 : 
	    			page = 7;
	    			this.addNowPlay(page) ;break;
	    			case 8 : 
	    			page = 9;
	    			this.addNowPlay(page) ;break;
		  			default:return

	    		}
	    }
	}
	componentDidMount() {
		page = 1;
		this.addNowPlay(page)
		window.document.getElementsByClassName("my-drawer")[0].addEventListener('scroll', this.moreFilms);
	}
	toDate(premiereAt){
		var now = new Date(premiereAt);
		var month = now.getMonth()+1;
		var data = now.getDate();
		return month + "月" + data + "日"
	}
	toDay(premiereAt){
		var now = new Date(premiereAt);
		var day = now.getDay();
		switch (day) {
		  case 0:day="天";break
		  case 1:day="一";break
		  case 2:day="二";break
		  case 3:day="三";break
		  case 4:day="四";break
		  case 5:day="五";break
		  case 6:day="六";break
		  default:return
		 }
		return "星期" + day;
	}

	render() {
		var that = this;
		return(
			<div className="willPlay">
 				{
					this.state.WillPlayFilms.map(function(item,index){
						return(
							<dl key={item.id}>
								<NavLink to={"/detail/"+item.id}>
									<dt>
										<img alt="加载中" src={item.poster.thumbnail}/>
									</dt>
									<dd>
										<div className="movieName">
											<h5>{item.name}</h5>
											
											
										</div>
										<div className="movieIntroduce">
											{item.intro}
										</div>
										<div className="movieShow">
											<p><b>{that.toDate(item.premiereAt)}上映</b>&nbsp;&nbsp;&nbsp;&nbsp;<span>{that.toDay(item.premiereAt)}</span></p>

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