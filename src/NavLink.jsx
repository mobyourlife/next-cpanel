import React from 'react'
import { Link } from 'react-router'

class NavLink extends React.Component {
  render () {
    const isActive = this.context.router.isActive(this.props.to, false)
    const className = isActive ? 'active' : ''

    return (
      <li className={className}>
        <Link to={this.props.to}>{this.props.children}</Link>
      </li>
    )
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object
}

export default NavLink
