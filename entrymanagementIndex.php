<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx46ec518495a7e2d8", "5b31a1a1b317446c13f84f07e9c7dc0e");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>iTMS</title>
    <!--<link href="css/jquery.mobile-1.3.2.css" rel="stylesheet" />
    <link href="css/jquery.mobile.theme-1.3.2.css" rel="stylesheet" />
    <link href="css/jquery.mobile.structure-1.3.2.css" rel="stylesheet" />-->
    <link href="themes/jquery.mobile-1.4.5.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="themes/bladecolor.min.css" />
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="themes/bootstrap.min.css">

    <!-- Owl Carousel Assets -->
    <link href="OWL/owl-carousel/owl.carousel.css" rel="stylesheet">
    <link href="OWL/owl-carousel/owl.theme.css" rel="stylesheet">
    <link href="OWL/owl-carousel/owl.transitions.css" rel="stylesheet">

    <!-- Optional theme -->
    <link rel="stylesheet" href="themes/bootstrap-theme.min.css">
    <link rel="stylesheet" href="themes/jqm-demos.css">
    <link rel="stylesheet" href="themes/jquery.mobile.icons.min.css">
    <link rel="stylesheet" href="themes/jquery.mobile.structure-1.4.5.min.css">
    <link href="themes/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/site.css" rel="stylesheet" />
    <script src="scripts/lib/moment.min.js"></script>
    <!--<script src="vendor/jquery/dist/jquery.js"></script>-->
    <script src="scripts/lib/jquery-1.8.2.js"></script>
    <script src="lib/jquery.mobile-1.4.5.js"></script>
    <script src="OWL/owl-carousel/owl.carousel.js"></script>
    <script type="text/javascript" src="cordova.js"></script>
    <!--<script src="scripts/app/knockout.jquery.mobile.js"></script>-->
    <!--<script src="scripts/lib/jquery.mobile-1.3.2.js"></script>-->
    <script src="scripts/lib/amplify.js"></script>
    <script src="scripts/lib/knockout-2.2.0.js"></script>
    <script src="scripts/lib/knockout.mapping-latest.js"></script>
    <script src="scripts/lib/koExternalTemplateEngine_all.js"></script>
    <script src="scripts/lib/wx-1.0.0.js"></script>
    <script src="scripts/app/services/user.js"></script>
    <script src="scripts/app/services/appointment.js"></script>
    <script src="scripts/app/viewmodel/EntryManagementLoginViewModel.js"></script>
    <script src="scripts/app/viewmodel/EntryManagementViewModel.js"></script>
    <script src="scripts/app/ko.extentions.js"></script>
    <script src="scripts/app/app.js"></script>
    <!--<script src="scripts/app/entryManagementApp.js"></script>-->
    <link rel="shortcut icon" href="favicon.ico">
</head>
<body>
<div data-role="page" id="logonView" data-theme="a">
    <div data-role="content">
        <p align="center"><a href="#"><img class="popphoto" src="images/footico.png" height="60px"></a></p>
        <p align="center">
            <font size="3" color="orange"><b>i</font><font size="3" color="#66B3FF">iTMS</font></b><br>
            <font size="2" color="gray">出入场管理登录</font>
        </p>
    </div><!-- /content -->
    <form>
        <div style="padding:10px 40px;">
            <label for="un" class="ui-hidden-accessible">Username:</label>
            <input type="text" name="user" id="un" value="" placeholder="用户名" data-theme="a" data-inline="true" data-bind="value:user">
            <label for="pw" class="ui-hidden-accessible">Password:</label>
            <input type="password" name="pass" id="pw" value="" placeholder="密码" data-theme="a" data-inline="true" data-bind="value:pwd">
            <p align="center">
                <button data-theme="b" data-icon="check" data-bind="click:login">登录</button>
            </p>
        </div>
    </form>

    <div data-role="popup" id="popupMessage" data-overlay-theme="a" data-theme="c" style="max-width:400px;" class="ui-corner-all">
        <div data-role="header" data-theme="a" class="ui-corner-top">
            <h1>错误信息</h1>
        </div>
        <div data-role="content" data-theme="d" class="ui-corner-bottom ui-content">
            <p>对不起，登录失败，请在确保网络正常的情况下检查用户名和密码！</p>
            <a href="#" data-role="button" data-inline="true" data-rel="back" data-transition="flow" data-theme="b">确定</a>
        </div>
    </div>
</div><!-- /page -->
<div data-role="page" id="entryManagementView" data-theme="a">
    <div data-role="content" style="padding: 3px 3px;">
        <div class="jqm-block-content" style="margin: 2px 2px; padding: 8px 8px; background-image: url(images/bg/banner13.png); background-size:cover; border-color:#E4E4E4;">
            <p align="center"><img class="popphoto" src="images/itmslogo1.png" height="24px"></p>
            <div class="ui-nodisc-icon ui-alt-icon" >
                <!-- Classes added to the wrapper -->
                <p align="center"><a href="#panelgrid" class="ui-btn ui-shadow ui-corner-all ui-icon-grid ui-btn-icon-notext ui-btn-inline" style="margin-right: 0px;">grid</a></p>
            </div>
        </div>
        <div class="jqm-block-content" style="margin: 2px 2px; padding: 8px 8px; border-color:#E4E4E4;">
            <p align="center"><font color="gray"><i class="fa fa-2x fa-clock-o"></i></font></p>
            <p align="center"><font size="2">出入场管理</font> </p>
            <div style="padding:5px 5px;">
                <script type="text/html" id="appointmentItem">
                    <!-- ko if: ($index()===0&&$data.status()===1) -->
                    <li data-role="list-divider" data-theme="a">预约信息<span class="ui-li-count ui-body-a" data-bind="text:$parent.onWayItems().length"></span></li>
                    <!-- /ko -->
                    <!-- ko if: ($index()===0&&$data.status()===2) -->
                    <li data-role="list-divider" data-theme="b">预约信息<span class="ui-li-count ui-body-a" data-bind="text:$parent.alreadyArrivedItems().length"></span></li>
                    <!-- /ko -->
                    <!-- ko if: ($index()===0&&$data.status()===3) -->
                    <li data-role="list-divider" data-theme="c">预约信息<span class="ui-li-count ui-body-a" data-bind="text:$parent.alreadyEntryItems().length"></span></li>
                    <!-- /ko -->
                    <li data-icon="gear">
                        <a href="#" data-rel="popup" data-transition="slideup" data-bind="click:$parent.itemClicked">
                            <p><strong data-bind="text:applicationId"></strong></p>
                            <p>车牌: <span data-bind="text:vehicleLicense"></span></p>
                            <p>手机:<span data-bind="text:mobile"></span></p>
                            <p>货量:<span data-bind="text:deliveryVolSum"></span></p>
                            <p>计划日期:<span data-bind="text:planedDevelieryDate"></span></p>
                            <p>计划时间段:<span data-bind="text:planedEarliestDevelieryDate"></span>-<span data-bind="text:planedLatestDevelieryDate"></span></p>
                            <p>供应商:<span data-bind="text:vendorCode"></span></p>
                            <p><font color="gray">道口:<span data-bind="text:dock"></span></font></p>
                        </a>
                    </li>
                </script>
                <div data-role="collapsible" data-theme="a" data-content-theme="a"  class="ui-icon-alt" data-collapsed-icon="carat-r" data-expanded-icon="carat-d">
                    <h2>在途清单</h2>
                    <div class="ui-nodisc-icon ui-alt-icon">
                        <p align="center"><a href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-search ui-btn-icon-notext ui-btn-inline" style="margin-right:0px; margin-bottom:15px;" data-bind="click:scanOnTheWayList">Scan</a></p>
                    </div>
                    <ul data-role="listview" data-inset="true" data-count-theme="a" data-filter="true" data-filter-placeholder="筛选" data-bind="jqmTemplate: {name:'appointmentItem', foreach:onWayItems},jqmRefreshList:onWayItems">
                    </ul>
                </div>
                <div data-role="collapsible" data-theme="a" data-content-theme="a" class="ui-icon-alt" data-collapsed-icon="carat-r" data-expanded-icon="carat-d">
                    <h2>到达清单</h2>
                    <div class="ui-nodisc-icon ui-alt-icon">
                        <p align="center"><a href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-search ui-btn-icon-notext ui-btn-inline" style="margin-right:0px; margin-bottom:15px;" data-bind="click:scanAlreadyArrivedList">Scan</a></p>
                    </div>
                    <ul data-role="listview" data-inset="true" data-count-theme="a" data-filter="true" data-filter-placeholder="筛选" data-bind="jqmTemplate: {name:'appointmentItem', foreach:alreadyArrivedItems},jqmRefreshList:alreadyArrivedItems">
                    </ul>
                </div>
                <div data-role="collapsible" data-theme="a" data-content-theme="a" class="ui-icon-alt" data-collapsed-icon="carat-r" data-expanded-icon="carat-d">
                    <h2>已入场清单</h2>
                    <div class="ui-nodisc-icon ui-alt-icon">
                        <p align="center"><a href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-search ui-btn-icon-notext ui-btn-inline" style="margin-right:0px; margin-bottom:15px;" data-bind="click:scanAlreadyEntryList">Scan</a></p>
                    </div>
                    <ul data-role="listview" data-inset="true" data-count-theme="a" data-filter="true" data-filter-placeholder="筛选" data-bind="jqmTemplate: {name:'appointmentItem', foreach:alreadyEntryItems},jqmRefreshList:alreadyEntryItems">
                    </ul>
                </div>
            </div>
        </div>
        <div class="ui-grid-b">
            <div class="ui-block-a">
                <div class="jqm-block-content ui-responsive" style="margin: 2px 2px; padding: 8px 8px; background-image:url(images/tweets-bg.jpg)"><font color="#264C67"><b>道口出入管理</b></font><br>
                    <font size="1">ver.<b>1.0</b>&nbsp;<i class="fa fa-download"></i></font><br>
                    <div class="ui-grid-a">
                        <div class="ui-block-a">
                            <p align="left"><a href="#"><font color="#8E9BB3"><i class="fa fa-3x fa-clock-o "></i></font></a></p>
                        </div>
                        <div class="ui-block-b">
                            <p align="right"><font color="#8E9BB3" size="4"><b>TE</b></font><br>
                                <font size="2" color="#8E9BB3">X2</font></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui-grid-solo">
                <div id="owl-demo2" class="owl-carousel owl-theme">
                    <div class="item">
                        <div class="jqm-block-content ui-responsive" style="margin: 2px 2px; padding: 8px 8px; background-image:url(images/bg/banner15.png); background-size:cover"><font color="#264C67"><b>欢迎使用iTMS</b></font><br>
                            <font size="1">通过丰富的小应用提升作业效率&nbsp;<i class="fa fa-commenting"></i></font><br>
                            <div class="ui-grid-a">
                                <div class="ui-block-a">
                                    <p align="left"><a href="driverindex.html" rel="external"><font color="#8E9BB3"><i class="fa fa-3x fa-hand-peace-o "></i></font></a></p>
                                </div>
                                <div class="ui-block-b">
                                    <p align="right"><font color="#8E9BB3" size="4"><b></b></font><br>
                                        <font color="#8E9BB3" size="2"></font></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="jqm-block-content ui-responsive" style="margin: 2px 2px; padding: 8px 8px; background-image:url(images/tweets-bg.jpg)"><font color="#264C67"><b>记录入场物流执行效率</b></font><br>
                            <font size="1">可以通过扫条码提升记录效率及准确性&nbsp;<i class="fa fa-search"></i></font><br>
                            <div class="ui-grid-a">
                                <div class="ui-block-a">
                                    <p align="left"><a href="driverindex.html" rel="external"><font color="#4D4D4D"><i class="fa fa-3x fa-qrcode "></i></font></a></p>
                                </div>
                                <div class="ui-block-b">
                                    <p align="right"><font color="#4D4D4D" size="4"><b><i class="fa fa-plug"></i></b></font><br>
                                        <font color="#4D4D4D" size="2">摄像头</font></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div data-role="popup" id="popupaction" data-theme="a" data-overlay-theme="a" style="min-width:320px">
        <div data-role="header" data-theme="a" class="ui-corner-top">
            <h1>预约信息</h1>
        </div>
        <div data-role="content">
            <p align="center">
            <p ><font size="3"><strong data-bind="text:selectedItem.appId"></strong></font></p>
            <p>车牌: <span data-bind="text:selectedItem.vehicleLicense"></span></p>
            <p>手机:<span data-bind="text:selectedItem.mobile"></span></p>
            <p>货量:<span data-bind="text:selectedItem.deliveryVolSum"></span></p>
            <p>计划日期:<span data-bind="text:selectedItem.planedDevelieryDate"></span></p>
            <p>计划时间段:<span data-bind="text:selectedItem.planedEarliestDevelieryDate"></span>-<span data-bind="text:selectedItem.planedLatestDevelieryDate"></span></p>
            <span data-bind="text:selectedItem.title"></span>
            <input type="time" name="arr_time" id="s_arrtime" data-bind="value:selectedItem.entryTime">
            <br>
            <p align="center">
                <button data-theme="a" data-icon="check" data-inline="true" data-bind="click:onEntry">登记</button>
                <button data-theme="a" data-icon="delete" data-inline="true" data-bind="click:closePopup">取消</button>
            </p>
            </p>
        </div>
    </div>
    <div data-role="panel" id="panelgrid" data-position-fixed="true" data-position="right" data-display="overlay" data-theme="a">
        <p align="center"><img class="popphoto" src="images/itmslogo1.png" height="20px" style="margin-bottom: 10px;"></p>
        <ul data-role="listview" data-inset="true" data-theme="b" class="ui-nodisc-icon ui-alt-icon">
            <li><a href="#" rel="external"> <img src="images/message.png" alt="plan" class="ui-li-icon"><font size="2">关于</font></a></li>
            <li><a href="helpsaic.html" rel="external"> <img src="images/unknown.png" alt="plan" class="ui-li-icon"><font size="2">使用帮助</font></a></li>
        </ul>
        <div class="ui-nodisc-icon ui-alt-icon">
            <p align="center"><a href="#" data-rel="close" class="ui-btn ui-shadow ui-corner-all ui-icon-back ui-btn-icon-notext ui-btn-inline" style="margin-right: 0px;">back</a></p>
        </div>
    </div>
    <div data-role="popup" id="popupMessage" data-overlay-theme="c" data-theme="c" style="max-width:600px;" class="ui-corner-all">
        <div data-role="content" data-theme="a" class="ui-corner-bottom ui-content">
            <p align="center"><i class="fa fa-2x fa-frown-o"></i></p>
            <p align="center"><a href="#" data-role="button" data-rel="back" data-transition="flow" data-theme="a">确定</a></p>
        </div>
    </div>
    <br>
    <p align="center">&nbsp;<a href="#"><img class="popphoto" src="images/bg/eorion-log.png" height="24"></a></p>

    <!-- /content -->

    <!-- /page -->
</div>
<style>
    #owl-demo .item img{
        display: block;
        width: 100%;
        height: auto;
    }
</style>
<style>
    #owl-demo2 .item img{
        display: block;
        width: 100%;
        height: auto;
    }
</style>
<script>
    $(document).ready(function() {

        var owl = $("#owl-demo");
        owl.owlCarousel({

            autoPlay : 5000,
            singleItem : true,
            autoHeight : true,
            pagination : false,
            transitionStyle : "fadeUp"
        });

        var owl = $("#owl-demo2");

        owl.owlCarousel({

            autoPlay : 6000,
            singleItem : true,
            autoHeight : true,
            pagination : false,
            transitionStyle : "goDown"
        });

    });
</script>
<script src="OWL/assets/js/bootstrap-collapse.js"></script>
<script src="OWL/assets/js/bootstrap-transition.js"></script>
<script src="OWL/assets/js/bootstrap-tab.js"></script>
<script src="OWL/assets/js/google-code-prettify/prettify.js"></script>
<script src="OWL/assets/js/application.js"></script>
<script>
// create the various view models
var entryManagementViewModel = new IMS.EntryManagementViewModel();
var entryManagementLoginViewModel = new IMS.EntryManagementLoginViewModel();
$(document).ready(function () {
    // bind each view model to a jQueryMobile page
    ko.applyBindings(entryManagementLoginViewModel, document.getElementById("logonView"));
    ko.applyBindings(entryManagementViewModel, document.getElementById("entryManagementView"));
    //entryManagementViewModel.init();

    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
        'scanQRCode'
    ]
});
});
</script>
</body>
</html>
