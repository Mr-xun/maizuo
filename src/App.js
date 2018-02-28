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
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
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
  
  componentWillMount(){
    
    var path =  window.location.pathname;
    console.log(path)
    switch(path){
      case "/" : this.setState({title:"卖座电影"});
      case "/movie" :this.setState({title:"卖座电影"});
      case "/detai/4000": 
        axios.get(`/v4/api/film/4000?__t=1519722037715`)
        .then((res)=>{
          console.log(res);
        })
    }
  }
  changeTitle(){
    var id = this
    console.log(id)
      axios.get(`/v4/api/film/4004?__t=1519722037715`)
        .then((res)=>{       
          var data = res.data.data.film.name
           this.setState({title:data})
        })
  }
  render() {
    const Title = () => (
      <span>卖座电影</span>
    )
    var detailTitle = () => (
       <span>{this.changeTitle()}{this.state.title}</span>
      
      
    
    )
    console.log(this)
    const sidebar = (<aside id="side_bar">
          <div className="side_container">
            <div className="side_nav" onClick={this.onOpenChange}>
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
            </div>
            
          </div>
        </aside>);
    return (

      <Router>
      <div id="index">
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
        
       <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        sidebar={sidebar}
        transitions
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
      <section>
        <Route exact path="/" component={Home} />
          <Route path="/movie" component={Movie} />
          <Route path="/todolist" component={TodoList} />
          <Route path="/detail/:fid" component={Detail} />

        </section>
      </Drawer>
      </div>
      </Router>
    )
  }
}

export default App;
