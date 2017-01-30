import React from 'react'
import { Link } from 'react-router'

import { get } from '../Api'

import { SiteManagement } from './SiteManagement'

export class MySitesManage extends React.Component {
  render () {
    return (
      <div>
        <h1>Gerenciar Site</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Meus-Sites'}>Meus Sites</Link></li>
          <li>Gerenciar Site</li>
        </ol>
        <SiteManagement id={this.props.routeParams.id} />
      </div>
    )
  }
}
