import React, { Component } from 'react';
import Loading from 'react-loading';
var Link = require('react-router-component').Link;
require('../stylesheet/Lecture.scss');
export default class LecturersPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      lecureList: {},
      tabList: {},
      tagId: 3
    }
    this.setState = this.setState.bind(this);
    this.fetchLecturers  = this.fetchLecturers.bind(this);
    this.fetchTabLists = this.fetchTabLists.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderTabList = this.renderTabList.bind(this);
    this.tabChange = this.tabChange.bind(this);
  }
  fetchTabLists(){
    let api_url =  'api/v1/category/list';
    fetch(api_url).then((res) => res.json()).then((data) => this.setState({
      tabList: data,
      tagId: data.data[0].id
    }))
  }
  fetchLecturers(tagId = this.state.tagId){
    let api_url = `api/v1/category/${tagId}/lecturers`;
    fetch(api_url).then((response) => response.json()).then((data) =>
      this.setState({
        lecureList: data,
        tagId: tagId
      })
    );
  }
  renderList(data){
    if(this.state.lecureList.data){
        return Array.from(this.state.lecureList.data, item =>
            <Link href={`/lecture/${item.lectures_with_cover[0] ? item.lectures_with_cover[0].id : 420}`} className="lecurer-item" key={item.id}>
            <div>
                <div className="item-avatar" style={{backgroundImage: `url('${item.pic}')`}}></div>
                <p className="item-nickname">{item.nickname}</p>
            </div>
          </Link>
        )
    }
    return <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='5rem' width='5rem' />
  }
  renderTabList(data){
    if(this.state.tabList.data){
      return Array.from(this.state.tabList.data, ele =>
        <option key={ele.id} value={ele.id}>{ele.name}</option>
      )
    }
    return <option key="48" value="48">态度</option>
  }
  tabChange(event){
    this.fetchLecturers(event.target.value);
  }
  componentWillMount(){
    this.fetchTabLists();
    this.fetchLecturers();
  }
  render(){
    var Lectures = this.renderList(this.state.lecureList);
    var TabSelectList = this.renderTabList(this.state.tabList);
    return(
      <div className="lecture-container">
          <div className="lecture-types-container">
              <select onChange={this.tabChange}>{TabSelectList}</select>
          </div>
          <div className="lecturers-list-container">
              {Lectures}
          </div>
      </div>
    )
  }
}
