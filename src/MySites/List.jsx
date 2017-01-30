import React from 'react'
import { Link } from 'react-router'
import { FormatMessage } from 'react-easy-intl'

import FaPlus from 'react-icons/lib/fa/plus'

import { get } from '../Api'
import Loading from '../Loading'

export class MySitesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      sites: []
    }
  }

  componentDidMount () {
    get('/users/me/sites').then(sites => this.setState({
      loading: false,
      sites
    }))
  }

  render () {
    const sites = this.renderSites()

    return (
      <div>
        <h1><FormatMessage>My Sites</FormatMessage></h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><FormatMessage>My Sites</FormatMessage></li>
        </ol>
        {sites}
      </div>
    )
  }

  renderSites () {
    if (this.state.loading) {
      return <Loading />
    } else if (!this.state.sites || !this.state.sites.length) {
      return (
        <div className='text-center'>
          <img src={'/img/sad.png'} alt='Que triste!' />
          <h3><FormatMessage>You still don't have a site, but it's fairly easy to solve this.</FormatMessage></h3>
          <h4><FormatMessage>Click the button below to get started.</FormatMessage></h4>
          <p>
            <Link to={'/My-Sites/New'} className='btn btn-lg btn-primary'>
              <FormatMessage>Criar Meu Primeiro Site</FormatMessage>
            </Link>
          </p>
        </div>
      )
    } else {
      const list = this.state.sites.map(i => (
        <div key={i.id}>
          <Link to={'/My-Sites/Manage/' + i.id} className='row-list-item'>
            <img src={i.picture} alt={i.name} style={{width: 50, height: 50, marginRight: 20}} />
            {i.name}
          </Link>
        </div>
      ))

      return (
        <div>
          <div>{list}</div>
          <p className='text-right'>
            <Link to={'/My-Sites/New'} className='btn btn-primary'>
              <FaPlus style={{marginRight: 10}} />
              <FormatMessage>Create New Site</FormatMessage>
            </Link>
          </p>
        </div>
      )
    }
  }
}
