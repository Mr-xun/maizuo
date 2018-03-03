import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import "../style/cinema.scss"
import $ from 'jquery';
var addreeArr = [];
export default class Cinema extends Component{
	constructor(props){
		super(props);
		this.state={
			cinemaAll:[],
			addreeArr:[]
		}
	}
	componentDidMount(){
		axios.get("/v4/api/cinema?__t=1519892189161")
		.then((res)=>{
			this.setState({cinemaAll:res.data.data.cinemas},function(){
				this.state.cinemaAll.map(function(item,index){
					var addreename =  item.district.name;
					if(addreeArr.indexOf(addreename) ===-1){
						addreeArr.push(addreename)
					}
				})
				this.setState({addreeArr:addreeArr})
			})
		})
		setTimeout(function(){
			var $title = $(".district")
			$title.eq(0).children(".content").addClass("active")
			$title.click(function(){
				if($(this).children(".content").hasClass("active")){
					$(this).children(".content").removeClass("active");
				}else{
					$(this).children(".content").addClass("active");
				}
			})
		},1000)
	}	
	render(){
		var that = this;	
		return(
			<div className="cinema" >
				{addreeArr.map(function(item,index){
					var name  =item;
					// console.log(classname)
					return(
						<div key={index} className="district" >
							<div className="title">
								<span>{item}</span>
							</div>
							{that.state.cinemaAll.map(function(item,index){
								var ciname_name  = item.district.name
								if (ciname_name === name ) {
									var lable = <div className="cinema_lable"><span>可乐爆米花</span></div>
									if(item.labels.length === 0){
										lable = null
									}
									return (
										<div key={item.id} className="content">
											<NavLink to={"/cinema/detail/"+item.id}>
												<div className="cinema_wrap">
													<dl>
														<dt>
															<div className="cinema_name"><p>{item.name}</p><i className="icon iconfont">&#xe624;</i><i className="icon iconfont">&#xe6c6;</i></div>
															{lable}
															<div className="cinema_adress"><span>{item.address}</span></div>
															<div className="cinema_loaction"><span>距离未知</span></div>
														</dt>	
														<dd>
															<i className="icon iconfont">&#xe623;</i>
														</dd>
													</dl>
												</div>
											</NavLink>
										</div>
									)
								}
							})

							}
						</div>
					)
				})}
			</div>
		)
	}
}