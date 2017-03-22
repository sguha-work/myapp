services.factory('CommonFactory', [function() {

}])
services.service('CommonService', ['$http', function($http) {

    this.supportedCharectersForEmail = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "_", "-", "."];

    this.sendMail = (function(mailObject) {
        return new Promise(function(resolve, reject) {
            $http({
                method: "POST",
                url: "https://goesonlife.000webhostapp.com/api/sendOTP.php",
                data: mailObject
            }).then(function(response) {
                resolve(response);
            }, function(response) {
                reject(response);
            });
        });
    });

    /**
     * @desc: This method takes the responsibility to route to a page
     */
    this.routeTo = (function(gotToUrl) {
        var presentURL = window.location.hash;

        window.location.href = gotToUrl;
    });

    /**
     * @desc: This method show warning based on perticular input field
     */
    this.showWarning = (function(element) {
        switch (element.tagName.toLowerCase()) {
            case "input":
                $(element).parent().css({
                    "border": "2px solid red"
                });
                break;
        }
    });

    /**
     * @desc: This method hide warning based on perticular input field
     */
    this.hideWarning = (function(element) {
        switch (element.tagName.toLowerCase()) {
            case "input":
                $(element).parent().css({
                    "border": "2px solid #43DB57"
                });
                break;
        }
    });

    this.getOTPForUser = (function() {
        var otp = {};
        otp.validFrom = Date.now();
        otp.validTo = Date.now() + 300000;
        otp.otp = (Date.now() * Math.random() * 10000) % 100000;
        otp.verfied = false;
        return otp;
    });

}]);