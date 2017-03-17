controllers.controller('startCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location) {
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
                window.location.href = '#/login';
            });
        });
    }
]);