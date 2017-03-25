angular.module("awesome.ui", ["awesome.ui.blinker", "awesome.ui.chimichanga", "awesome.ui.flipper", "awesome.ui.marquee", "awesome.ui.seesaw", "awesome.ui.spinner"]);
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

      scope.marqueeContent.style.display = "inline-block";
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