define(['services/config', 'services/base64Services'], function (config, base64) {

    var userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var userName = userInfo.userName;
    var password = userInfo.password;
    //var userId = userInfo.userID;


    var init = function () {
        var auth = 'Basic ' + base64.encode(userName + ':' + password);
        amplify.request.define('EOQuickSearchMobile', 'ajax', {
            url: config.baseUrl + "EO/EOQuickSearchMobile",
            dataType: 'json',
            type: 'POST',
            beforeSend: function (data) {
                data.setRequestHeader("Authorization", auth);
                return true;
            }
        });

        amplify.request.define('EOItemLocationSearch', 'ajax', {
            url: config.baseUrl + "EO/EOItemLocationSearch",
            dataType: 'json',
            type: 'POST',
            beforeSend: function (data) {
                data.setRequestHeader("Authorization", auth);
                return true;
            }
        });
        amplify.request.define('EOItemEventLocationSearch', 'ajax', {
            url: config.baseUrl + "EO/EOItemEventLocationSearch",
            dataType: 'json',
            type: 'POST',
            beforeSend: function (data) {
                data.setRequestHeader("Authorization", auth);
                return true;
            }
        });
        amplify.request.define('EOItemRoutePathSearch', 'ajax', {
            url: config.baseUrl + "EO/EOItemRoutePathSearch",
            dataType: 'json',
            type: 'POST',
            beforeSend: function (data) {
                data.setRequestHeader("Authorization", auth);
                return true;
            }
        });

        

    },

      defferRequest = function (resourceId, option) {
          return $.Deferred(function (dfd) {
              amplify.request({
                  resourceId: resourceId,
                  data: option,
                  success: dfd.resolve,
                  error: dfd.reject

              });
          }).promise();
      },

      eoQuickSearch = function (type, project) {
          var param = {
              SerType: 'AND',
              EO: [''],
              EOStatus: [''],
              eventstatus: [''],
              EOType: [''],
              EOTRType: [''],
              EOTag: [''],
              EOTRVendor1: [''],
              EOTRVendor2: [''],
              EOTRVendor3: [''],
              customerOrder1: [''],
              customerOrder2: [''],
              customerOrder3: [''],
              VendorOrder1: [''],
              VendorOrder2: [''],
              VendorOrder3: [''],
              reqDelDate1: '',
              reqDelDate2: '',
              reqDelDate3: '',
              reqDelDate4: '',
              ScheduleVendor1: '',
              ScheduleClass1: '',
              DepDate1: '',
              ArrDate1: '',
              DepTime1: '',
              Arrtime1: '',
              DeliverBP1: [''],
              DeliverBP2: '',
              depCustomer: '',
              depLocCode: '',
              ERTag: '',
              MesUnit1: '',
              reqDelDate: '',
              dep_Country: '',
              dep_State: '',
              dep_City: '',
              dep_Disc: '',
              dep_Group1: '',
              dep_Group2: '',
              rec_Country: '',
              rec_State: '',
              rec_City: '',
              rec_Disc: '',
              rec_Group1:'',
              rec_Group2: '',
              transDriverID: "",
              statusGroup: type,
              project: project,
              reqDelDate1S :"",
              reqDelDate1E :"",
              reqDelDate2S :"",
              reqDelDate2E :"",
              reqDelDate3S :"",
              reqDelDate3E :"",
              reqDelDate4S :"",
              reqDelDate4E :"",
              DepDate2 :"",
              DepDate3 :"",
              DepDate1S :"",
              DepDate1E :"",
              DepDate2S :"",
              DepDate2E :"",
              DepDate3S :"",
              DepDate3E :"",
              DepDate1act :"",
              DepDate2act :"",
              DepDate3act :"",
              DepDate1actS :"",
              DepDate1actE :"",
              DepDate2actS :"",
              DepDate2actE :"",
              DepDate3actS :"",
              DepDate3actE :"",
              ArrDate2 :"",
              ArrDate3 :"",
              ArrDate1S :"",
              ArrDate1E :"",
              ArrDate2S :"",
              ArrDate2E :"",
              ArrDate3S :"",
              ArrDate3E :"",
              ArrDate1act :"",
              ArrDate2act :"",
              ArrDate3act :"",
              ArrDate1actS :"",
              ArrDate1actE :"",
              ArrDate2actS :"",
              ArrDate2actE :"",
              ArrDate3actS :"",
              ArrDate3actE :""

          };

          return defferRequest('EOQuickSearchMobile', param);
      };

    var organizeResult = function (arr) {
        arr = arr.map(function (item) {
            if (item.erItem.routeClassID == null) item.erItem.routeClassID = "";
            if (item.erHead.reqDelDate == null) item.erHead.reqDelDate = "";
            var index = item.erHead.reqDelDate.indexOf(" ");
            if (index >= 0)
                item.erHead.reqDelDate = item.erHead.reqDelDate.substring(0, index);
            if (item.erItem.routeClassTimeS == null) item.erItem.routeClassTimeS = "";
            if (item.erItem.routeClassTimeE == null) item.erItem.routeClassTimeE = "";
            if (item.depCustomerDesc == null) item.depCustomerDesc = "";


            if (item.erHead.depCountry == null) item.erHead.depCountry = "";
            if (item.erHead.depState == null) item.erHead.depState = "";
            if (item.erHead.depCity == null) item.erHead.depCity = "";
            if (item.erHead.depDisc == null) item.erHead.depDisc = "";

            if (item.erHead.recCountry == null) item.erHead.recCountry = "";
            if (item.erHead.recState == null) item.erHead.recState = "";
            if (item.erHead.recCity == null) item.erHead.recCity = "";
            if (item.erHead.recDisc == null) item.erHead.recDisc = "";
            if (item.recCustomerDesc == null) item.recCustomerDesc = "";

            if (item.erItem.resAmtCS1 == null) item.erItem.resAmtCS1 = "";
            if (item.erItem.resAmt1 == null) item.erItem.resAmt1 = "";
            if (item.erItem.resAmtCS2 == null) item.erItem.resAmtCS2 = "";
            if (item.erItem.resAmt2 == null) item.erItem.resAmt2 = "";
            if (item.erItem.resAmtCS3 == null) item.erItem.resAmtCS3 = "";
            if (item.erItem.resAmt3 == null) item.erItem.resAmt3 = "";

            if (item.eritnstatusDesc == null) item.eritnstatusDesc = "";
            if (item.erHead.customerOrder1 == null) item.erHead.customerOrder1 = "";
            if (item.erHead.customerOrder2 == null) item.erHead.customerOrder2 = "";

            return {
                "routeClassID": item.erItem.routeClassID,
                "eo": item.dn.eo,
                "erID": item.erHead.erID,
                "erITN": item.erItem.pk.erITN,
                "reqDelDate": item.erHead.reqDelDate,
                "routeClassTimeS": item.erItem.routeClassTimeS,
                "routeClassTimeE": item.erItem.routeClassTimeE,
                "depCustomerDesc": item.depCustomerDesc,
                "depLocation": item.erHead.depCountry + item.erHead.depState + item.erHead.depCity + item.erHead.depDisc,
                "recLocation": item.erHead.recCountry + item.erHead.recState + item.erHead.recCity + item.erHead.recDisc,
                "recCustomerDesc": item.recCustomerDesc,
                "resAmtDesc1": (item.erItem.resAmtCS1 && item.erItem.resAmt1) ? (item.erItem.resAmtCS1 + ":" + item.erItem.resAmt1) : "",
                "resAmtDesc2": (item.erItem.resAmtCS2 && item.erItem.resAmt2) ? (item.erItem.resAmtCS2 + ":" + item.erItem.resAmt2) : "",
                "resAmtDesc3": (item.erItem.resAmtCS3 && item.erItem.resAmt3) ? (item.erItem.resAmtCS3 + ":" + item.erItem.resAmt3) : "",
                "eritnstatusDesc": item.eritnstatusDesc,
                "customerOrder1": item.erHead.customerOrder1,
                "customerOrder2": item.erHead.customerOrder2
            };

        });

        var result = [];

        arr.forEach(function (item) {
            var find = result.filter(function (temp) {
                return temp.routeClassID == item.routeClassID;
            });
            if (find.length == 0) {
                result.push(
                   {
                       "routeClassID": item.routeClassID,
                       "items": [item]
                   }
                );
            } else {
                find[0].items.push(item);
            }



        });


        result = result.sort(function (a, b) {
            return a.routeClassID.localeCompare(b.routeClassID);
        });

        var count = 0;
        var items = [];
        result.forEach(function (sum) {
            items.push({
                "routeClassID": sum.routeClassID,
                "length": sum.items.length,
                "isSum": true,
                "eo": "",
                "erID": "",
                "erITN": "",
                "reqDelDate": "",
                "routeClassTimeS": "",
                "routeClassTimeE": "",
                "depCustomerDesc": "",
                "depLocation": "",
                "recLocation": "",
                "recCustomerDesc": "",
                "resAmtDesc1": "",
                "resAmtDesc2": "",
                "resAmtDesc3": "",
                "eritnstatusDesc": "",
                "customerOrder1": "",
                "customerOrder2": ""
            });

            sum.items.forEach(
               function (temp) {
                   $.extend(temp, { "isSum": false, "length": 1 });
               }
            );

            items = items.concat(sum.items);
            count += sum.items.length;
        });

        return items;

    };

    var getLocation = function (option) {
        $.extend(option, { S: ["S1"], E: ["E1"] });
        return defferRequest('EOItemLocationSearch', option);
    };


    var getEventLocation = function (option) {
        return defferRequest('EOItemEventLocationSearch', option);
    };


    var getRoutePath = function (option) {
        $.extend(option, { S: ["S1"], E: ["E1"] });
        return defferRequest('EOItemRoutePathSearch', option);
    };

    init();

    return {
        eoQuickSearch: eoQuickSearch,
        organizeResult: organizeResult,
        getLocation: getLocation,
        getEventLocation: getEventLocation,
        getRoutePath:getRoutePath,
        defaultItem: function () {
            return {
                "routeClassID": "",
                "length": "",
                "isSum": true,
                "eo": "",
                "erID": "",
                "erITN": "",
                "reqDelDate": "",
                "routeClassTimeS": "",
                "routeClassTimeE": "",
                "depCustomerDesc": "",
                "depLocation": "",
                "recLocation": "",
                "recCustomerDesc": "",
                "resAmtDesc1": "",
                "resAmtDesc2": "",
                "resAmtDesc3": "",
                "eritnstatusDesc": "",
                "customerOrder1": "",
                "customerOrder2": ""
            };
        },
        mapObservable: function (item, obj) {
            if (!obj)
                obj = this.defaultItem();
            var data = ko.toJS(obj);

            Object.keys(data).forEach(function (key) {

                if (ko.isObservable(item[key])) {
                    item[key](data[key]);
                }
                else
                    item[key] = ko.observable(data[key]);
            });

            return item;
        }
    };
});