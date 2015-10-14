/// <reference path="../../lib/knockout.debug-3.0.0.js" />
(function (IMS, $, wx,undefined) {
    IMS.EntryManagementViewModel = function () {
        var self = this;
        self.alreadyEntryItems = ko.observableArray();//status:3
        self.alreadyArrivedItems = ko.observableArray();//status:2
        self.onWayItems = ko.observableArray();//status:1
        self.selectedItem = {
            appId: ko.observable(),
            status: ko.observable(),
            title: ko.observable("title"),
            entryTime: ko.observable(),
            dock: ko.observable(),
            vehicleLicense: ko.observable(),
            mobile: ko.observable(),
            deliveryVolSum: ko.observable(),
            planedDevelieryDate: ko.observable(),
            planedEarliestDevelieryDate: ko.observable(),
            planedLatestDevelieryDate: ko.observable()
        };

        function addStatus(items, status) {
            items.forEach(function (item) {
                item.status = status;
            });
        }

        //using this function to covert a plain object to an observable object
        var convertToObservable = function (list) {
            var newList = [];
            $.each(list, function (i, obj) {
                var newObj = {};
                Object.keys(obj).forEach(function (key) {
                    newObj[key] = ko.observable(obj[key]);
                });
                newList.push(newObj);
            });
            return newList;
        }

        var addTimelineForItem = function (option) {
            IMS.datacontext.appointment.addAppTimeline(option).then(function (result) {
                if (result.errorMessage !== '') {
                    $("#popupaction").popup("close");
                }
            }, function () {
                $("#popupMessage").popup("open");
            });
        };



        self.onEntry = function (item) {
            var date = new Date();
            var today = moment(date).format("YYYY-MM-DD");
            var now = moment(date).format("HH:mm:ss");
            var newStatusDescription = '';
            switch (self.selectedItem.status()) {
                case 1:
                    newStatusDescription = '2';
                    break;
                case 2:
                    newStatusDescription = '3';
                    break;
                case 3:
                    newStatusDescription = '4';
                    break;
            }
            var option = { dock: self.selectedItem.dock(), appId: self.selectedItem.appId(), newStatusDescription: newStatusDescription, date: today, time: $("#s_arrtime").val() + ':00' };
            IMS.datacontext.appointment.addAppTimeline(option).then(function (result) {
                if (result.errorMessage !== '') {
                    //self.init();
                    $.when(IMS.datacontext.appointment.getOnWayAppointments(), IMS.datacontext.appointment.getAlreadyArrivedAppointments(), IMS.datacontext.appointment.getAlreadyEntryAppointments()).done(function (result1, result2, result3) {
                        if (result1[0] !== undefined && result1[0].errorMessage !== 'NO_DATA') {
                            ko.utils.arrayForEach(result1[0], function (item) {
                                item.driverName = decodeURI(item.driverName);
                                item.vehicleType = decodeURI(item.vehicleType);
                                item.vehicleLicense = decodeURI(item.vehicleLicense);
                            })
                            addStatus(result1[0], 1);
                            var list = convertToObservable(result1[0]);
                            self.onWayItems(list);
                        }

                        if (result2[0] !== undefined && result2[0].errorMessage !== 'NO_DATA') {
                            ko.utils.arrayForEach(result2[0], function (item) {
                                item.driverName = decodeURI(item.driverName);
                                item.vehicleType = decodeURI(item.vehicleType);
                                item.vehicleLicense = decodeURI(item.vehicleLicense);
                            })
                            addStatus(result2[0], 2);
                            var list = convertToObservable(result2[0]);
                            self.alreadyArrivedItems(list);
                        }

                        if (result3[0] !== undefined && result3[0].errorMessage !== 'NO_DATA') {
                            ko.utils.arrayForEach(result3[0], function (item) {
                                item.driverName = decodeURI(item.driverName);
                                item.vehicleType = decodeURI(item.vehicleType);
                                item.vehicleLicense = decodeURI(item.vehicleLicense);
                            })
                            addStatus(result3[0], 3);
                            var list = convertToObservable(result3[0]);
                            self.alreadyEntryItems(list);
                        }


                        $("#popupaction").popup("close");
                    });
                }
            }, function () {
                $("#popupMessage").popup("open");
            });


        };

        //--public functions
        self.itemClicked = function (item) {
            if (item === undefined) return;
            self.selectedItem.appId(item.applicationId());
            self.selectedItem.status(item.status());
            self.selectedItem.dock(item.dock());
            self.selectedItem.vehicleLicense(item.vehicleLicense());
            self.selectedItem.mobile(item.mobile());
            self.selectedItem.deliveryVolSum(item.deliveryVolSum());
            self.selectedItem.planedDevelieryDate(item.planedDevelieryDate());
            self.selectedItem.planedEarliestDevelieryDate(item.planedEarliestDevelieryDate());
            self.selectedItem.planedLatestDevelieryDate(item.planedLatestDevelieryDate());
            switch (self.selectedItem.status()) {
                case 3:
                    self.selectedItem.title('登记出场时间');
                    break;
                case 2:
                    self.selectedItem.title('登记入场时间');
                    break;
                case 1:
                    self.selectedItem.title('登记到达时间');
                    break;
                default: break;
            }
            $("#popupaction").popup("open");

        };

        self.getSummaryCount = function () {

        }

        self.closePopup = function () {
            $("#popupaction").popup("close");
        };


        function qrcodeScanner(i){
            //如果要抓ListView的filter，如果是页面上的第一个就按照下面这样写，类似第二个就是.eq(1)
            if(typeof(cordova)!=='undefined'){
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $("input[data-type='search']").eq(i).val(result.text);
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                );
            }else{
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        $("input[data-type='search']").eq(i).val(result);
                        $("input[data-type='search']").eq(i).keyup();
                    }
                });
            }
        }

        self.scanOnTheWayList = function() {
            qrcodeScanner(0);

        };

        self.scanAlreadyArrivedList = function(){
            qrcodeScanner(1);
        };

        self.scanAlreadyEntryList = function(){
            qrcodeScanner(2);
        };


        self.init = function () {
            IMS.datacontext.appointment.getOnWayAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    ko.utils.arrayForEach(result, function (item) {
                        item.driverName = decodeURI(item.driverName);
                        item.vehicleType = decodeURI(item.vehicleType);
                        item.vehicleLicense = decodeURI(item.vehicleLicense);
                    })
                    addStatus(result, 1);
                    var list = convertToObservable(result);
                    self.onWayItems(list);
                }
            });

            IMS.datacontext.appointment.getAlreadyArrivedAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    ko.utils.arrayForEach(result, function (item) {
                        item.driverName = decodeURI(item.driverName);
                        item.vehicleType = decodeURI(item.vehicleType);
                        item.vehicleLicense = decodeURI(item.vehicleLicense);
                    })
                    addStatus(result, 2);
                    var list = convertToObservable(result);
                    self.alreadyArrivedItems(list);
                }
            });

            IMS.datacontext.appointment.getAlreadyEntryAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    ko.utils.arrayForEach(result, function (item) {
                        item.driverName = decodeURI(item.driverName);
                        item.vehicleType = decodeURI(item.vehicleType);
                        item.vehicleLicense = decodeURI(item.vehicleLicense);
                    })
                    addStatus(result, 3);
                    var list = convertToObservable(result);
                    self.alreadyEntryItems(list);
                }
            });
        }
    }
    return IMS.EntryManagementViewModel;
})(window.IMS = window.IMS || {},jQuery,wx);
