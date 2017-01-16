import React from 'react'
import { Link } from 'react-router'

import { get } from '../Api'

export class MeusSitesNovo extends React.Component {
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
        <div className='jumbotron'>
          <div className='container'>
            <h1>Criar Novo Site</h1>
            <p>Clique abaixo na página desejada.</p>
          </div>
        </div>
        <div className='container'>
          {pages}
        </div>
      </div>
    )
  }

  renderPages () {
    if (this.state.loading) {
      return <p>Aguarde, carregando...</p>
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
        <Link to={'/Meus-Sites/Novo/' + i.account_id} className='list-group-item'>
          {i.name}
        </Link>
      ))

      return <div className='list-group'>{list}</div>
    }
  }
}
