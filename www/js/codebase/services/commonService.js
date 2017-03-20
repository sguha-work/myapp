services.service('CommonService', [function() {

    this.unsupportedCharectersForEmail = ["|", "&", "*", ",", "'", '"', "/", "\\", "(", ")", "{", "}", "[", "]", "?"];

    this.routeTo = (function(gotToUrl) {
        var presentURL = window.location.hash;

        window.location.href = gotToUrl;
    });

    this.showWarning = (function(element) {
        console.log(element.tagName.toLowerCase());
        switch (element.tagName.toLowerCase()) {
            case "input":
                $(element).parent().css({
                    "border": "2px solid red"
                });
                break;
        }
    });

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