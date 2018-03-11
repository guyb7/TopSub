import React, { Component } from 'react'

import ReactSVG from 'react-svg'

const style = {
  container: {
    display: 'inline-block'
  },
  svg: {
    display: 'inline-block',
    color: 'currentColor',
    fill: 'currentColor',
    height: 24,
    width: 24,
    userSelect: 'none'
  }
}

class MdIcon extends Component {
  render() {
    return (
      <ReactSVG
        path={this.props.svg}
        style={{ ...style.svg, ...this.props.style }}
        {...this.props}
        />
    )
  }
}

export default MdIcon
