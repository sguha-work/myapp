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
            console.log(services);
            checkForUserAvailabilityFile().then(function() {
                window.location.href = '#/home';
            }, function() {
                CommonService.routeTo('#/login');
            });
        });
    }
]);