
- `react-watermark-component` is a component that can generate a water mark background image.
- this react component is from an internal project of youzan company.

### feature
- the arrangement is oblique
- security defense -- prevent somebody from deleting the watermark dom, or modifying the style attribute
- support securityAlarm callback -- it will be revoked when the watermark is attacked
- support to configurate the style of watermark text, such as the font, rotate angle, chunkWidth, chunkHeight.
- support to use this component twice or more times in one page
- the watermark is drawn by canvas

### display
- ![water mark image](http://okup5z621.bkt.clouddn.com/watermark.jpeg)

### install

```shell
    yarn add react-watermark-component
```
or

```shell
  npm i react-watermark-component --save
```

### import
- this package is developed using es6 syntax, so we recommend to load the package as follows:

```javascript
    import ReactWaterMark from 'react-watermark-component';
```

or you can also load as follows:

```javascript
  const ReactWaterMark = require('react-watermark-component')
```

### Demo

```javascript
  render() {
    const text = `${loginedUser.cas_username}, ${loginedUser.cas_id}`;
    // the securityAlarm props is optional, it will be triggered when someone is deleting the water mark dom or modifying the style attribute of the water mark dom.
    const beginAlarm = function() { console.log('start alarm'); };
    // the options is optional, the default value of the field of the options object is as follows.
    const options = {
      // the width of a piece of water mark, it's suggested that the value is more than the real width, such as the real width is 150, correspondingly the chunkWidth is 200
      chunkWidth: 200,
      // the height of a piece of water mark, it's suggested that the value is at least four times than the font-size of the real water mark text
      chunkHeight: 60,
      textAlign: 'left',
      textBaseline: 'bottom',
      globalAlpha: 0.17,
      font: '14px Microsoft Yahei',
      rotateAngle: -0.26,
      fillStyle: '#666'
    }
    return (
      <ReactWaterMark
        waterMarkText={text}
        openSecurityDefense // by default, the security defense isn't opened
        securityAlarm={beginAlarm} // when the security defense is opened and water mark is attacked, the securityAlarm callback will be called.
        options={options}
      >
        <AppLayout>
          ...
        </Applayout>
      </ReactWaterMark>
    )
  }
```

### compatibility
- as we all know, [the react support IE9+ from version 15](https://reactjs.org/blog/2016/01/12/discontinuing-ie8-support.html), about the detail you can read the [react-dom browser support](https://reactjs.org/docs/react-dom.html#browser-support)
- in the part of security defense, we use MutationObserver(IE 11+) to observe the dom deleting and the dom attribute change. MutationObserver is included in the [DOM4 standard](https://dom.spec.whatwg.org/#mutationobserver).
- [MutationObserver compatibility](https://caniuse.com/#search=MutationObserver)
- [MutationObserver introduction](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


### Contributing
- compile

```shell
  npm run build
```

### License
- ISC
