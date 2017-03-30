controllers.controller('changePasswordCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('chatCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('chatListCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('editProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('friendsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('imageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('joinLifeCtrl', ['$scope', '$stateParams', 'CommonService', 'JoinLifeService',

    function($scope, $stateParams, CommonService, JoinLifeService) {
        var valid,
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

            return userObject;
        });

        writeUserDataToPhoneMemory = (function(userData) {
            return JoinLifeService.writeUserDataToPhoneMemory(userData);
        });

        sendOTPtoUserEmail = (function(userObject) {
            var mailObject = {};
            mailObject.to = userObject.email;
            mailObject.otp = userObject.otp.otp;
            mailObject.subject = "Welcome to Life Your OTP is: " + userObject.otp.otp;
            mailObject.body = "<b>Congratulations!</b> </br> <b>Hello " + userObject.name.firstName + ", Welcome to LIFE.</b></br><p>Use the following OTP to complete join process</p></br><b>" + userObject.otp.otp + "</b>"

            return JoinLifeService.sendMail(mailObject);
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
            $("#join-life").find("#joinLife-button3").removeAttr('disabled');
        });

        hideAjaxCallError = (function() {
            $("#join-life").find("#error_ajaxcall").hide();
        });

        writeUserDataToDatabase = (function(userData) {
            var dataObject = {};
            dataObject.type = "user-signup";
            dataObject.data = userData;
            return JoinLifeService.writeUserDataToDatabase(dataObject);
        });

        checkIfUserPhoneNumberExists = (function(userData) {
            return JoinLifeService.checkIfUserPhoneNumberExists();
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
                            writeUserDataToDatabase(userData).then(function(data) {
                                // writing to database success 
                                hideAjaxCallError();
                                sendOTPtoUserEmail(userData).then(function() {
                                    // send mail success moving on to otp verification page
                                    hideAjaxCallError();
                                    stopAjaxCallAnimation();
                                    CommonService.routeTo('#/verify-otp');
                                }, function() {
                                    // sending mail failed
                                    showAjaxCallError();
                                });
                            }, function(data) {
                                // writing to database failed
                                stopAjaxCallAnimation();
                                showAjaxCallError();

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
controllers.controller('loadingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('pageListCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('reactionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('shareImageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('shareLocationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('startCtrl', ['$scope', '$stateParams', 'CommonService',
    function($scope, $stateParams, CommonService) {
        var animate,
            checkForUserAvailabilityFile;

        animate = (function() {
            return new Promise(function(resolve, reject) {

                var counter,
                    interval;

                counter = 1;
                interval = window.setInterval(function() {
                    if (counter > 10) {
                        window.clearInterval(interval);
                        resolve();
                    } else {
                        counter += 1;
                        if (counter % 2 == 0) {
                            $("#page_start img").animate({
                                opacity: 0.5
                            }, 500);
                        } else {
                            $("#page_start img").animate({
                                opacity: 1
                            }, 500);
                        }
                    }
                }, 500)
            });
        });

        checkForUserAvailabilityFile = (function() {
            return new Promise(function(resolve, reject) {
                reject();
            });
        });

        animate().then(function() {
            checkForUserAvailabilityFile().then(function() {
                window.location.href = '#/home';
            }, function() {
                CommonService.routeTo('#/login');
            });
        });
    }
]);
controllers.controller('updateStatusCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
]);
controllers.controller('verifyOtpCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function($scope, $stateParams) {


    }
]);