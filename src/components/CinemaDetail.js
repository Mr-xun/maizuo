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
		this.chooseTakeTicket = this.chooseTakeTicket.bind(this)
		this.choose3D = this.choose3D.bind(this)
		this.choosePark = this.choosePark.bind(this)
		this.chooseDiscounts = this.chooseDiscounts.bind(this)
		this.choosePublic = this.choosePublic.bind(this)
	}
	componentDidMount(){
		var  id = this.props.match.params.fid;
		axios.get(`/v4/api/cinema/${id}?__t=1519956643319`)
		.then((res)=>{
			var cinema = [];
			cinema.push(res.data.data.cinema)
			this.setState({cinemaDetail:cinema})
		})
	}
	chooseTakeTicket(){
		var that = this;
		var introArr = this.state.cinemaDetail[0].services
		introArr.map(function(item,index){
			console.log(item.name,item.description)
			if(item.name === "取票"){
				that.setState({intro:item.description})
			}else{
				that.setState({intro:"暂无信息"})

			}
		})
		this.setState({currentIndex:0})
	}
	choose3D(){
		var that = this;
		console.log(this)
		var introArr = this.state.cinemaDetail[0].services
		introArr.map(function(item,index){
			if(item.name === "3D"){
				that.setState({intro:item.description})
			}else{
				that.setState({intro:"暂无信息"})

			}
		})
		this.setState({currentIndex:0})
	}
	choosePark(){
		var that = this;
		var introArr = this.state.cinemaDetail[0].services
		introArr.map(function(item,index){
			if(item.name === "停车"){
				that.setState({intro:item.description})
			}else{
				that.setState({intro:"暂无信息"})

			}
		})
		this.setState({currentIndex:0})
	}
	chooseDiscounts(){
		var that = this;
		var introArr = this.state.cinemaDetail[0].services
		introArr.map(function(item,index){
			if(item.name === "优惠"){
				that.setState({intro:item.description})
			}else{
				that.setState({intro:"暂无信息"})

			}
		})
		this.setState({currentIndex:0})
	}
	choosePublic(){
		var that = this;
		var introArr = this.state.cinemaDetail[0].services
		introArr.map(function(item,index){
			if(item.name === "公交"){
				that.setState({intro:item.description})
			}else{
				that.setState({intro:"暂无信息"})

			}
		})
		this.setState({currentIndex:0})
	}
	render(){
		var that = this;
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
										<button className="btn_default seat_btn">立即订座</button>
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
									<li className="choose_one " onClick={that.chooseTakeTicket}>
										<div className="li_wrap active_box">
											<div className="li_box">
												<i className="icon iconfont icon_active">&#xe786;</i>
												<span>取票</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.choose3D}>
										<div className="li_wrap">
											<div className="li_box">
												<i className="icon iconfont">&#xe606;</i>
												<span>3D</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.choosePark}>
										<div className="li_wrap">
											<div className="li_box">
												<i className="icon iconfont">&#xe66b;</i>
												<span>停车</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.chooseDiscounts}>
										<div className="li_wrap">
											<div className="li_box">
												<i className="icon iconfont">&#xe624;</i>
												<span>优惠</span>
											</div>
										</div>
									</li>
									<li className="choose_one" onClick={that.choosePublic}>
										<div className="li_wrap">
											<div className="li_box">
												<i className="icon iconfont">&#xe6c6;</i>
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