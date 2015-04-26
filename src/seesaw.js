angular.module('awesome.ui.seesaw', [])
.directive('auSeesaw', [function () {
  return {
    restrict:'E',
    scope: {
      speed: '=',
      rotationLimit: '='
    },
    transclude: true,
    template: '<span class="seesaw-content" ng-transclude></span>',
    link: function (scope, element, attrs) {
      scope.rotation = 0;
      scope.seesawContent = element[0].querySelector('.seesaw-content');
      scope.seesawContent.style.display = "inline-block";

      scope.rotationIncrementing = true;

      var id = setInterval(function() {
        if(scope.rotationIncrementing) {
          if(scope.rotation < scope.rotationLimit) {
            scope.rotation += scope.speed;
          } else {
            scope.rotationIncrementing = false;
          }
        } else {
          if(scope.rotation > (0-scope.rotationLimit)) {
            scope.rotation -= scope.speed;
          } else {
            scope.rotationIncrementing = true;
          }
        }
        scope.seesawContent.style.transform = "rotate("+scope.rotation+"deg)";
      }, 30);
    }
  };
}]);