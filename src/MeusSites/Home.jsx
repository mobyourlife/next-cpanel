import React from 'react'
import { Link } from 'react-router'

import { get } from '../Api'

export class MeusSitesHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sites: []
    }
  }

  componentDidMount() {
    get('/users/me/sites').then(sites => this.setState({
      loading: false,
      sites
    }))
  }

  render () {
    const sites = this.renderSites()

    return (
      <div>
        <div className='jumbotron'>
          <div className='container'>
            <h1>Meus Sites</h1>
            <p>Aqui você tem controle fácil sobre os seus sites.</p>
            <Link to={'/Meus-Sites/Novo'} className='btn btn-lg btn-primary'>
              Criar novo site
            </Link>
          </div>
        </div>
        <div className='container'>
          {sites}
        </div>
      </div>
    )
  }

  renderSites () {
    if (this.state.loading) {
      return <p>Aguarde, carregando...</p>
    } else if (!this.state.sites || !this.state.sites.length) {
      return <p>Você ainda não tem nenhum site. Crie o seu primeiro agora e teste grátis por 15 dias!</p>
    } else {
      const list = this.state.sites.map(i => (
        <a key={i.account_id} className='list-group-item'>
          {i.name}
        </a>
      ))

      return <div className='list-group'>{list}</div>
    }
  }
}
