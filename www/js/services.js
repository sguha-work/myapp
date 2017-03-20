services.factory('CommonFactory', [function() {

}])
services.service('CommonService', [function() {

    this.supportedCharectersForEmail = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "_", "-", "."];

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

}]);