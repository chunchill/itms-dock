/**
 * Created by jasperchiu on 10/14/15.
 */
// create the various view models
var entryManagementLoginViewModel = new IMS.EntryManagementLoginViewModel();
$(document).ready(function () {
    // bind each view model to a jQueryMobile page
    ko.applyBindings(entryManagementLoginViewModel, document.getElementById("logonView"));
});
