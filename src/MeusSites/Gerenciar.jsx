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
          <h4>Detalhes da página</h4>
          <ul>
            <li><strong>Categoria:</strong> {this.state.site.category}</li>
            <li><strong>Sobre:</strong> {this.state.site.about}</li>
            <li><strong>Curtidas:</strong> {this.state.site.fan_count}</li>
            <li><strong>Link para página:</strong> <a href={this.state.site.link} target='_blank' rel='noopener'>{this.state.site.link}</a></li>
          </ul>
          <h4>Últimas atividades</h4>
          <ul>
            <li><strong>Atualização da página:</strong> {this.state.site.log.check_page}</li>
            <li><strong>Atualização do feed:</strong> {this.state.site.log.check_feed}</li>
            <li><strong>Atualização dos álbuns:</strong> {this.state.site.log.check_albums}</li>
            <li><strong>Última modificação:</strong> {this.state.site.log.last_modified}</li>
            <li><strong>Última compilação:</strong> {this.state.site.log.last_built}</li>
          </ul>
        </div>
      )
    }
  }
}
