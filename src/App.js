import React, { Component } from 'react'; // 固定写法，引入必要的组件
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import './style/common.scss';
import './iconfont/iconfont.css';
import Home from './components/Home';
import Orders from './components/Orders';
import Detail from './components/Detail';
import Movie from './components/Movie';
import TodoList from './components/TodoList';
import Login from './components/Login';
import City from './components/City';
import Cinema from './components/Cinema';
import CinemaDetail from './components/CinemaDetail';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Drawer} from 'antd-mobile';
import axios from 'axios';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      title:[]
    }
    // this.changeSide = this.changeSide.bind(this);
    // this.closeSide = this.closeSide.bind(this);
  }
  // changeSide () {
  //   console.log(this.state.showSide)
  //   this.setState({
  //     showSide:!this.state.showSide
  //   })
  // }
  // closeSide() {
  //   this.setState({
  //     showSide:false
  //   })
  // }
   onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }
  closeSide = (...args) => {
    this.setState({ open: true });
  }
  changeTitle = (props)=>{
    var id = props.match.params.fid
      axios.get(`/v4/api/film/${id}?__t=1519722037715`)
        .then((res)=>{       
          var data = res.data.data.film.name
           this.setState({title:data})
        })
  }
  render() {
    const Title = () => (
      <span>卖座电影</span>
    )
    const myTitle = () => (
      <span>我的</span>
    )
    const cityTitle = () => (
      <span>选择城市</span>
    )
    const cinemaTitle = () => (
      <span>全部影院</span>
    )
    var detailTitle = (props) => (
       <span>{this.changeTitle(props)}{this.state.title}</span>
    )
    const sidebar = (<aside id="side_bar">
          <div className="side_container">
            <div className="side_nav" onClick={this.onOpenChange}>
                <div className="side_nav_left">
                  <ul>
                    <li><NavLink to="/"><span>首页</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/movie/now-playing"><span>影片</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/cinema"><span>影院</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/orders"><span>商城</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/login"><span>我的</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    <li><NavLink to="/orders"><span>卖座卡</span><i className="icon iconfont">&#xe623;</i></NavLink></li>
                    
                  </ul>
                </div>
            </div>
            
          </div>
        </aside>);
    return (

      <Router>
      <div id="index"  >
        <nav id="nav_bar">
          <h1>
            <a onClick={this.onOpenChange}>
              <div className="iconLogo">
                <i className="icon iconfont">&#xe62a;</i>
              </div>
              <div className="nav_title">
                <Route exact path="/" component={Title} />
                <Route path="/movie" component={Title} />
                <Route path="/detail/:fid" component={detailTitle} />
                <Route path="/login" component={myTitle} />
                <Route path="/city" component={cityTitle} />
                <Route path="/cinema" component={cinemaTitle} />
              </div>
            </a>
          </h1>
          <div className="nav_right" onClick={this.closeSide}>
            <NavLink className="nav_position" to="/city">
              <span>北京</span>
              <i className="icon iconfont">&#xe727;</i>
            </NavLink>
            <NavLink className="nav_user" to="/login"><i className="icon iconfont">&#xe8a0;</i></NavLink>
          </div>
         
        </nav>
        
       <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        sidebar={sidebar}
        transitions
        open={this.state.open}
        onOpenChange={this.onOpenChange}
        ref="moreFilm"

      >
      <section>
        <Route exact path="/" component={Home} />
          <Route path="/movie" component={Movie} />
          <Route path="/todolist" component={TodoList} />
          <Route path="/detail/:fid" component={Detail} />
          <Route path="/login" component={Login} />
          <Route path="/orders" component={Orders} />
          <Route path="/city" component={City} />
          <Route exact path="/cinema" component={Cinema} />
          <Route path="/cinema/detail/:fid" component={CinemaDetail} />
        </section>
      </Drawer>
      </div>

      </Router>
    )
  }
}

export default App;
