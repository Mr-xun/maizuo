import React,{Component} from 'react';
import {BrowserRouter as Router , Route ,NavLink} from 'react-router-dom';
import axios from 'axios';
import '../style/will.scss';
import {connect} from 'react-redux';
const mapStateToProps = (state,props) =>{
	return {
		CommingPlayFilms:state.willFilms
	}
}
const mapDispatchToProps = (dispatch,props) =>{
	return {
		addWIllPlay:function(){
			axios.get("/v4/api/film/coming-soon?__t=1519629717683&page=1&count=7")
			.then((res)=>{
				dispatch({
					type:"GET_WILL_DATA",
					payload:res.data.data.films
				})
			})
		}
	}
}
class WillPlayUI extends Component {
	componentWillMount(){
		this.props.addWIllPlay()
	}
	toDate(premiereAt){
		var now = new Date(premiereAt);
		var month = now.getMonth()+1;
		var data = now.getDate();
		return month + "月" + data + "日"
	}
	toDay(premiereAt){
		var now = new Date(premiereAt);
		var month = now.getMonth()+1;
		var data = now.getDate();
		var day = now.getDay();
		switch (day) {
		  case 0:day="天";break
		  case 1:day="一";break
		  case 2:day="二";break
		  case 3:day="三";break
		  case 4:day="四";break
		  case 5:day="五";break
		  case 6:day="六";break
		 }
		return "星期" + day;
	}
	render() {
		var that = this;
		return (
				<div className="willPlay">
				{
					this.props.CommingPlayFilms.map(function(item,index){
						return(
							<dl key={item.id}>
								<NavLink to={"/detail/"+item.id}>
									<dt>
										<img src={item.poster.thumbnail}/>
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
const WillPlay = connect(mapStateToProps,mapDispatchToProps)(WillPlayUI);
export default WillPlay