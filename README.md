
- `react-watermark-component` is a component that can generate a water mark background image.
- this react component is from an internal project of youzan company.


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
      chunkWidth: 200, // the width of a piece of water mark, it's suggested that the value is more than the real width, such as the real width is 150, correspondingly the chunkWidth is 200
      chunkHeight: 60, // the height of a piece of water mark, it's suggested that the value is at least four times than the font-size of the real water mark text
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
        securityAlarm={beginAlarm}
        options={options}
      >
        <AppLayout>
          ...
        </Applayout>
      </ReactWaterMark>
    )
  }
```

### Contributing
- compile

```shell
  npm run build
```

### License
- ISC
