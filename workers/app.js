const app = angular.module("app", []);

app.controller("ctrl", function($scope) {
  $scope.items = new Array(200)
});

app.directive('mousey', function($timeout) {
  
  const link = (scope, element, attrs) => {
    scope.height = 50;
    arr = _.range(0, 10000);
    worker = new Worker("worker.js");

    scope.getStyle = () => {
      return {height: `${scope.height}px`}
    };

    scope.onMouseMove = (e) => {
      scope.y = e.y;
      scope.delta = (scope.y > scope.height / 2) ? 1 : -1;
      // let the worker do the heavy lifting on a different thread.
      worker.postMessage(arr);
      worker.onmessage = (e) => {
        console.log('worker done!');
      };

      $timeout(() => {
        scope.height += scope.delta;
      }, 0);
    }

    scope.debouncedMove = _.debounce(scope.onMouseMove, 16);
  }; 

  return {
    restrict: 'E',
    link: link,
    scope: {},
    template: `
    <div ng-mousemove='onMouseMove($event)' ng-style='getStyle()' class='box'>
      {{height}}
    </div>
  `,
  };
});