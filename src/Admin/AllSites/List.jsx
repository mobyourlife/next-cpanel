import React from 'react'
import { Link } from 'react-router'
import { FormatMessage } from 'react-easy-intl'

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
        <h1><FormatMessage>All Sites</FormatMessage></h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li><Link to={'/Admin'}><FormatMessage>Admin</FormatMessage></Link></li>
          <li><FormatMessage>All Sites</FormatMessage></li>
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
          <h3><FormatMessage>Something is missing! Where are all the sites?</FormatMessage></h3>
          <h4><FormatMessage>Check database connection first. There should be a lot of sites here.</FormatMessage></h4>
          <p>
            <Link to={'/My-Sites/New'} className='btn btn-lg btn-primary'>
              <FormatMessage>Create My First Site</FormatMessage>
            </Link>
          </p>
        </div>
      )
    } else {
      const filterred = this.state.sites.filter(i => i.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1)

      const list = filterred.map(i => (
        <div key={i.id} className='col-md-6'>
          <Link to={'/Admin/All-Sites/Manage/' + i.id}
            className={'row-list-item ' + syncState(i)}>
            <img src={i.picture} alt={i.name} style={{width: 50, height: 50, marginRight: 20}} />
            {i.name}
          </Link>
        </div>
      ))

      const legendFilter = this.state.filterText ? <p>Filtrando por <span className='label label-info'>{this.state.filterText}</span>:</p> : null
      const legendQty = this.state.filterText ? <p><FormatMessage qtyFiltered={filterred.length} qtyTotal={this.state.sites.length}>Showing #qtyFiltered of #qtyTotal active sites.</FormatMessage></p> : <p><FormatMessage qtyTotal={this.state.sites.length}>Showing #qtyTotal active sites.</FormatMessage></p>

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
