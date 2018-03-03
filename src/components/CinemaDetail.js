import React,{Component} from "react";
import "../style/cinemaDetail.scss";
import axios from 'axios';
import bgImg from "../images/cinema.png";
export default class CinemaDetail extends Component{
	constructor(props){
		super(props);
		this.state={
			cinemaDetail:[],
			currentIndex:0,
			intro:""
		}
		this.chooseIntro = this.chooseIntro.bind(this)
		this.goTOSelect = this.goTOSelect.bind(this);
	}
	componentDidMount(){
		var  id = this.props.match.params.fid;
		var that = this;
		axios.get(`/v4/api/cinema/${id}?__t=1519956643319`)
		.then((res)=>{
			var cinema = [];
			cinema.push(res.data.data.cinema)
			this.setState({cinemaDetail:cinema},function(){
				var introArr = this.state.cinemaDetail[0].services
				this.setState({intro:"暂无信息"})
				this.setState({currentIndex:0})
				introArr.map(function(item,index){
					if(item.name === "取票"){
						that.setState({intro:item.description})
					}
				})
			})
		})
	}
	chooseIntro(e){
		var that = this;
		e.stopPropagation();
		var intro = e.currentTarget.getAttribute("data-intro");
		var index = e.currentTarget.getAttribute("data-index");
		console.log(intro)	
		var introArr = this.state.cinemaDetail[0].services
		this.setState({intro:"暂无信息"})
		this.setState({currentIndex:index})
		introArr.map(function(item,index){
			if(item.name === intro){
				that.setState({intro:item.description})
			}
		})
	}
	goTOSelect(id){
		this.props.history.push(`/cinema/detail/${id}/select`);
	}
	render(){
		var that = this;
		var currentIndex = this.state.currentIndex;
		if(this.state.cinemaDetail[0]){
			var id = this.state.cinemaDetail[0].id
		}
		return (
			<div className="cinemaDetail">
				<div className="cinemaDetail_bg">
					<img src={bgImg} alt="加载中" />
				</div>
				{this.state.cinemaDetail.map(function(item,index){
					return(
						<div className="cinemaDetail_content" key={item.id}>
							<div className="cinemaDetail_box">
								<div className="box_wrap">
									<div className="imgIcon"><i className="icon iconfont">&#xe64b;</i></div>
									<div className="box">
										<h3>订座票</h3>
										<span>选好场次及座位，到影院自助机取票</span>
										<button className="btn_default seat_btn" onClick={()=>that.goTOSelect(id)}>立即订座</button>
									</div>
								</div>
							</div>
							<div className="cinemaDetail_box">
								<div className="box_wrap">
									<div className="imgIcon"><i className="icon iconfont icon_ticket">&#xe632;</i></div>
									<div className="box">
										<h3>通兑票</h3>
										<span>有效期内到影院前台兑票</span>
										<button className="btn_default ticket_btn">立即订票</button>
									</div>
								</div>
							</div>
							<div className="cinemaDetail_box">
								<div className="box_wrap">
									<div className="imgIcon"><i className="icon iconfont icon_position">&#xe61f;</i></div>
									<div className="box">
										<h4>{item.address}</h4>
									</div>
								</div>
							</div>
							<div className="cinemaDetail_box">
								<div className="box_wrap">
									<div className="imgIcon"><i className="icon iconfont icon_phone">&#xe610;</i></div>
									<div className="box">
										<h4>{item.telephones[0]}</h4>
									</div>
								</div>
							</div>
							<div className="choose_box">
								<ul>
									<li className="choose_one " onClick={that.chooseIntro} data-intro="取票" data-index="0">
										<div className={currentIndex == 0? "li_wrap active_box" : "li_wrap"}>
											<div className="li_box">
												<i className={currentIndex == 0?"icon iconfont icon_active" :"icon iconfont"}>&#xe786;</i>
												<span>取票</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.chooseIntro} data-intro="3D" data-index="1">
										<div className={currentIndex == 1? "li_wrap active_box" : "li_wrap"}>
											<div className="li_box">
												<i className={currentIndex == 1?"icon iconfont icon_active" :"icon iconfont"}>&#xe606;</i>
												<span>3D</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.chooseIntro} data-intro="停车" data-index="2">
										<div className={currentIndex == 2? "li_wrap active_box" : "li_wrap"}>
											<div className="li_box">
												<i className={currentIndex == 2?"icon iconfont icon_active" :"icon iconfont"}>&#xe66b;</i>
												<span>停车</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.chooseIntro} data-intro="优惠" data-index="3">
										<div className={currentIndex == 3? "li_wrap active_box" : "li_wrap"}>
											<div className="li_box">
												<i className={currentIndex == 3?"icon iconfont icon_active" :"icon iconfont"}>&#xe624;</i>
												<span>优惠</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.chooseIntro} data-intro="交通" data-index="4">
										<div className={currentIndex == 4? "li_wrap active_box" : "li_wrap"}>
											<div className="li_box">
												<i className={currentIndex == 4?"icon iconfont icon_active" :"icon iconfont"}>&#xe6c6;</i>
												<span>交通</span>
											</div>
										</div>
									</li>
								</ul>
								<div className="intro">
									<p>{that.state.intro}</p>
								</div>
							</div>
						</div>
					)
				})}
				
			</div>
		)
	}
}