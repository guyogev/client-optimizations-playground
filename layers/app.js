const app = angular.module("app", []);

app.controller("ctrl", function($scope) {
  $scope.items = new Array(200)
});

app.directive('aaa', function($timeout) {
  const move = (scope) => {
    if (scope.top > 5000 || scope.top < 0) { scope.delta*= -1; }
    scope.top += scope.delta;
    scope.style.top = `${scope.top}px`;
    // $timeout(() => move(scope), 10)
  }
  
  const link = (scope, element, attrs) => {
    scope.top = Math.round(Math.random()*5000);
    scope.delta = Math.round(Math.random()*10 +1);
    scope.style = {top: scope.top};
    $timeout(() => move(scope), 16)
  }; 

  return {
    restrict: 'E',
    link: link,
    scope: {},
    template: `
      <div>H</div>
    `,
    // template: `
    //   <img 
    //     src="http://www.dogbreedplus.com/dog_names/images/funny-dog-names.jpg"
    //     ng-style='style'
    //   />`
  };
});