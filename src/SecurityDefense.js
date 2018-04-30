export default class SecurityDefense {
  constructor(waterMarkStyle, getImageUrl, securityAlarm) {
    this.randomId = 'water-mark-observer'
    this.waterMarkStyle = waterMarkStyle
    this.getImageUrl = getImageUrl
    this.securityAlarm = securityAlarm
  }

  getWaterMarkDom = () => {
    return document.getElementById(this.randomId)
  }

  registerNodeRemoveListener = (target) => {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const removeNodes = mutation.removedNodes
          if (removeNodes && removeNodes[0] && removeNodes[0].id) {
            const id = removeNodes[0].id
            if (id && id.indexOf('water-mark-observer') > -1) {
              this.createWaterMarkDom(target)
              observer.disconnect()
              if (this.securityAlarm) {
                this.securityAlarm()
              }
            }
          }
        }
      })
    })
    let config = { childList: true }
    observer.observe(target, config)
  }

  createWaterMarkDom = (parent) => {
    const newWaterMark = document.createElement('div')
    this.randomId = `water-mark-observer-${(new Date()).getTime()}`
    newWaterMark.id = this.randomId
    this.waterMarkStyle = this.waterMarkStyle.concat(`background-image: url("${this.getImageUrl()}");`)
    newWaterMark.style = this.waterMarkStyle
    parent.appendChild(newWaterMark)
    const newDom = this.getWaterMarkDom()
    this.registerNodeRemoveListener(parent)
    this.registerNodeAttrChangeListener(newDom)
  }

  registerNodeAttrChangeListener = (target) => {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          target.parentNode.removeChild(target)
          observer.disconnect()
        }
      })
    })
    let config = { attributes: true, attributeFilter: ['style'] }
    observer.observe(target, config)
  }
}
