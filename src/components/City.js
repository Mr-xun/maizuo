import React,{Component} from "react";
import {BrowserRouter as Router,Route,NavLink} from "react-router-dom";
import axios from 'axios';
import "../style/city.scss"
import $ from 'jquery';
import {connect} from 'react-redux';
var BMap = window.BMap
const mapStateToProps = (state,props) =>{
	return {
		citys:state.citys
	}
}
const mapDispatchToProps = (dispatch,props) =>{
	return {
		loadCity:function(){
			axios.get("/v4/api/city?__t=1519869832183")
			.then((res)=>{
				dispatch({
					type:"GET_CITY_DATA",
					payload:res.data.data.cities
				})
			})
		}
		
	}
}
class CityUI extends Component{
	constructor(props){
		super(props)
		this.state={
			currentCity:[]
		}
	}
	componentDidMount(){
		this.props.loadCity()
		var geolocation = new BMap.Geolocation();
		var that = this;
		geolocation.getCurrentPosition(function(r){
			var geoc = new BMap.Geocoder();  
			let city = ""
			geoc.getLocation(r.point, function(rs){
				var addComp = rs.addressComponents;
				// alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
				city = addComp.city
				that.setState({currentCity:city})
			});      
		},{enableHighAccuracy: true})
		var $gotoTile = $(".gotoTile")
		$gotoTile.click(function(){
			var $city = $(this).html();
			var $target = $(`.city_${$city}`)
			var height = $target.offset().top - 90;
			$("html,body").animate({"scrollTop":height},1000);
		})
	}
	render(){
		return(
			<div className="city">
				<div className="self_city">
					<div className="title"><span>GPS定位你所在城市</span></div>
					<div className="city_view">
						<ul>
							<li className="city_name active_city"><span>{this.state.currentCity}</span></li>
						</ul>
					</div>
				</div>
				<div className="hot_city">
				<div className="title"><span>热门城市</span></div>
					<div className="city_view">
						<ul>
							<li className="city_name">北京</li>
							<li className="city_name">上海</li>
							<li className="city_name">广州</li>
							<li className="city_name">深圳</li>
						</ul>
					</div>
				</div>
				<div className="sort_city">
					<div className="title"><span>按字母排序</span></div>
					<div className="leter_sort city_view">
						<ul>
							<li className="city_name gotoTile">A</li>
							<li className="city_name gotoTile">B</li>
							<li className="city_name gotoTile">C</li>
							<li className="city_name gotoTile">D</li>
							<li className="city_name gotoTile">E</li>
							<li className="city_name gotoTile">F</li>
							<li className="city_name gotoTile">G</li>
							<li className="city_name gotoTile">H</li>
							<li className="city_name gotoTile">I</li>
							<li className="city_name gotoTile">J</li>
							<li className="city_name gotoTile">K</li>
							<li className="city_name gotoTile">L</li>
							<li className="city_name gotoTile">M</li>
							<li className="city_name gotoTile">N</li>
							<li className="city_name gotoTile">O</li>
							<li className="city_name gotoTile">P</li>
							<li className="city_name gotoTile">Q</li>
							<li className="city_name gotoTile">R</li>
							<li className="city_name gotoTile">S</li>
							<li className="city_name gotoTile">T</li>
							<li className="city_name gotoTile">U</li>
							<li className="city_name gotoTile">V</li>
							<li className="city_name gotoTile">W</li>
							<li className="city_name gotoTile">X</li>
							<li className="city_name gotoTile">Y</li>
							<li className="city_name gotoTile">Z</li>
						</ul>
					</div>
					<div className="title "><span>A</span></div>
					<div className="city_A city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "A"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
							
						</ul>
					</div>
					<div className="title "><span>B</span></div>
					<div className="city_B city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "B"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>C</span></div>
					<div className="city_C city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "C"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>D</span></div>
					<div className="city_D city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "D"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>E</span></div>
					<div className="city_E city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "E"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>F</span></div>
					<div className="city_F city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "F"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>G</span></div>
					<div className="city_G city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "G"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>H</span></div>
					<div className="city_H city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "H"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>J</span></div>
					<div className="city_J city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "J"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>L</span></div>
					<div className="city_K city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "K"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>L</span></div>
					<div className="city_L city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "L"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>M</span></div>
					<div className="city_M city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "M"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>N</span></div>
					<div className="city_N city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "N"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>P</span></div>
					<div className="city_P city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "P"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>Q</span></div>
					<div className="city_Q city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "Q"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>R</span></div>
					<div className="city_R city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "R"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>S</span></div>
					<div className="city_S city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "S"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>T</span></div>
					<div className="city_T city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "T"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>W</span></div>
					<div className="city_W city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "W"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>X</span></div>
					<div className="city_X city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "X"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>Y</span></div>
					<div className="city_Y city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "Y"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="title "><span>Z</span></div>
					<div className="city_Z city_view">
						<ul>
							{this.props.citys.map(function(item,index){
								if(item.pinyin.slice(0,1) === "Z"){
									return(
										<li key={item.id} className="city_name">{item.name}</li>
									)
								}
							})}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
const City = connect(mapStateToProps, mapDispatchToProps)(CityUI);
export default City;
