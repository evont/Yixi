import React, { Component } from 'react';
import './App.css';
import HomePage from './HomePage.js';
import LecturePage from './LecturePage.js';
import LecturersPage from './LecturersPage.js';
import RecordPage from './RecordPage.js';
import NotFoundPage from './NotFoundPage.js';
import { scaleRotate as Menu } from 'react-burger-menu';
var Router = require('react-router-component');
var Locations = Router.Locations;
var Link = require('react-router-component').Link;
var Location = Router.Location;
var NotFound = Router.NotFound;
var styles = {
  bmMenuWrap : {
    zIndex: '20'
  },
  bmBurgerButton: {
    position: 'fixed',
    width: '3.6rem',
    height: '3.6rem',
    left: '1.4rem',
    top: '2.4rem',
    zIndex: '15'
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
    background: '#fff',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    zIndex: '20',
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideState : false
    }
    this.setState = this.setState.bind(this);
    this.hideSideBar = this.hideSideBar.bind(this)
  }
  hideSideBar(){
    this.setState({ slideState: false })
  }
  render () {
    return (
      <div id="outer-container" className="page-container">
        <Menu className={ "my-menu" }  pageWrapId={ "page-wrap" } isOpen={ this.state.slideState } outerContainerId={ "outer-container" } styles={ styles }  width={'60%'} customBurgerIcon={ <img src="img/logo.jpg" alt="yixi"/> }>
          <Link id="home" className="menu-item" data-navtype="home" href="/">主页</Link>
          <Link id="lecture" className="menu-item" data-navtype="lecture" href="/lecture">演讲</Link>
          <Link id="lecturers" className="menu-item" data-navtype="lecturers" href="/lecturers">讲者</Link>
          <Link id="record" className="menu-item" data-navtype="record" href="/record">记录</Link>
        </Menu>
        <Locations id="page-wrap" className="page-wrapper" onNavigation={this.hideSideBar}>
            <Location path="/" handler={HomePage} />
            <Location path="/lecture" handler={LecturePage} />
            <Location path="/lecturers" handler={LecturersPage} />
            <Location path="/record" handler={RecordPage} />
            <NotFound handler={NotFoundPage} />
        </Locations>
      </div>
    );
  }
}


export default App;
