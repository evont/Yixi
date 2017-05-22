import React, { Component } from 'react';
import HomePage from '../pages/HomePage.js';
import LecturePage from '../pages/LecturePage.js';
import RecordPage from '../pages/RecordPage.js';
import LecturersPage from '../pages/LecturersPage.js';
import Lecture from '../pages/Lecture.js';
import NotFoundPage from '../pages/NotFoundPage.js';
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

export default class Routers extends Component {
  render(){
    return (
      <div id={this.props.routerId} className={this.props.routerClass}>
        <div className="burger-button">
            <img src="/img/logo.jpg" alt="yixi"/>
            <button onClick={this.props.routerOnMenuClick}></button>
        </div>
        <Locations onNavigation={this.props.routerOnNavigation} className="page-locations">
            <Location path="/" handler={HomePage} />
            <Location path="/lecture" handler={LecturePage} />
            <Location path="/lecturers" handler={LecturersPage} />
            <Location path="/record" handler={RecordPage} />
            <Location path="/lecture/:lid" handler={Lecture} />
            <NotFound handler={NotFoundPage} />
        </Locations>
      </div>
    )
  }
}
