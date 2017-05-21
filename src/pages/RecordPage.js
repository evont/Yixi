import React, { Component } from 'react';
import Loading from 'react-loading';
export default class RecordPage extends Component {
  render(){
    return(
      <div>
        <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='5rem' width='5rem' />
      </div>
    )
  }
}
