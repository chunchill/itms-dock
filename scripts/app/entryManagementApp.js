// create the various view models
var entryManagementViewModel = new IMS.EntryManagementViewModel();
var entryManagementLoginViewModel = new IMS.EntryManagementLoginViewModel();
$(document).ready(function () {
    // bind each view model to a jQueryMobile page
    ko.applyBindings(entryManagementLoginViewModel, document.getElementById("logonView"));
    ko.applyBindings(entryManagementViewModel, document.getElementById("entryManagementView"));
    //entryManagementViewModel.init();
});




