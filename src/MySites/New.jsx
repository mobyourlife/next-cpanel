import React from 'react'
import { Link, browserHistory } from 'react-router'

import { get, post } from '../Api'
import { getUser } from '../Account/facebook'

export class MySitesNew extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      pages: []
    }
  }

  componentDidMount () {
    get('/users/me/pages').then(pages => this.setState({
      loading: false,
      pages
    }))
  }

  render () {
    const pages = this.renderPages()

    return (
      <div>
        <h1>Criar Novo Site</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Meus-Sites'}>Meus Sites</Link></li>
          <li>Criar Novo Site</li>
        </ol>
        {pages}
      </div>
    )
  }

  createWebsite (account_id) {
    const user = getUser()
    post('/sites', {fb_uid: user.fb_uid, account_id}).then(fb_account_id => {
      browserHistory.replace('/Meus-Sites/Gerenciar/' + fb_account_id)
    })
  }

  renderPages () {
    if (this.state.loading) {
      return (
        <div className='text-center'>
          <p><img src={'/img/loading.gif'} alt='Carregando' /></p>
          <h4>Aguarde, carregando...</h4>
        </div>
      )
    } else if (!this.state.pages || !this.state.pages.length) {
      return (
        <div className='text-center'>
          <h2>Opa, calma aí!</h2>
          <p>Você ainda não tem uma página no Facebook.</p>
          <p>Precisa de ajuda do nosso suporte fantástico para criar a sua primeira página? Basta clicar no botão abaixo, ficaremos felizes em ajudá-lo!</p>
          <p>
            <a href='https://www.messenger.com/t/MobYourLife' target='_blank' norel='opener'>
              <img src='/icons/messenger.png' alt='Fale conosco no Messenger'/>
            </a>
          </p>
          <p><a href='https://www.facebook.com/pages/create/' target='_blank'>Clique aqui</a> para começar a criação da sua página no Facebook.</p>
        </div>
      )
    } else {
      const list = this.state.pages.map(i => (
        <div key={i.account_id} className='col-md-6'>
          <a onClick={() => this.createWebsite(i.account_id)} className='row-list-item'>
            <img src={i.picture} alt={i.name} style={{width: 50, height: 50, marginRight: 20}} />
            {i.name}
          </a>
        </div>
      ))

      return (
        <div>
          <div className='alert alert-info'>
            Estas são as suas páginas do Facebook. Clique sobre a página para qual você deseja criar um novo site.
          </div>
          <div className='row'>{list}</div>
        </div>
      )
    }
  }
}
