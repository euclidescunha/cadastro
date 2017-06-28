var fileUpload = function () {
    return {
        scope: {
            files: '='
        },
        link: function (scope, el, attrs) {
            var fileInput = el.find('input');

            el.bind('change', function (event) {
                scope.files = event.target.files;

                scope.$apply();

                resetFileInput();
            });

            el.bind('click', function (event) {
                event.stopPropagation();
            });

            function resetFileInput() {
                var parent = fileInput.parent();
                var accept = fileInput.prop('accept');

                fileInput.remove();
                var input = document.createElement("input");

                var attr = document.createAttribute("type");
                attr.nodeValue = "file";
                input.setAttributeNode(attr);

                var attr = document.createAttribute("accept");
                attr.nodeValue = accept;
                input.setAttributeNode(attr);

                attr = document.createAttribute("multiple");
                attr.nodeValue = "multiple";
                input.setAttributeNode(attr);

                fileInput = angular.element(input);

                parent.append(fileInput);
            }
        }
    };
}

app.directive('fileUpload', fileUpload);