import React from 'react'
import { Link } from 'react-router'
import { FormatMessage } from 'react-easy-intl'

import FaGlobe from 'react-icons/lib/fa/globe'

export class AdminHome extends React.Component {
  render () {
    return (
      <div>
        <h1><FormatMessage>Admin</FormatMessage></h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><FormatMessage>Admin</FormatMessage></li>
        </ol>
        <p><FormatMessage>Select below the desired admin tool.</FormatMessage></p>
        <Link to={'/Admin/All-Sites'} className='btn btn-lg btn-default col-md-3 col-sm-4'>
          <FaGlobe /><br/>
          <FormatMessage>All Sites</FormatMessage>
        </Link>
      </div>
    )
  }
}
