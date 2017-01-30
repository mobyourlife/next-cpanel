import React from 'react'
import { Link } from 'react-router'

import { get } from '../../Api'
import Loading from '../../Loading'
import { getStateForTimespan } from '../../MySites/SiteManagement'

export class AllSitesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      filterText: '',
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
      return <Loading />
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
      const filterred = this.state.sites.filter(i => i.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1)

      const list = filterred.map(i => (
        <div key={i.id} className='col-md-6'>
          <Link to={'/Admin/Todos-Sites/Gerenciar/' + i.id}
            className={'row-list-item ' + syncState(i)}>
            <img src={i.picture} alt={i.name} style={{width: 50, height: 50, marginRight: 20}} />
            {i.name}
          </Link>
        </div>
      ))

      const legendFilter = this.state.filterText ? <p>Filtrando por <span className='label label-info'>{this.state.filterText}</span>:</p> : null
      const legendQty = this.state.filterText ? <p>Exibindo {list.length} de {this.state.sites.length} sites ativos.</p> : <p>Exibindo {list.length} sites ativos.</p>

      return (
        <div>
          <p>
            <input type='text' className='form-control' placeholder='Digite aqui para filtrar'
              value={this.state.filterText} onChange={ev => this.setState({filterText: ev.target.value})}/>
          </p>
          {legendFilter}
          {legendQty}
          <div className='row'>{list}</div>
        </div>
      )
    }
  }
}

function syncState (i) {
  const times = [
    i.log.check_page,
    i.log.check_feed,
    i.log.check_albums,
    i.log.last_built
  ]
  const worst = getWorstTimespan(times)
  const diff = (new Date() - worst) / 1000
  const state = getStateForTimespan(diff)
  return state
}

function getWorstTimespan (times) {
  let worst = null

  for (let i of times) {
    const value = Date.parse(i)
    if (!worst || (value && value < worst)) {
      worst = value
    }
  }

  return worst
}
