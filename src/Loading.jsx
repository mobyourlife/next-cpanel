import React from 'react'
import { FormatMessage } from 'react-easy-intl'

const Loading = () => (
  <div className='text-center'>
    <p><img src={'/img/loading.gif'} alt='Loading' /></p>
    <h4><FormatMessage>Loading, please wait...</FormatMessage></h4>
  </div>
)

export default Loading
