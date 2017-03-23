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
            startAjaxCallAnimation,
            stopAjaxCallAnimation,
            ajaxCallAnimationTimer,
            showAjaxCallError,
            hideAjaxCallError,
            writeUserDataToDatabase,
            checkIfUserPhoneNumberExists,
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
            mailObject.subject = "Welcome to Life Your OTP is: " + userObject.otp.otp;
            mailObject.body = "<b>Congratulations!</b> </br> <b>Hello " + userObject.name.firstName + ", Welcome to LIFE.</b></br><p>Use the following OTP to complete join process</p></br><b>" + userObject.otp.otp + "</b>"
            console.log(mailObject);
            return CommonService.sendMail(mailObject);
        });

        startAjaxCallAnimation = (function() {
            var index = 1;
            ajaxCallAnimationTimer = window.setInterval(function() {
                if (index) {
                    index = 0;
                    $("#join-life").animate({
                        "opacity": "0.3"
                    }, 500);
                } else {
                    index = 1;
                    $("#join-life").animate({
                        "opacity": "1"
                    }, 500);
                }

            }, 500);

        });

        stopAjaxCallAnimation = (function() {
            $("#join-life").animate({
                "opacity": "1"
            }, 500);
            window.clearInterval(ajaxCallAnimationTimer);
        });

        showAjaxCallError = (function() {
            $("#join-life").find("#error_ajaxcall").show();
        });

        hideAjaxCallError = (function() {
            $("#join-life").find("#error_ajaxcall").hide();
        });

        writeUserDataToDatabase = (function(userData) {
            var dataObject = {};
            dataObject.type = "user-signup";
            dataObject.data = userData;
            return CommonService.writeDataToDatabase(dataObject);
        });

        checkIfUserPhoneNumberExists = (function(userData) {
            return CommonService.checkIfUserPhoneNumberExists();
        });

        $scope.joinLife = (function() {
            $("#join-life").find("#joinLife-button3").attr('disabled', 'disabled');
            startAjaxCallAnimation();
            if (valid()) {
                var userData = prepareUserData();
                checkIfUserPhoneNumberExists(userData).then(function(response) {
                    if (response.userExists) {
                        // user exists in database, showing move to sign in page message, disabling join button
                    } else {
                        // user is new, continuing join process
                        writeUserDataToPhoneMemory(userData).then(function() {
                            // writing data to phone memory success
                            sendOTPtoUserEmail(userData).then(function(data) {
                                // send mail success
                                console.log(data);
                                hideAjaxCallError();
                                writeUserDataToDatabase(userData).then(function() {
                                    // database writing done moving on to otp verification page
                                    hideAjaxCallError();
                                    stopAjaxCallAnimation();
                                    CommonService.routeTo('#/verify-otp');
                                }, function() {
                                    // database writing failed
                                    showAjaxCallError();
                                });
                            }, function(data) {
                                // send mail failed
                                stopAjaxCallAnimation();
                                showAjaxCallError();
                                console.log(data);
                            });
                        }, function() {
                            // writing data to phone memory failed
                            $("#joinLife-button3").removeAttr('disabled');
                        });
                    }
                }, function() {
                    // error in ajax error_ajaxcall
                    showAjaxCallError();
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