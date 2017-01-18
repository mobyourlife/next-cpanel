import React from 'react'
import { Link } from 'react-router'

import { get } from '../Api'

export class MeusSitesGerenciar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      site: null
    }
  }

  componentDidMount () {
    get('/sites/' + this.props.routeParams.id).then(site => this.setState({
      loading: false,
      site
    }))
  }

  render () {
    const info = this.renderInfo()

    return (
      <div>
        <h1>Gerenciar Site</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Meus-Sites'}>Meus Sites</Link></li>
          <li>{this.state.site && this.state.site.name}</li>
        </ol>
        {info}
      </div>
    )
  }

  renderInfo () {
    if (this.state.loading) {
      return (
        <div className='text-center'>
          <p><img src={'/img/loading.gif'} alt='Carregando' /></p>
          <h4>Aguarde, carregando...</h4>
        </div>
      )
    } else if (!this.state.site) {
      return (
        <div className='text-center'>
          <img src={'/img/sad.png'} alt='Que triste!' />
          <h3>Ops, não consegui encontrar este site!</h3>
          <h4>Clique no botão abaixo para listar todos os seus sits e tente novamente.</h4>
          <p>
            <Link to={'/Meus-Sites'} className='btn btn-lg btn-primary'>
              Listar Meus Sites
            </Link>
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <h3>
            <img src={this.state.site.picture} alt={this.state.site.name} className='img-thumbnail'
              style={{width: 50, height: 50, marginRight: 20}} />
            {this.state.site.name}
          </h3>
        </div>
      )
    }
  }
}
