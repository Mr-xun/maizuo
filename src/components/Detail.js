import React, {Component} from 'react';
import {BrowserRouter as Ruter , NavLink,Route} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import '../style/detail.scss';
const mapStateToProps = (state,props)=>{
	return {
		filmDetail:state.details
	}
}
const mapDispatchToProps = (dispatch,props)=>{
	var id = props.match.params.fid
	return {
		
		addDetail:function(){
			axios.get(`/v4/api/film/${id}?__t=1519722037715`)
			.then((res)=>{
				
				dispatch({
					type:"GET_DETAIL_DATA",
					payload:res.data.data.film
				})
			})
		}
	}
}
class DetailUI extends Component{
	componentDidMount(){
		this.props.addDetail();
	}
	toDate(premiereAt){
		var now = new Date(premiereAt);
		var month = now.getMonth()+1;
		var data = now.getDate();
		return month + "月" + data + "日"
	}
	addActors(actors){
		var arr = actors;
		var actor = ''
		
			arr.map(function(item,index){
				actor += item.name + " | "
			})
		return actor
	}
	render(){
		var buy = <div className="buyTicket"><button>立即购票</button></div>;
		var filmDetails =this.props.filmDetail
		var that = this;
		var now = new Date();
		var time = now.getTime();	
		if(filmDetails.length>0){
			if(filmDetails[0].premiereAt > now){
				buy = null;
			}
		}
		return(
			<div className="detail">
				{this.props.filmDetail.map(function(item,index){
					return(
						<div key={item.id}>
							<img src={item.cover.origin} style={{width: '100%', verticalAlign: 'top' }}/>
							<div className="film_intro">
								<div className="film_intro_title">影片简介</div>
								<div className="intro film_intro_directo"><span>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:&nbsp;&nbsp;</span><em>{item.director}</em></div>
								<div className="intro film_intro_actors"><span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:&nbsp;&nbsp;</span><em>{that.addActors(item.actors)}</em></div>
								<div className="intro film_intro_nation"><span>地区语言:&nbsp;&nbsp;</span><em>{item.nation}({item.language})</em></div>
								<div className="intro film_intro_category"><span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:&nbsp;&nbsp;</span><em>{item.category}</em></div>
								<div className="intro film_intro_premiereAt"><span>上映日期:&nbsp;&nbsp;</span><em>{that.toDate(item.premiereAt)}上映</em></div>
								<div className="film_intro_synopsis">{item.synopsis}</div>
							</div>

						</div>
					)
				})}
				{buy}
			</div>
		)
	}
}
const Detail = connect(mapStateToProps,mapDispatchToProps)(DetailUI);
export default Detail;