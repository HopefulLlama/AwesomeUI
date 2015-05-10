angular.module('awesome.ui.chimichanga', [])
.directive('auChimichanga', [function () {
  return {
    restrict:'E',
    scope: {
      distance: '=',
      speed: '='
    },
    transclude: true,
    template: '<span class="chimichanga-content" ng-transclude></span>',
    link: function (scope, element, attrs) {
      scope.chimichangaContent = element[0].querySelector('.chimichanga-content');
      scope.chimichangaContent.style.display = "inline-block";
      scope.offset = 0;

      scope.chimichangaContent.style.position = "relative";
      scope.chimichangaContent.style.left = scope.offset + "px";

      scope.direction = 'left';

      var id = setInterval(function() {
        if(scope.direction == 'left') {
          if(scope.offset <= 0-scope.distance) {
            scope.direction = 'right';
          } else {
            scope.offset -= scope.speed;
          }
        } else if (scope.direction == 'right') {
          if(scope.offset >= scope.distance) {
            scope.direction = 'left';
          } else {
            scope.offset += scope.speed;
          }
        }
        scope.chimichangaContent.style.left = scope.offset + "px";
      }, 30);
    }
  };
}]);