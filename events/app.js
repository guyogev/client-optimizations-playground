const app = angular.module("app", []);

app.controller("ctrl", function($scope) {
  $scope.items = new Array(200)
});

app.directive('mousey', function($timeout) {
  
  const link = (scope, element, attrs) => {
    scope.height = 50;
    arr = _.range(0, 10000);
    
    scope.getStyle = () => {
      return {height: `${scope.height}px`}
    };

    const randomString = (length) => {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    const timeConsumingTask = () => {
      arr.forEach((item, i) => {
        arr[i] = randomString(56);
      });
    };

    scope.onMouseMove = (e) => {
      scope.y = e.y;
      scope.delta = (scope.y > scope.height / 2) ? 1 : -1;
      // timeConsumingTask(); // not so great
      $timeout(() => {
        timeConsumingTask(); // better
        scope.height += scope.delta;
      }, 0);
    }

    scope.debouncedMove = _.debounce(scope.onMouseMove, 16);
  }; 

  return {
    restrict: 'E',
    link: link,
    scope: {},
    // Bad
    // template: `
    //   <div ng-mousemove='onMouseMove($event)' ng-style='getStyle()' class='box'>
    //     {{height}}
    //   </div>
    // `,
    // Good
    template: `
    <div ng-mousemove='onMouseMove($event)' ng-style='getStyle()' class='box'>
      {{height}}
    </div>
  `,
  };
});