services.service('JoinLifeService', ['$http', function($http) {

    this.writeUserDataToDatabse = (function(dataObject) {
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

}]);