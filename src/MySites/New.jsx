import React from 'react'
import { Link, browserHistory } from 'react-router'
import { FormatMessage } from 'react-easy-intl'

import { get, post } from '../Api'
import { getUser } from '../Account/facebook'
import Loading from '../Loading'

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
        <h1><FormatMessage>Create New Site</FormatMessage></h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/My-Sites'}><FormatMessage>My Sites</FormatMessage></Link></li>
          <li><FormatMessage>Create New Site</FormatMessage></li>
        </ol>
        {pages}
      </div>
    )
  }

  createWebsite (account_id) {
    const user = getUser()
    post('/sites', {fb_uid: user.fb_uid, account_id}).then(fb_account_id => {
      browserHistory.replace('/My-Sites/Manage/' + fb_account_id)
    })
  }

  renderPages () {
    if (this.state.loading) {
      return <Loading/>
    } else if (!this.state.pages || !this.state.pages.length) {
      return (
        <div className='text-center'>
          <h2><FormatMessage>Hey, hold on!</FormatMessage></h2>
          <p><FormatMessage>You still don't have a Facebook page.</FormatMessage></p>
          <p><FormatMessage>Do you need help from our fantastic support to create your first page? Just click the button below, we'll be happy to help you!</FormatMessage></p>
          <p>
            <a href='https://www.messenger.com/t/MobYourLife' target='_blank' norel='opener'>
              <img src='/icons/messenger.png' alt='Reach us on Messenger'/>
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
            <FormatMessage>Those are your Facebook pages. Click over the page for that you want to create a new site.</FormatMessage>
          </div>
          <div className='row'>{list}</div>
        </div>
      )
    }
  }
}
