// create the various view models
var entryManagementViewModel = new IMS.EntryManagementViewModel();
var entryManagementLoginViewModel = new IMS.EntryManagementLoginViewModel();
$(document).ready(function () {
    // bind each view model to a jQueryMobile page
    ko.applyBindings(entryManagementLoginViewModel, document.getElementById("logonView"));
    ko.applyBindings(entryManagementViewModel, document.getElementById("entryManagementView"));
    //entryManagementViewModel.init();

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

});




