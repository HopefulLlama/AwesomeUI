angular.module('awesome.ui.marquee', [])
.directive('auMarquee', [function () {
  return {
    restrict:'E',
    scope: {
      direction: '=',
      speed: '='
    },
    link: function (scope, element, attrs) {
      scope.offset = 0;

      element.context.style.position = "relative";
      element.context.style.left = scope.offset + "px";
      scope.originalOffset = element[0].getBoundingClientRect().left;

      var id = setInterval(function() {
        if(scope.direction == 'right') {
          if(element[0].getBoundingClientRect().left >= window.innerWidth) {
            element.context.style.left = "0px";
            scope.originalOffset = element[0].getBoundingClientRect().left;
            scope.offset = 0 - scope.originalOffset - element.width();
          }
          scope.offset += scope.speed;
        } else if (scope.direction == 'left') {
          if(element[0].getBoundingClientRect().left <= 0 - element.width()) {
            element.context.style.left = "0px";
            scope.originalOffset = element[0].getBoundingClientRect().left;
            scope.offset = window.innerWidth - scope.originalOffset;
          }
          scope.offset -= scope.speed;
        }	
        element.context.style.left = scope.offset + "px";
      }, 30);
    }
  };
}]);