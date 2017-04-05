controllers.controller('verifyOtpCtrl', ['$scope', '$rootScope', 'JoinLifeService', 'CommonService', 'VerifyOtpService',

    function($scope, $rootScope, JoinLifeService, CommonService, VerifyOtpService) {

        var otpObject,
            sendOTPtoUserEmail,
            showAjaxCallError,
            hideAjaxCallError,
            startAjaxCallAnimation,
            stopAjaxCallAnimation;

        $scope.userObject = $rootScope.userObject;
        $scope.userObject = Object.assign({}, $rootScope.userObject);
        delete $rootScope.userObject;
        otpObject = $scope.userObject.otp;
        $scope.email = $scope.userObject.email;

        sendOTPtoUserEmail = (function(userObject) {
            var mailObject = {};
            mailObject.to = userObject.email;
            mailObject.otp = otpObject = CommonService.getOTPForUser;
            mailObject.subject = "Welcome to Life Your OTP is: " + userObject.otp.otp;

            mailObject.body = "<b>Congratulations!</b> </br> <b>Hello " + userObject.name.firstName + ", Welcome to LIFE.</b></br><p>Use the following OTP to complete join process</p></br><b>" + userObject.otp.otp + "</b>"

            return JoinLifeService.sendMail(mailObject);
        });

        showAjaxCallError = (function() {
            $("#verify-otp").find("#error_ajaxcall").show();
            $("#verify-otp").find("#verifyOtp-submit").removeAttr('disabled');
        });

        hideAjaxCallError = (function() {
            $("#verify-otp").find("#error_ajaxcall").hide();
        });

        $scope.verifyOTP = (function() {
            alert($scope.otp);
            if ($scope.otp.trim() === $scope.userObject.otp.otp && $scope.userObject.otp.validTo < Date.now()) {
                // congratulation otp verified
                // calling service api to update the user database
                $("#verify-otp").find("#error_wrongOtp").hide();
                VerifyOtpService.updateUserDatabaseAsOtpVerified(userObject.email).then(function() {
                    // if user database updatin done
                    CommonService.routeTo('#/login');
                }, function() {
                    // if user database updation failed
                });;
            } else {
                $("#verify-otp").find("#error_wrongOtp").show();
            }

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

        $scope.resendOTP = (function() {
            sendOTPtoUserEmail($scope.userObject).then(function() {
                hideAjaxCallError();
            }, function() {
                showAjaxCallError();
            });
        });
    }
]);