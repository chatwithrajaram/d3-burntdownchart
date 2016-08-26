(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Burnt', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          actual: "=",
          ideal: "="
        },
        link: function(scope, iElement, iAttrs) {


          var chart = d3.select(iElement[0]).append("svg");


          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.actual);
            }
          );

          // watch for data changes and re-render
          scope.$watch('actual', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            chart.selectAll("*").remove();

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
               			width = 500 - margin.left - margin.right,
                		height = 280 - margin.top - margin.bottom;
            		var x = d3.time.scale()
            			         .range([0, width]);
            		var y = d3.scale.linear()
                		        .range([height, 0]);

                var div = d3.select("body").append("div")
                          .attr("class", "tooltip")
                          .style("opacity", 0);

                  chart.attr("class", "chart")
                    .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            		var idealLine = d3.svg.line()
            			.x(function(d) { return x(d.date); })
                		.y(function(d) { return y(d.points); });
                	var actualLine = d3.svg.line()
                		.x(function(d) { return x(d.date); })
                		.y(function(d) { return y(d.points); });

            		x.domain(d3.extent(scope.ideal, function(d){return d.date;}));
            		y.domain(d3.extent(scope.actual, function(d){return d.points;}));

            		var xAxis = d3.svg.axis()
            			.scale(x)
            			.orient("bottom")
            			.tickFormat(d3.time.format("%m/%d"));

            		var yAxis = d3.svg.axis()
            		    .scale(y)
            		    .orient("left");


            		// Create the x-axis
            		chart.append("g")
            			.attr("class", "x axis")
            			.attr("transform", "translate(0," + height + ")")
            			.call(xAxis);

            		// Create the y-axis
            		chart.append("g")
            	      	.attr("class", "y axis")
            	      	.call(yAxis)
            	    .append("text")
            	      	.attr("transform", "rotate(-90)")
            	      	.attr("y", 6)
            	      	.attr("dy", ".71em")
            	      	.style("text-anchor", "end")
            	      	.text("Points");

            	    // Paint the ideal line
            	    chart.append("path")
            	    	.datum(scope.ideal)
            	      	.attr("class", "line ideal")
            	      	.attr("d", idealLine);

            	    // // Paint the actual line
            	    // chart.append("path")
            	    // 	.datum(scope.actual)
            	    //   	.attr("class", "line actual")
            	    //   	.attr("d", actualLine);




                  chart.selectAll("bar")
                  .data(scope.actual)
                .enter().append("rect")
                  .style("fill", "rgba(0, 128, 0, 0.5)")
                  .attr("x", function(d) { return x(d.date); })
                  .attr("y", function(d) { return y(d.points); })
                  .attr("height", function(d) { return height - y(d.points); })
                  .on("mouseover", function(d) {
                     div.transition()
                         .duration(200)
                         .style("opacity", .9);
                     div.html(d.points)
                         .style("left", (d3.event.pageX) + "px")
                         .style("top", (d3.event.pageY - 20) + "px");
                     })
                 .on("mouseout", function(d) {
                     div.transition()
                         .duration(500)
                         .style("opacity", 0);
                 });

                 chart.selectAll('circle')
                .data(function(d){ return scope.ideal})
                .enter().append('circle')
                .attr("cx", function(d) { return x(d.date) })
                .attr("cy", function(d) { return y(d.points) })
                .attr("r", 3.5)
                .style("fill", "brown");


          };
        }
      };
    }]);

}());
