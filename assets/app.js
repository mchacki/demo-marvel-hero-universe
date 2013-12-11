var ProfileManager = angular.module("ProfileManager", ["ngResource"]);

function ProfileController($scope, $resource) {

  var Profiles = $resource(
    "user/:id", 
    {id: "@_key"},
    {
      update:  { method: "PUT" }
    }
  );

  var pickByKey = function() {
    for (var i = 0; i < $scope.profiles.length; i++) {
      var current = $scope.profiles[i];
      if (current._key === $scope.selectedKey) {
        $scope.profile = current;
        return;
      }
    }
  };
  $scope.profiles = Profiles.query();
  $scope.profile = {};
  $scope.save = function() {
    $scope.selectedKey = $scope.profile._key;
    $scope.profile.$update();
    $scope.profiles = Profiles.query(pickByKey);
  }
  $scope.delete = function() {
    $scope.profile.$delete();
    $scope.profiles = Profiles.query();
  }
  $scope.create = function() {
    var toAdd = new Profiles({name: "", email: ""});
    toAdd.$save(function() {
      $scope.selectedKey = toAdd.attributes._key;
      $scope.profiles = Profiles.query(pickByKey);
    }); 
  }
}

