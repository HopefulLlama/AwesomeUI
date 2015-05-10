angular.module('awesome.ui.flipper', [])
.directive('auFlipper', [function () {
  return {
    restrict:'E',
    scope: {
     refreshRate: '='
   },
   transclude: true,
   template: '<span class="flipper-content" ng-transclude></span>',
   link: function (scope, element, attrs) {
    scope.flipperContent = element[0].querySelector('.flipper-content');
    scope.flipperContent.style.display = "inline-block";

    scope.x = 1; 
    scope.y = 1;
    scope.flipperContent.setOffset = function(x, y) {
      scope.flipperContent.style.transform = "scale("+x+", "+y+")";
    };

    var id = setInterval(function() {
      if(scope.x == 1 && scope.y == 1) {
        scope.x = -1;
      } else if (scope.x == -1 && scope.y == 1) {
        scope.y = -1;
      } else if (scope.x == -1 && scope.y == -1) {
        scope.x = 1;
      } else if (scope.x == 1 && scope.y == -1) {
        scope.y = 1;
      } else {
        scope.x = 1;
        scope.y = 1;
      }
      scope.flipperContent.setOffset(scope.x, scope.y);
    }, scope.refreshRate);
  }
};
}]);