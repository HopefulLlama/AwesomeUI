angular.module("awesome.ui", ["awesome.ui.blinker", "awesome.ui.marquee", "awesome.ui.seesaw", "awesome.ui.spinner"]);
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
      }, 30);
    }
  };
}]);