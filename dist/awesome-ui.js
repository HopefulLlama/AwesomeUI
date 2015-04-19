angular.module("awesome.ui", ["awesome.ui.marquee", "awesome.ui.spinner"]);
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
      	if(scope.direction != "clockwise" || scope.direction != "anti-clockwise") {
      		scope.direction = "clockwise";
      	}

      	scope.rotation = 0;
     	scope.spinnerContent = element[0].querySelector('.spinner-content');
      	scope.spinnerContent.style.display = "inline-block";

      	console.log(scope.spinnerContent.style);

        var id = setInterval(function() {
    		if(scope.direction == 'clockwise') {
    			if(scope.rotation >= 360) {
					scope.rotation = 0;
    			}
    			scope.rotation += scope.speed;
    		} else if (scope.direction == 'anti-clockwise') {
    			if(scope.rotation <= -360) {
					scope.rotation = 0;
    			}
    			scope.rotation -= scope.speed;
    		}	
    		
    		scope.spinnerContent.style.transform = "rotate("+scope.rotation+"deg)";
    		console.log(scope.spinnerContent.style.transform);
        }, 30);
      }
    };
  }]);