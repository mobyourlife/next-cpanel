import React from 'react'

import { get } from '../Api'

export class DashboardHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sites: []
    }
  }

  componentDidMount() {
    get('/sites').then(res => this.setState({
      loading: false,
      sites: res.sites
    }))
  }

  render () {
    const sites = this.renderSites()

    return (
      <div>
        <div className='jumbotron'>
          <div className='container'>
            <h1>Dashboard</h1>
            <p>Aqui você tem controle fácil sobre os seus sites</p>
            <button type='button' className='btn btn-primary'>Criar novo site</button>
          </div>
        </div>
        <div className='container'>
          <h2>Meus sites</h2>
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
        <a className='list-group-item'>
          {i.name}
        </a>
      ))

      return <div className='list-group'>{list}</div>
    }
  }
}
