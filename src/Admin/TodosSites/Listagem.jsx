import React from 'react'
import { Link } from 'react-router'

import { get } from '../../Api'

export class TodosSitesListagem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      sites: []
    }
  }

  componentDidMount () {
    get('/admin/sites').then(sites => this.setState({
      loading: false,
      sites
    }))
  }

  render () {
    const sites = this.renderSites()

    return (
      <div>
        <h1>Todos Sites</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Admin'}>Administração</Link></li>
          <li>Todos Sites</li>
        </ol>
        {sites}
      </div>
    )
  }

  renderSites () {
    if (this.state.loading) {
      return (
        <div className='text-center'>
          <p><img src={'/img/loading.gif'} alt='Carregando' /></p>
          <h4>Aguarde, carregando...</h4>
        </div>
      )
    } else if (!this.state.sites || !this.state.sites.length) {
      return (
        <div className='text-center'>
          <img src={'/img/sad.png'} alt='Que triste!' />
          <h3>Não há nenhum site no sistema! Verifique a conexão com o banco de dados.</h3>
          <h4>Ou clique no botão abaixo para criar um site para você.</h4>
          <p>
            <Link to={'/Meus-Sites/Novo'} className='btn btn-lg btn-primary'>
              Criar Meu Primeiro Site
            </Link>
          </p>
        </div>
      )
    } else {
      const list = this.state.sites.map(i => (
        <div key={i.id} className='col-md-6'>
          <Link to={'/Admin/Todos-Sites/Gerenciar/' + i.id} className='row-list-item'>
            <img src={i.picture} alt={i.name} style={{width: 50, height: 50, marginRight: 20}} />
            {i.name}
          </Link>
        </div>
      ))

      return (
        <div>
          <p>Exibindo {list.length} sites ativos.</p>
          <div className='row'>{list}</div>
        </div>
      )
    }
  }
}
