import React, { Component } from 'react';
import Loading from 'react-loading';
require('../stylesheet/Lecture.scss');
export default class LeturePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      albumList: {},
      lectureType: 'date'
    }
    this.setState = this.setState.bind(this);
    this.fetchLecture  = this.fetchLecture.bind(this);
    this.renderList = this.renderList.bind(this);
    this.typesChange = this.typesChange.bind(this);
  }
  fetchLecture(api_type = "date"){
    const api_url = `api/v1/lecture/list/${api_type}/1/desc`;
    fetch(api_url).then((response) => response.json()).then((data) =>
      this.setState({
        albumList: data,
        lectureType: api_type
      })
    );
  }
  componentWillMount(){
    this.fetchLecture();
  }
  renderList(data){
    var lectureType = this.state.lectureType;
    if(this.state.albumList.data){
      if(this.state.lectureType === "date"){
        return Array.prototype.map.call(this.state.albumList.data, function(item, k){
          return Array.prototype.map.call(item.lectures, function(it, j){
            return <ListItem album={it} key={it.id} renderType={lectureType} />
          })
        })
      }else{
        return Array.prototype.map.call(this.state.albumList.data, function(item, k){
          return <ListItem album={item} key={item.id} renderType={lectureType} />
        })
      }
    }else{
      return <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='5rem' width='5rem' />
    }
  }
  typesChange(et){
    let ele = et.target;
    let _self = this;
    let api_type = ele.getAttribute("data-type");
    let et_state = ele.getAttribute("data-state");
    et_state === "0" ? function(){
      _self.fetchLecture(api_type);
      _self.setState({ lectureType: api_type})
    }() : "";
  }
  render(){
    var Lectures = this.renderList(this.state.albumList);
    return(
      <div className="lecture-container">
          <div className="lecture-types-container">
            <span onClick={this.typesChange} className="lecture-type" data-state={this.state.lectureType === 'like' ? 1 : 0} data-type="like">喜欢</span>
            <span onClick={this.typesChange} className="lecture-type" data-state={this.state.lectureType === 'view' ? 1 : 0} data-type="view">观看</span>
            <span onClick={this.typesChange} className="lecture-type" data-state={this.state.lectureType === 'date' ? 1 : 0} data-type="date">日期</span>
          </div>
          <div className="lecture-list-container">
              {Lectures}
          </div>
      </div>
    )
  }
}
class ListItem extends Component {
  constructor(props){
    super(props);
    this.renderList = this.renderList.bind(this);
  }
  renderList(renderType){
    //console.log(this.props.album.lectures[0]);
    return (<div className="lecture-list-item">
        <div className="item-cover"><img src={this.props.album.cover } alt={this.props.album.title} /></div>
        <div className="item-detail">
            <h4 className="detail-header">{this.props.album.title}</h4>
            <p className="detail-author"><span>{this.props.album.lecturer.nickname}</span><span className="">{this.props.album.time}</span></p>
            <div className="detail-info">
                <span className="item-ico" data-type="viewnum">{this.props.album.viewnum}</span>
                <span className="item-ico" data-type="likenum">{this.props.album.likenum}</span>
                <span className="item-ico" data-type="cmtnum">{this.props.album.cmtnum}</span>
            </div>
        </div>
    </div>);
  }
  render() {
    return this.renderList(this.props.renderType);
  }
}
