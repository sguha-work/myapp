controllers.controller('joinLifeCtrl', ['$scope', '$stateParams', 'CommonService',
    function($scope, $stateParams, CommonService) {
        var validation,
            checkMobileNumber,
            checkEmail,
            prepareUserObjectToSignIn,
            callSendMailAPI,
            currentElement;

        validation = (function() {

        });

        $scope.joinLife = (function() {

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