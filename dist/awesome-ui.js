angular.module("awesome.ui", ["awesome.ui.marquee"]);
angular.module('awesome.ui.marquee', [])
  .directive('aumarquee', [function () {
    return {
      link: function (scope, element, attrs) {
      	console.log(element);
      	var offset = 0;
      	element.context.style.paddingLeft = offset + "px";
        var id = setInterval(function() {
    		if(offset === window.innerWidth){
    			offset = 0 - element.width();
    		} else {
    			offset++;
    		}
    		element.context.style.paddingLeft = offset + "px";
        }, 10);
      },
      restrict:'E'
    };
  }]);