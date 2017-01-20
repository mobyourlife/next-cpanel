import React from 'react'
import { Link } from 'react-router'

import FaGlobe from 'react-icons/lib/fa/globe'

export class AdminHome extends React.Component {
  render () {
    return (
      <div>
        <h1>Administração</h1>
        <ol className='breadcrumb'>
          <li><Link to={'/'}>Mob Your Life</Link></li>
          <li>Administração</li>
        </ol>
        <p>Selecione abaixo a ferramenta administrativa desejada.</p>
        <Link to={'/Admin/Todos-Sites'} className='btn btn-lg btn-default col-md-3 col-sm-4'>
          <FaGlobe /><br/>
          Todos Sites
        </Link>
      </div>
    )
  }
}
