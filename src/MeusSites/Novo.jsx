import React from 'react'

import { get } from '../Api'

export class MeusSitesNovo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      pages: []
    }
  }

  componentDidMount() {
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
            <p>Clique abaixo na página desejada. Em instantes o seu site estará pronto.</p>
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
      return <p>Você não tem nenhuma página. <a href='https://www.facebook.com/pages/create/' target='_blank'>Clique aqui</a> para criar uma página em seu Facebook e depois atualize esta página.</p>
    } else {
      const list = this.state.pages.map(i => (
        <a key={i.account_id} className='list-group-item'>
          {i.name}
        </a>
      ))

      return <div className='list-group'>{list}</div>
    }
  }
}
