import React, { Component } from 'react'; // 固定写法，引入必要的组件
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom';
import './style/common.scss';
import './iconfont/iconfont.css';
import Home from './components/Home';
import Orders from './components/Orders';
import Detail from './components/Detail';
import Movie from './components/Movie';
import TodoList from './components/TodoList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSide:false
    }
    this.changeSide = this.changeSide.bind(this);
    this.closeSide = this.closeSide.bind(this);
  }
  changeSide () {
    console.log(this.state.showSide)
    this.setState({
      showSide:!this.state.showSide
    })
  }
  closeSide() {
    this.setState({
      showSide:false
    })
  }
  render() {
  var navSide = <aside id="side_bar">
          <div className="side_container">
            <div className="side_nav" onClick={this.closeSide}>
              <ReactCSSTransitionGroup
                transitionName="side_left"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                <div className="side_nav_left">
                  <ul>
                    <li><NavLink to="/"><span>首页</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/movie/now-playing"><span>影片</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/orders"><span>影院</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/orders"><span>商城</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/orders"><span>我的</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/orders"><span>卖座卡</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    
                  </ul>
                </div>
              </ReactCSSTransitionGroup>
              
            </div>
            
          </div>
        </aside>;
    if(!this.state.showSide){
      navSide = null;
    }
    return (
      <Router>
      <div id="index">
        <nav id="nav_bar">
          <h1>
            <a onClick={this.changeSide}>
              <div className="iconLogo">
                <i className="icon iconfont">&#xe62a;</i>
              </div>
              <div className="nav_title">
                卖座电影
              </div>
            </a>
          </h1>
          <div className="nav_right">
            <NavLink className="nav_position" to="/orders">
              <span>北京</span>
              <i className="icon iconfont">&#xe727;</i>
            </NavLink>
            <NavLink className="nav_user" to="/orders"><i className="icon iconfont">&#xe8a0;</i></NavLink>
          </div>
         
        </nav>
        <section>
        <Route exact path="/" component={Home} />
          <Route path="/movie/now-playing" component={Movie} />
          <Route path="/todolist" component={TodoList} />
          <Route path="/detail/:fid" component={Detail} />

        </section>


        <ReactCSSTransitionGroup
          transitionName="side"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {navSide}
        </ReactCSSTransitionGroup>
        
         
      </div>
      </Router>
    )
  }
}

export default App;
