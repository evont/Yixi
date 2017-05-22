import React, { Component } from 'react';
import Loading from 'react-loading';
require('../stylesheet/lecture-single.scss');
export default class Lecture extends Component{
  constructor(props){
    super(props);
    this.state = {
      LectureData : {}
    }
    this.setState = this.setState.bind(this);
    this.fetchLecture = this.fetchLecture.bind(this);
  }
  fetchLecture(){
    const api_url = `/api/v1/lecture/detail/${this.props.lid}`;
    fetch(api_url).then((response) => response.json()).then((data) => this.setState({
      LectureData : data.data
    }))
  }
  componentWillMount(){
    this.fetchLecture();
  }
  render(){
    let pageContent = <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='5rem' width='5rem' />;
    if(this.state.LectureData.id){
      let stateContent = this.state.LectureData
      pageContent = <div className='lecturePage'>
          <div className='pageBg' style={{backgroundImage: `url('${stateContent.lecturer.background}')`}}></div>
          <div className='pageContent'>
              <div className='content-lecturer'>
                  <div className='lecturer-avatar' style={{backgroundImage: `url('${stateContent.lecturer.pic}')`}}></div>
                  <h4>{stateContent.lecturer.nickname}</h4>
                  <p>{stateContent.lecturer.desc}</p>
              </div>
              <div className='content-video'>
                  <h3 className='video-title'>{stateContent.title}<p className='time'>{stateContent.time}</p></h3>
                  <p className='video-desc'>{stateContent.desc}</p>
                  <div className="fake-video" style={{backgroundImage: `url('${stateContent.cover}')`}}></div>
              </div>
          </div>
      </div>
    }
    return pageContent;
  }
}
