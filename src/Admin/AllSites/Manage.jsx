import React from 'react'
import { Link } from 'react-router'

import { get } from '../../Api'
import { SiteManagement } from '../../MySites/SiteManagement'

export class AllSitesManage extends React.Component {
  render () {
    return (
      <div>
        <h1>Gerenciar Site</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Admin'}>Administração</Link></li>
          <li><Link to={'/Admin/Todos-Sites'}>Todos Sites</Link></li>
          <li>Gerenciar Site</li>
        </ol>
        <GerenciamentoSite id={this.props.routeParams.id} />
      </div>
    )
  }
}
