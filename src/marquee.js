angular.module('awesome.ui.marquee', [])
  .directive('auMarquee', [function () {
    return {
      restrict:'E',
      scope: {
      	direction: '=',
      	refresh: '=',
      	speed: '='
      },
      link: function (scope, element, attrs) {
      	if(scope.direction == 'right') {
      		scope.resetThreshold = window.innerWidth;
      		scope.startPosition = 0 - element.width();
      	} else if (scope.direction == 'left') {
      		scope.resetThreshold = 0 - element.width();
      		scope.startPosition = window.innerWidth;
      	}
      	
      	scope.offset = 0;

      	element.context.style.position = "relative";
      	element.context.style.left = scope.offset + "px";
        var id = setInterval(function() {
    		if(scope.direction == 'right') {
    			if(scope.offset >= scope.resetThreshold) {
    				scope.offset = scope.startPosition;
    			}
    			scope.offset += scope.speed;
    		} else if (scope.direction == 'left') {
    			if(scope.offset <= scope.resetThreshold) {
    				scope.offset = scope.startPosition;
    			}
    			scope.offset -= scope.speed;
    		}	
    		element.context.style.left = scope.offset + "px";
        }, scope.refresh);
      }
    };
  }]);