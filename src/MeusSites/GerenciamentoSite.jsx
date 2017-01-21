import React from 'react'
import { Link } from 'react-router'

import FaFw from '../FaFw'
import FaStar from 'react-icons/lib/fa/star'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaCircle from 'react-icons/lib/fa/circle'

import { get, patch } from '../Api'
import Loading from '../Loading'
import FormatDate from '../FormatDate'

export class GerenciamentoSite extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      site: null,
      saving: false,
      title: '',
      domain: '',
      analytics_id: ''
    }
  }

  componentDidMount () {
    get('/sites/' + this.props.id).then(site => this.setState({
      loading: false,
      site,
      title: (site.custom && site.custom.title) || '',
      domain: (site.admin && site.admin.domain) || '',
      analytics_id: (site.admin && site.admin.analytics_id) || ''
    }))
  }

  render () {
    if (this.state.loading) {
      return <Loading />
    } else if (!this.state.site) {
      return this.notFound()
    } else {
      return this.details()
    }
  }

  notFound () {
    return (
      <div className='text-center'>
        <img src={'/img/sad.png'} alt='Que triste!' />
        <h3>Ops, não consegui encontrar este site!</h3>
        <h4>Clique no botão abaixo para listar todos os seus sites e tente novamente.</h4>
        <p>
          <Link to={'/Meus-Sites'} className='btn btn-lg btn-primary'>
            Listar Meus Sites
          </Link>
        </p>
      </div>
    )
  }

  details () {
    return (
      <div>
        <h3>
          <img src={this.state.site.picture} alt={this.state.site.name} className='img-thumbnail'
            style={{width: 50, height: 50, marginRight: 20}} />
          {this.state.site.name}
        </h3>

        {this.pagePreferences()}

        <hr/>

        <div className='row'>
          <div className='col-md-6'>
            {this.pageDetails()}
          </div>
          <div className='col-md-6'>
            {this.lastActivities()}
          </div>
        </div>
      </div>
    )
  }

  pagePreferences () {
    const inputClass = 'form-control' + (this.state.saving ? ' disabled' : '')
    const btnClass = 'btn btn-primary' + (this.state.saving ? ' disabled' : '')
    const spinner = this.state.saving ? <FaFw><img src={'/img/loading-button.gif'} alt='Salvando...' /></FaFw> : null

    return (
      <form>
        <div className='form-group'>
          <label>Título do site</label>
          <input type='text' value={this.state.title} onChange={ev => this.setState({title: ev.target.value})} className={inputClass} placeholder='Altere o título do site, se desejar, ou deixe em branco para usar o nome da página' />
        </div>
        <div className='form-group'>
          <label>Domínio</label>
          <input type='text' value={this.state.domain} onChange={ev => this.setState({domain: ev.target.value})} className={inputClass} placeholder='Utilize o seu domínio próprio ou um subdomínio gratuito' />
        </div>
        <div className='form-group'>
          <label>Código do Google Analytics</label>
          <input type='text' value={this.state.analytics_id} onChange={ev => this.setState({analytics_id: ev.target.value})} className={inputClass} placeholder='Insira seu código do Google Analytics para monitorar seu site' />
        </div>
        <p className='text-right'>
          <button onClick={() => this.savePreferences()}
            type='button' className={btnClass}>
            {spinner}
            Salvar
          </button>
        </p>
      </form>
    )
  }

  savePreferences () {
    this.setState({saving: true})

    const id = this.state.site._id
    const data = {
      title: this.state.title,
      domain: this.state.domain,
      analytics_id: this.state.analytics_id
    }
    patch(`/admin/sites/${id}`, data).then(res => {
      if (res.statusCode === 400) {
        alert(res.message)
      } else {
        this.setState({
          title: data.title,
          domain: data.domain,
          analytics_id: data.analytics_id
        })
      }
      this.setState({saving: false})
    }, err => {
      alert(res.message)
      this.setState({saving: false})
    })
  }

  pageDetails () {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>Detalhes da página</div>
        <div className='panel-body'>
          <p>{this.state.site.about}</p>
          <p>
            <span className='btn btn-link no-link'><FaStar /> {this.state.site.fan_count} curtidas</span>
            <a href={this.state.site.link || 'https://www.facebook.com/' + this.state.site.fb_account_id} className='pull-right btn btn-facebook' target='_blank' rel='noopener'>
              <FaFw><FaFacebook /></FaFw> Abrir no Facebook
            </a>
          </p>
        </div>
      </div>
    )
  }

  lastActivities () {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>Últimas atividades</div>
        <div className='panel-body panel-list-group'>
          <ul className='list-group'>
            <DateItem label='Sync página' value={this.state.site.log.check_page} />
            <DateItem label='Sync feed' value={this.state.site.log.check_feed} />
            <DateItem label='Sync álbuns' value={this.state.site.log.check_albums} />
            <DateItem label='Site atualizado' value={this.state.site.log.last_built} />
          </ul>
        </div>
      </div>
    )
  }
}

const DateItem = ({label, value}) => {
  const diff = (new Date().getTime() - new Date(value).getTime()) / 1000
  const state = getStateForTimespan(diff)
  const colors = {
    green: '#5cb85c',
    yellow: '#f0ad4e',
    red: '#d9534f'
  }

  return (
    <li className='list-group-item'>
      <FaFw><FaCircle style={{color: colors[state]}} /></FaFw>
      <strong>{label}</strong>
      <span className='pull-right'>
        <FormatDate value={value} />
      </span>
    </li>
  )
}

function getStateForTimespan (seconds) {
  const minutes = seconds / 60

  if (minutes < 60) {
    return 'green'
  } else if (minutes < 120) {
    return 'yellow'
  } else {
    return 'red'
  }
}
