import React from 'react'
import { Link } from 'react-router'

import FaPlus from 'react-icons/lib/fa/plus'

import { get } from '../Api'

export class MeusSitesHome extends React.Component {
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
        <h1>Meus Sites</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li>Meus Sites</li>
        </ol>
        {sites}
      </div>
    )
  }

  renderSites () {
    if (this.state.loading) {
      return <p>Aguarde, carregando...</p>
    } else if (!this.state.sites || !this.state.sites.length) {
      return (
        <div className='text-center'>
          <img src={'/img/sad.png'} alt='Que triste!' />
          <h3>Você ainda não tem um site, mas é bem fácil resolver isto.</h3>
          <h4>Clique no botão abaixo para começar.</h4>
          <p>
            <Link to={'/Meus-Sites/Novo'} className='btn btn-lg btn-primary'>
              Criar Meu Primeiro Site
            </Link>
          </p>
        </div>
      )
    } else {
      const list = this.state.sites.map(i => (
        <div className='col-md-6'>
          <Link to={'/Meus-Sites/Gerenciar/' + i.id} className='row-list-item'>
            <img src={i.picture} alt={i.name} style={{width: 50, height: 50, marginRight: 20}} />
            {i.name}
          </Link>
        </div>
      ))

      return (
        <div>
          <div className='row'>{list}</div>
          <p className='text-right'>
            <Link to={'/Meus-Sites/Novo'} className='btn btn-lg btn-primary'>
              <FaPlus style={{marginRight: 10}} />
              Criar Novo Site
            </Link>
          </p>
        </div>
      )
    }
  }
}
