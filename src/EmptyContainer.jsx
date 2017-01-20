import React from 'react'

class EmptyContainer extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default EmptyContainer
