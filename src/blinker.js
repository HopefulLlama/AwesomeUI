angular.module('awesome.ui.blinker', [])
.directive('auBlinker', [function () {
  return {
    restrict:'E',
    scope: {
     refreshRate: '='
   },
   transclude: true,
   template: '<span class="blinker-content" ng-transclude></span>',
   link: function (scope, element, attrs) {
    scope.blinkerContent = element[0].querySelector('.blinker-content');
    scope.blinkerContent.style.display = "inline-block";
    var id = setInterval(function() {
      if(scope.blinkerContent.style.opacity != "1") {
        scope.blinkerContent.style.opacity = "1";
      } else {
        scope.blinkerContent.style.opacity = "0";
      }
    }, scope.refreshRate);
  }
};
}]);