import React, { Component } from 'react';
import Routers from '../components/Router';
import '../stylesheet/App.css';
import { pushRotate as Menu } from 'react-burger-menu';
var Router = require('react-router-component');
var Link = Router.Link;


var styles = {
  bmMenuWrap : {
    zIndex: '5'
  },
  bmBurgerButton: {
    position: 'fixed',
    width: '3.6rem',
    height: '3.6rem',
    left: '1.4rem',
    top: '2.4rem',
    zIndex: '11'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '2.4rem',
    width: '2.4rem'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    zIndex: '0',
    overflow: 'hidden',
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideState : false
    }
    this.setState = this.setState.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this)
  }
  toggleSideBar(isOpen = !this.state.slideState){
    this.setState({ slideState: isOpen })
  }
  render () {
    return (
      <div id="outer-container" className="page-container">
        <Menu className={ "my-menu" }  pageWrapId={ "page-wrap" } isOpen={ this.state.slideState } outerContainerId={ "outer-container" } styles={ styles }  width={'60%'} customBurgerIcon={ false } noOverlay>
          <Link id="home" className="menu-item" data-navtype="home" href="/">主页</Link>
          <Link id="lecture" className="menu-item" data-navtype="lecture" href="/lecture">演讲</Link>
          <Link id="lecturers" className="menu-item" data-navtype="lecturers" href="/lecturers">讲者</Link>
          <Link id="record" className="menu-item" data-navtype="record" href="/record">记录</Link>
        </Menu>
        <Routers routerId="page-wrap" routerClass="page-wrapper" routerOnNavigation={() => this.toggleSideBar(false)} routerOnMenuClick={this.toggleSideBar}/>
      </div>
    );
  }
}


export default App;
