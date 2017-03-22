controllers.controller('joinLifeCtrl', ['$scope', '$stateParams', 'CommonService',
    function($scope, $stateParams, CommonService) {
        var valid,
            checkMobileNumber,
            checkEmail,
            validateUserName,
            validateUserPassword,
            writeUserDataToPhoneMemory,
            currentElement,
            prepareUserData,
            validateUserEmail,
            sendOTPtoUserEmail,
            validateUserMobileNumber;

        (function() {
            userInputErrorFlag = true;
            userInputMobileNumberErrorFlag = true;
        })();

        validateUserName = (function() {
            if ($scope.user_fullName && $scope.user_fullName.trim() !== "") {
                CommonService.hideWarning(document.getElementById("txt_userFullName"));
                return true;
            } else {
                CommonService.showWarning(document.getElementById("txt_userFullName"));
                return false;
            }
        });

        validateUserPassword = (function() {
            if ($scope.user_password && $scope.user_password.trim() !== "" && $scope.user_password.trim().length >= 5) {
                CommonService.hideWarning(document.getElementById("txt_userPassword"));
                return true;
            } else {
                CommonService.showWarning(document.getElementById("txt_userPassword"));
                return false;
            }
        });

        validateUserEmail = (function() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ($scope.user_email && $scope.user_email.trim() != "" && re.test($scope.user_email)) {
                CommonService.hideWarning(document.getElementById("txt_userEmail"));
                return true;
            } else {
                CommonService.showWarning(document.getElementById("txt_userEmail"));
                return false;
            }
        });

        validateUserMobileNumber = (function() {
            if ($scope.user_mobileNumber && $scope.user_mobileNumber.trim() != "" && !isNaN($scope.user_mobileNumber)) {
                CommonService.hideWarning(document.getElementById("txt_userMobileNumber"));
                return true;
            } else {
                CommonService.showWarning(document.getElementById("txt_userMobileNumber"));
                return false;
            }
        });

        valid = (function() {
            var inputErrorFlag;
            inputErrorFlag = false;

            inputErrorFlag = validateUserMobileNumber();
            inputErrorFlag = validateUserEmail();
            inputErrorFlag = validateUserName();
            inputErrorFlag = validateUserPassword();

            return inputErrorFlag;
        });

        prepareUserData = (function() {
            var userObject = {};
            userObject.otp = CommonService.getOTPForUser();
            userObject.name = {};
            userObject.name.firstName = $scope.user_fullName.split(" ")[0];
            userObject.name.lastName = $scope.user_fullName.split(" ").pop();
            userObject.name.fullName = $scope.user_fullName;
            userObject.email = $scope.user_email;
            userObject.mobileNumber = $scope.user_mobileNumber;
            userObject.password = $scope.user_password;
            console.log(JSON.stringify(userObject));
            return userObject;
        });

        writeUserDataToPhoneMemory = (function() {
            return new Promise(function(resolve, reject) {
                resolve();
            });
        });

        sendOTPtoUserEmail = (function(userObject) {
            var mailObject = {};
            mailObject.to = userObject.email;
            mailObject.otp = userObject.otp.otp;
            return CommonService.sendMail(mailObject);
        });

        $scope.joinLife = (function() {
            if (valid()) {
                var userData = prepareUserData();
                writeUserDataToPhoneMemory(userData).then(function() {
                    // writing data to phone memory success
                    sendOTPtoUserEmail(userData).then(function(data) {
                        // send mail success
                        console.log(data);
                    }, function(data) {
                        // send mail failed
                        console.log(data);
                    });
                }, function() {
                    // writing data to phone memory failed
                });
            }
        });

        $scope.setCurrentElement = (function(event) {
            currentElement = event.currentTarget;
        });

        $scope.emailCheckOnChange = (function() {
            var index,
                flag;
            index = 0;
            flag = 0;
            while (index < currentElement.value.length) {
                if (CommonService.supportedCharectersForEmail.indexOf(currentElement.value[index].toLowerCase()) === -1) {
                    flag = 1;
                    break;
                }
                index++;
            }
            if (flag) {
                CommonService.showWarning(currentElement);
            } else {
                CommonService.hideWarning(currentElement);
            }
        });

        $scope.mobileNumberCheckOnChange = (function() {
            if (isNaN(currentElement.value)) {
                CommonService.showWarning(currentElement);
            } else {
                CommonService.hideWarning(currentElement);
            }
        });


    }
]);