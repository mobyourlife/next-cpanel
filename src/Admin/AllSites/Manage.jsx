import React from 'react'
import { Link } from 'react-router'
import { FormatMessage } from 'react-easy-intl'

import { get } from '../../Api'
import { SiteManagement } from '../../MySites/SiteManagement'

export class AllSitesManage extends React.Component {
  render () {
    return (
      <div>
        <h1><FormatMessage>Manage Site</FormatMessage></h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Admin'}><FormatMessage>Admin</FormatMessage></Link></li>
          <li><Link to={'/Admin/Todos-Sites'}><FormatMessage>All Sites</FormatMessage></Link></li>
          <li><FormatMessage>Manage Site</FormatMessage></li>
        </ol>
        <SiteManagement id={this.props.routeParams.id} />
      </div>
    )
  }
}
