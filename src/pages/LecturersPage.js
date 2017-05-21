import React, { Component } from 'react';
import Loading from 'react-loading';
export default class LecturersPage extends Component {
  render(){
    return(
      <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='5rem' width='5rem' />
    )
  }
}
