controllers.controller('verifyOtpCtrl', ['$scope', '$rootScope', 'JoinLifeService',

    function($scope, $rootScope, JoinLifeService) {
        var otpObject,
            sendOTPtoUserEmail,
            showAjaxCallError,
            hideAjaxCallError;
        $scope.userObject = $rootScope.userObject;
        delete $rootScope.userObject;
        otpObject = userObject.otp;
        $scope.email = userObject.email;

        sendOTPtoUserEmail = (function(userObject) {
            var mailObject = {};
            mailObject.to = userObject.email;
            mailObject.otp = userObject.otp.otp;
            mailObject.subject = "Welcome to Life Your OTP is: " + userObject.otp.otp;

            mailObject.body = "<b>Congratulations!</b> </br> <b>Hello " + userObject.name.firstName + ", Welcome to LIFE.</b></br><p>Use the following OTP to complete join process</p></br><b>" + userObject.otp.otp + "</b>"

            return JoinLifeService.sendMail(mailObject);
        });

        showAjaxCallError = (function() {
            $("#join-life").find("#error_ajaxcall").show();
            $("#join-life").find("#joinLife-button3").removeAttr('disabled');
        });

        hideAjaxCallError = (function() {
            $("#join-life").find("#error_ajaxcall").hide();
        });

        $scope.verifyOTP = (function() {
            alert($scope.otp);
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