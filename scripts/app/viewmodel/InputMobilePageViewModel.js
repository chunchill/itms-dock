/// <reference path="../mock/data.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $,undefined) {
    IMS.InputMobilePageViewModel = function () {
        var self = this;
        self.mobileNumber = ko.observable('');

        //--public functions
        self.submit = function () {
            var mobile = self.mobileNumber();
            setInterval(function(){myreservationModel.init(mobile)},5000);
            reservationDetailModel.disableSubmit(false);
            $.mobile.changePage("#myReservationView",{transition:"none"});
        };
    }
    return IMS.InputMobilePageViewModel;
})(window.IMS = window.IMS || {}, jQuery);

