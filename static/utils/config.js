(function () {
  var ui_width = 750;
  var g = document.documentElement.clientWidth / ui_width;
  document.getElementById('UIWIDTH')
    .setAttribute("content",
      "width=" + ui_width
      + ", " +
      "initial-scale=" + g + ", " +
      "maximum-scale=" + g + ", " +
      "user-scalable=no")

  if (location.host.indexOf('haiwaiuni') === -1) {
    window.setting = {
      CDNImage: 'https://image-yp.cdn.haiwaiuni.com/',
      CDNStatic: 'https://test1.ukwelife.com/',
      HTTPAPI: 'http://pc.test1.ukwelife.com/api/',
      HTTPAPIMobile: 'https://test1.ukwelife.com/v2/',
      HTTPURL: 'https://test1.ukwelife.com/',
      HTTPURLPC: 'http://pc.test1.ukwelife.com/index'
    }
  } else {
    window.setting = {
      CDNImage: 'https://image-yp.cdn.haiwaiuni.com/',
      CDNStatic: 'https://www.haiwaiuni.com/',
      HTTPAPI: 'https://pc.haiwaiuni.com/api/',
      HTTPAPIMobile: 'https://www.haiwaiuni.com/v2/',
      HTTPURL: 'https://www.haiwaiuni.com/',
      HTTPURLPC: 'https://pc.haiwaiuni.com/index'
    }
  }
})()
