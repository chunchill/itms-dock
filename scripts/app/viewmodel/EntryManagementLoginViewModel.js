/**
 * Created by jasperchiu on 10/4/15.
 */
/// <reference path="../../lib/knockout.mapping-latest.debug.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $, ko, undefined) {
    IMS.EntryManagementLoginViewModel = function () {
        var self = this;
        self.user = ko.observable();
        self.pwd = ko.observable();

        self.login = function () {
            var option = { user: self.user(), pwd: self.pwd() };
            //bind the delivery items
            IMS.datacontext.user.login(option).then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    sessionStorage.userInfo = JSON.stringify(result);
                    window.location.replace("entrymanagementIndex.php");
                }
                else $("#popupMessage").popup("open");

            }, function () {
                $("#popupMessage").popup("open");
            });
        };
    }
    return IMS.EntryManagementLoginViewModel;
})(window.IMS = window.IMS || {}, jQuery, ko, undefined);