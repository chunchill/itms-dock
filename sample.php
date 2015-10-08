<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx46ec518495a7e2d8", "5b31a1a1b317446c13f84f07e9c7dc0e");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <title>微信JS-SDK php Demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <link rel="stylesheet" href="style.css">
<style id="style-1-cropbar-clipper">/* Copyright 2014 Evernote Corporation. All rights reserved. */
.en-markup-crop-options {
    top: 18px !important;
    left: 50% !important;
    margin-left: -100px !important;
    width: 200px !important;
    border: 2px rgba(255,255,255,.38) solid !important;
    border-radius: 4px !important;
}

.en-markup-crop-options div div:first-of-type {
    margin-left: 0px !important;
}
</style></head>
<body>
      appId: '<?php echo $signPackage["appId"];?>',<br/>
      timestamp: <?php echo $signPackage["timestamp"];?>,<br/>
      nonceStr: '<?php echo $signPackage["nonceStr"];?>',<br/>
      signature: '<?php echo $signPackage["signature"];?>',<br/>

        <h3 id="menu-scan">微信扫一扫</h3>
        <span class="desc">调起微信扫一扫接口</span>
        <button class="btn btn_primary" id="scanQRCode0">scanQRCode(微信处理结果)</button>
        <button class="btn btn_primary" id="scanQRCode1">scanQRCode(直接返回结果)</button>
        <button class="btn btn_primary" id="scanQRCode2">scanQRCode(jQuery Ready事件)</button>

</body>

<script src="jweixin-1.0.0.js"></script>

<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
         'scanQRCode'
    ]
  });
  wx.ready(function () {
    // 在这里调用 API

    // 9 微信原生接口
      // 9.1.1 扫描二维码并返回结果
      document.querySelector('#scanQRCode0').onclick = function () {
        wx.scanQRCode();
      };
      // 9.1.2 扫描二维码并返回结果
      document.querySelector('#scanQRCode1').onclick = function () {
        wx.scanQRCode({
          needResult: 1,
          desc: 'scanQRCode desc',
          success: function (res) {
            alert(JSON.stringify(res));
          }
        });
       };
  });
</script>
<script src="zepto.min.js"></script>
<script src="demo.js"> </script>
<script>
$(function(){


  // 9.1.2 扫描二维码并返回结果
        document.querySelector('#scanQRCode2').onclick = function () {
          wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
              alert('from jquery ready:'+JSON.stringify(res));
            }
          });
         };
})
</script>
</html>
