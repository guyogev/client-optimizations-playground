const app = angular.module("app", []);

app.controller("ctrl", function($scope) {
  $scope.items = new Array(100);
  $scope.getStyle = (i) => {
    return {width: `${Math.min(i, 100)}%`};
  }
});

app.directive('changeColors', function() {
  const doInc = (element) => {
    let i;
    const children = element.children();
    // bad
    // for (i = 0; i < children.length; i++) {
    //   const c = children[i];
    //   let width = parseInt(c.style.width, 10);
    //   if (c.offsetWidth < 1000) {
    //     c.style.width = `${width + 1}%`;
    //   }
    // }

    //good
    const filtered = [];
    for (i = 0; i < children.length; i++) {
      const c = children[i];
      if (c.offsetWidth < 1000) {
        filtered.push(c)
      }
    }
    let width;
    filtered.forEach((c) => {
      width = parseInt(c.style.width, 10);
      c.style.width = `${width + 1}%`
    });
    

  }
  
  const link = (scope, element, attrs) => {
    element.on('click', () => doInc(element));
  };

  return {
    restrict: 'A',
    link: link,
  };
});