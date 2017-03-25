angular.module('awesome.ui.spinner', [])
.directive('auSpinner', [function () {
  return {
    restrict:'E',
    scope: {
      direction: '=',
      speed: '='
    },
    transclude: true,
    template: '<span class="spinner-content" ng-transclude></span>',
    link: function (scope, element, attrs) {
      var DIRECTION = {
        CLOCKWISE: "clockwise",
        ANTI_CLOCKWISE: "anti-clockwise"
      };

      scope.rotation = 0;
      scope.spinnerContent = element[0].querySelector('.spinner-content');
      scope.spinnerContent.style.display = "inline-block";

      var id = setInterval(function() {
        if(scope.direction == DIRECTION.CLOCKWISE) {
          if(scope.rotation >= 360) {
            scope.rotation = 0;
          }
          scope.rotation += scope.speed;
        } else if (scope.direction == DIRECTION.ANTI_CLOCKWISE) {
          if(scope.rotation <= -360) {
            scope.rotation = 0;
          }
          scope.rotation -= scope.speed;
        } 
        
        scope.spinnerContent.style.transform = "rotate("+scope.rotation+"deg)";
      }, 30);
    }
  };
}]);