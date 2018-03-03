import React,{Component} from 'react';
// import {NavLink} from 'react-router-dom';
import '../style/login.scss';
// import $ from 'jquery';
export default class Login extends Component {
	// constructor(props) {
	// 	super(props);
	// }
	// component(){
		
	// }
	render() {
		return(
				<div id="login" >
					<form>
						<div className="phone">
							<input type="text" className="form-control" placeholder="输入手机号/邮箱"/>
							<span className="phone_code">
								<i></i><em>发送验证码</em>
							</span>
							<div className="login_line"></div>
						</div>
						<div className="pass">
							<input type="password" className="form-control" placeholder="输入密码/验证码"/>
							<div className="login_line"></div>
						</div>
						<div className="img_code">
							<input type="password" className="form-control imgcode" placeholder="图形验证码"/>
							<span>1212</span>
							<div className="login_line"></div>
						</div>
						<button>登录</button>
					</form>
				</div>

		)
	}
}