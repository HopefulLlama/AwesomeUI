angular.module('awesome.ui.marquee', [])
.directive('auMarquee', [function () {
  return {
    restrict:'E',
    scope: {
      direction: '=',
      speed: '='
    },
    transclude: true,
    template: '<span class="marquee-content" ng-transclude></span>',
    link: function (scope, element, attrs) {
      scope.marqueeContent = element[0].querySelector('.marquee-content');

      scope.offset = 0;

      scope.marqueeContent.style.position = "relative";
      scope.marqueeContent.style.left = scope.offset + "px";
      scope.originalOffset = scope.marqueeContent.getBoundingClientRect().left;

      var id = setInterval(function() {
        if(scope.direction == 'right') {
          if(scope.marqueeContent.getBoundingClientRect().left >= window.innerWidth) {
            scope.marqueeContent.style.left = "0px";
            scope.originalOffset = scope.marqueeContent.getBoundingClientRect().left;
            scope.offset = 0 - scope.originalOffset - scope.marqueeContent.getBoundingClientRect().width;
          }
          scope.offset += scope.speed;
        } else if (scope.direction == 'left') {
          if(scope.marqueeContent.getBoundingClientRect().left <= 0 - scope.marqueeContent.getBoundingClientRect().width) {
            scope.marqueeContent.style.left = "0px";
            scope.originalOffset = scope.marqueeContent.getBoundingClientRect().left;
            scope.offset = window.innerWidth - scope.originalOffset;
          }
          scope.offset -= scope.speed;
        }	
        scope.marqueeContent.style.left = scope.offset + "px";
      }, 30);
    }
  };
}]);