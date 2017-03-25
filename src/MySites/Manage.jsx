import React from 'react'
import { Link } from 'react-router'
import { FormatMessage } from 'react-easy-intl'

import { get } from '../Api'

import { SiteManagement } from './SiteManagement'

export class MySitesManage extends React.Component {
  render () {
    return (
      <div>
        <h1><FormatMessage>Manage Site</FormatMessage></h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/My-Sites'}><FormatMessage>My Sites</FormatMessage></Link></li>
          <li><FormatMessage>Manage Site</FormatMessage></li>
        </ol>
        <SiteManagement id={this.props.routeParams.id} />
      </div>
    )
  }
}
