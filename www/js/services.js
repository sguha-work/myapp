services.factory('CommonFactory', [function() {

}])
services.service('CommonService', ['$http', function($http) {

    this.supportedCharectersForEmail = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "_", "-", "."];

    var joinLife,
        isResponseContainServerError;



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
services.service('JoinLifeService', ['$http', function($http) {

    var isResponseContainServerError;

    isResponseContainServerError = (function(data) {
        if (data.indexOf('Fatal error') > -1 || data.indexOf("Warning") > -1) {
            return true;
        } else {
            return false;
        }
    });

    this.writeUserDataToDatabase = (function(dataObject) {
        return new Promise(function(resolve, reject) {
            console.log("signup service " + JSON.stringify(dataObject));
            $.ajax({
                method: "POST",
                url: "https://goesonlife.000webhostapp.com/api/signup.php",
                data: dataObject,
                success: function(data) {
                    if (isResponseContainServerError(data)) {
                        reject(data);
                    } else {
                        resolve(data);
                    }
                },
                error: function(data) {
                    reject(data);
                }
            });
        });
    });

    /**
     * @desc: This method checks wheather the user phone number exists in datbase or not
     */
    this.checkIfUserPhoneNumberExists = (function() {
        return new Promise(function(resolve, reject) {
            resolve({ userExists: false });
        });
    });

    /**
     * @desc: This method take the responsibility to send the otp mail
     */
    this.sendMail = (function(mailObject) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                method: "POST",
                url: "https://goesonlife.000webhostapp.com/api/sendOTP.php",
                data: mailObject,
                success: function(data) {
                    resolve(data);
                },
                error: function(data) {
                    reject(data);
                }
            });
        });
    });

    this.writeUserDataToPhoneMemory = (function(userData) {
        return new Promise(function(resolve, reject) {
            resolve();
        });
    });

}]);