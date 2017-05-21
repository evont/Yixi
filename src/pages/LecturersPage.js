import React, { Component } from 'react';
import Loading from 'react-loading';
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
      tabList: data.data,
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
    return <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='5rem' width='5rem' />
  }
  renderTabList(data){
    return Array.prototype.map.call(this.state.tabList, function(ele, ind){
       return <option key={ele.id} value={ele.id}>{ele.name}</option>
    })
  }
  tabChange(event){
    this.fetchLecturers(event.target.value);
  }
  componentWillMount(){
    this.fetchTabLists();
  }
  render(){
    var Lectures = this.renderList(this.state.lecureList);
    var TabSelectList = this.renderTabList(this.state.tabList);
    return(
      <div className="lecture-container">
          <div className="lecture-types-container">
              <select onChange={this.tabChange}>{TabSelectList}</select>
          </div>
          <div className="lecture-list-container">
              {Lectures}
          </div>
      </div>
    )
  }
}
