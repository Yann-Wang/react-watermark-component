import React from 'react'
import PropTypes from 'prop-types'
import getWaterMarkCanvas from './WaterMarkCanvas'
import SecurityDefense from './SecurityDefense'

const defaultOptions = {
  chunkWidth: 200,
  chunkHeight: 60,
  textAlign: 'left',
  textBaseline: 'bottom',
  globalAlpha: 0.17,
  font: '14px Microsoft Yahei',
  rotateAngle: -0.26,
  fillStyle: '#666'
}

const waterMarkStyle = 'position: absolute;left: 0;right: 0;top:0;bottom:0;opacity: 0.7;z-index: 9999;pointer-events: none;overflow: hidden;background-color: transparent;background-repeat: repeat;'
const noop = function () {}

class WaterMark extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    waterMarkText: PropTypes.string.isRequired,
    openSecurityDefense: PropTypes.bool,
    securityAlarm: PropTypes.func,
    options: PropTypes.shape({
      chunkWidth: PropTypes.number,
      chunkHeight: PropTypes.number,
      textAlign: PropTypes.string,
      textBaseline: PropTypes.string,
      globalAlpha: PropTypes.number,
      font: PropTypes.string,
      rotateAngle: PropTypes.number,
      fillStyle: PropTypes.string
    })
  }

  componentDidMount() {
    const { openSecurityDefense, securityAlarm } = this.props
    if (openSecurityDefense) {
      const dom = document.getElementById('water-mark-observer')
      const parent = document.getElementById('water-mark-wrapper')
      const security = new SecurityDefense(waterMarkStyle, this.getStyles, securityAlarm)
      security.registerNodeRemoveListener(parent)
      security.registerNodeAttrChangeListener(dom)
    }
  }

  getStyles = () => {
    const { waterMarkText, options } = this.props
    const newOptions = Object.assign({}, defaultOptions, options)
    return getWaterMarkCanvas(waterMarkText, newOptions)
  }

  render() {
    const { children } = this.props
    const styles = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.7,
      zIndex: 9999,
      pointerEvents: 'none',
      overflow: 'hidden',
      backgroundImage: `url("${this.getStyles()}")`,
      backgroundColor: 'transparent',
      backgroundRepeat: 'repeat'
    }

    return (
      <div style={{ position: 'relative' }} id="water-mark-wrapper">
        <div style={styles} id="water-mark-observer" />
        {children}
      </div>
    )
  }
}

WaterMark.defaultProps = {
  openSecurityDefense: false,
  securityAlarm: noop,
  options: defaultOptions
}

export default WaterMark
