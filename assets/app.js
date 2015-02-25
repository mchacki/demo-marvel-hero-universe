function HeroLoaderController($scope, $http) {

  var width = 960, height = 500;
  var color = d3.scale.category20();
  var force = d3.layout.force()
    .charge(-300)
    .linkDistance(100)
    .size([width, height]);

  var svg = d3.select("#universe").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform","translate(200, 150)scale(0.5)");

  var nodeForId = function(id) {
    var i = 0;
    for (i=0; i < $scope.graph.nodes.length; i++) {
      if ($scope.graph.nodes[i]._id === id) {
        return $scope.graph.nodes[i];
      }
    }
  };
  $scope.search = "";
  $scope.searched = false;
  $scope.loaded = false;
  $scope.selected = null;
  $scope.heros = [];

  $scope.graph = {
    nodes: [],
    links: []
  };
 
  $scope.$watch("search", function() {
    if ($scope.search.length >= 3) {
      $http.get("search/" + $scope.search)
        .success(function(data) {
          $scope.heros = data;
          $scope.loaded = false;
          if (data.length > 0) {
            $scope.searched = true;
          } else {
            $scope.searched = false;
          }
        })
        .error(function() {
          $scope.heros = [];
          $scope.searched = false;
          $scope.loaded = false;
          alert("sorry there is an error on the server side");
        });
    } else {
      $scope.heros = [];
      $scope.loaded = false;
      $scope.searched = false;
    }
  }, true);

  $scope.$watch("selected", function() {
    if ($scope.selected) {
      $http.get("hero/" + $scope.selected._key)
        .success(function(data) {
          $scope.loaded = true;
          var eData = svg.selectAll(".link")
            .data([]).exit().remove();
          var nData = svg.selectAll(".node")
            .data([]).exit().remove();

          $scope.graph.nodes = data.nodes;
          $scope.graph.links = data.edges;
          angular.forEach($scope.graph.links, function(e) {
            e.source = nodeForId(e._from);
            e.target = nodeForId(e._to);
          });
          force
            .nodes($scope.graph.nodes)
            .links($scope.graph.links)
            .start();

          var eData = svg.selectAll(".link")
            .data($scope.graph.links);
          var link = eData
            .enter().append("line")
            .attr("class", "link");

          var nData = svg.selectAll(".node")
            .data($scope.graph.nodes);
          var node = nData
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 20)
            .style("fill", function(d) { return color(d.name); });
          node.append("title")
            .text(function(d) { return d.name; });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          });
        })
        .error(function() {
          alert("sorry there is an error on the server side");
        });
    }
  });
}

