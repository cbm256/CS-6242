var format = d3.time.format("%Y");
var pointRadius = 9;

d3.csv("movies.csv", function(error,data) {
    data.forEach(function(d) {
        d.Id = +d.Id;
        d.Title = d.Title;
        d.Runtime = +d.Runtime;
        d.Year = format.parse(d.Year);
        d.Country = d.Country;
        d.imdbRating = +d.imdbRating;
        d.imdbVotes = +d.imdbVotes;
        d.Budget = +d.Budget;
        d.Gross = +d.Gross;
        d.WinsNoms = +d.WinsNoms;
        d.IsGoodRating = +d.IsGoodRating;

   });

var margin = {top: 50, left: 130, bottom: 80, right: 50};
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg1 = d3.select('#container1').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

var g1 = svg1.append('g')
		 	.attr("transform",'translate('+margin.left+','+margin.top+')');

var svg2 = d3.select("#container2").append("svg")
			.attr("width",width + margin.left+margin.right)
			.attr("height",height+margin.top+margin.bottom)

var g2 = svg2.append('g')
			.attr("transform",'translate('+margin.left+','+margin.top+')');

var svg3 = d3.select("#container3").append("svg")
			.attr("width",width + margin.left+margin.right)
			.attr("height",height+margin.top+margin.bottom)

var g3 = svg3.append('g')
			.attr("transform",'translate('+margin.left+','+margin.top+')');

var svg4 = d3.select("#container4").append("svg")
			.attr("width",width + margin.left+margin.right)
			.attr("height",height+margin.top+margin.bottom)

var g4 = svg4.append('g')
			.attr("transform",'translate('+margin.left+','+margin.top+')');

var svg5 = d3.select("#container5").append("svg")
			.attr("width",width + margin.left+margin.right)
			.attr("height",height+margin.top+margin.bottom)

var g5 = svg5.append('g')
			.attr("transform",'translate('+margin.left+','+margin.top+')');


var labels = d3.set(data.map(function(d) {
            return d.IsGoodRating;
        })).values();

var symbolTypes = {
    "cross": d3.svg.symbol().type("cross"),
    "circle": d3.svg.symbol().type("circle")
};

var colorScale = d3.scale.ordinal()
		            .domain(labels)
		            .range(['#ff0000 ', '#0000FF']);

var shapeScale = d3.scale.ordinal()
            .domain(labels)
            .range([d3_shape.symbolCircle, d3_shape.symbolCross]);


var legendWidth = 100;
var legendHeight = 50;

		g1.append('path')
			.attr('d',symbolTypes.cross())
			.attr("transform", "translate(50,15)")
			.attr('fill','None')
			.attr('stroke','Blue')
		g1.append('path')
			.attr('d',symbolTypes.circle())
			.attr("transform", "translate(50,40)")
			.attr('fill','None')
			.attr('stroke','Red')
		g1.append("text")
		    .attr("y", 20)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Good Rating");
		g1.append("text")
		    .attr("y", 45)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Bad Rating");
		g1.append('rect')
			.attr('x',35)
			.attr('y',5)
			.attr('width',legendWidth)
			.attr('height',legendHeight)
			.attr('fill','None')
			.attr('stroke','Black')
		g2.append('path')
			.attr('d',symbolTypes.cross())
			.attr("transform", "translate(50,15)")
			.attr('fill','None')
			.attr('stroke','Blue')
		g2.append('path')
			.attr('d',symbolTypes.circle())
			.attr("transform", "translate(50,40)")
			.attr('fill','None')
			.attr('stroke','Red')
		g2.append("text")
		    .attr("y", 20)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Good Rating");
		g2.append("text")
		    .attr("y", 45)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Bad Rating");
		g2.append('rect')
			.attr('x',35)
			.attr('y',5)
			.attr('width',legendWidth)
			.attr('height',legendHeight)
			.attr('fill','None')
			.attr('stroke','Black')
		g3.append('path')
			.attr('d',symbolTypes.cross())
			.attr("transform", "translate(50,15)")
			.attr('fill','None')
			.attr('stroke','Blue')
		g3.append('path')
			.attr('d',symbolTypes.circle())
			.attr("transform", "translate(50,40)")
			.attr('fill','None')
			.attr('stroke','Red')
		g3.append("text")
		    .attr("y", 20)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Good Rating");
		g3.append("text")
		    .attr("y", 45)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Bad Rating");
		g3.append('rect')
			.attr('x',35)
			.attr('y',5)
			.attr('width',legendWidth)
			.attr('height',legendHeight)
			.attr('fill','None')
			.attr('stroke','Black')
		g4.append('path')
			.attr('d',symbolTypes.cross())
			.attr("transform", "translate(50,15)")
			.attr('fill','None')
			.attr('stroke','Blue')
		g4.append('path')
			.attr('d',symbolTypes.circle())
			.attr("transform", "translate(50,40)")
			.attr('fill','None')
			.attr('stroke','Red')
		g4.append("text")
		    .attr("y", 20)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Good Rating");
		g4.append("text")
		    .attr("y", 45)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Bad Rating");
		g4.append('rect')
			.attr('x',35)
			.attr('y',5)
			.attr('width',legendWidth)
			.attr('height',legendHeight)
			.attr('fill','None')
			.attr('stroke','Black')
		g5.append('path')
			.attr('d',symbolTypes.cross())
			.attr("transform", "translate(50,15)")
			.attr('fill','None')
			.attr('stroke','Blue')
		g5.append('path')
			.attr('d',symbolTypes.circle())
			.attr("transform", "translate(50,40)")
			.attr('fill','None')
			.attr('stroke','Red')
		g5.append("text")
		    .attr("y", 20)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Good Rating");
		g5.append("text")
		    .attr("y", 45)
		    .attr("x", 60)
		    .attr("font-size", "20px")
		    .attr("text-anchor", "start")
		    .text("Bad Rating");
		g5.append('rect')
			.attr('x',35)
			.attr('y',5)
			.attr('width',legendWidth)
			.attr('height',legendHeight)
			.attr('fill','None')
			.attr('stroke','Black')



var xExtent = d3.extent(data, function(d) { return d.imdbRating });

var xScale = d3.scale.linear()
            .domain(xExtent)
            .range([0, width]);

var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

//Chart 1
var yExtent = d3.extent(data, function(d) { return d.WinsNoms });

var yScale = d3.scale.linear()
		    .domain(yExtent)
		    .range([height, 0]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');           

g1.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 50)
    .style("text-anchor", "end")
    .text("IMDb Rating");

g1.append('g')
    .attr('class', 'axis')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 70)
    .attr("dy", "1.5em")
    .style("text-anchor", "end")
    .text("Wins+Noms");

g1.selectAll("path")
    .data(data)
    .enter().append("path")
    .attr("class", "dot")
    // position it, can't use x/y on path, so translate it
    .attr("transform", function(d) { 
        return "translate("+xScale(d.imdbRating)+","+yScale(d.WinsNoms)+")"; 
    })
   .attr("d", function(d,i){
        if (d.IsGoodRating === 0)
        { // circle if bar === 0
            return symbolTypes.circle();
        }
        else
        {
            return symbolTypes.cross();
        }
    })
    // fill based on goo and foo
   .style("stroke", function(d,i){
        if (d.IsGoodRating === 0)
                return "red";
            else
                return "blue";
    })
   .style("fill","None");




 //Chart 2
var budExtent = d3.extent(data, function(d) { return d.Budget });


var yScale = d3.scale.linear()
		    .domain(budExtent)
		    .range([height, 0]);


var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');           

g2.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 50)
    .style("text-anchor", "end")
    .text("IMDb Rating");

g2.append('g')
    .attr('class', 'axis')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 30)
    .attr("dy", "1.5em")
    .style("text-anchor", "end")
    .text("Budget");

g2.selectAll("path")
    .data(data)
    .enter().append("path")
    .attr("class", "dot")
    // position it, can't use x/y on path, so translate it
    .attr("transform", function(d) { 
        return "translate("+xScale(d.imdbRating)+","+yScale(d.Budget)+")"; 
    })
   .attr("d", function(d,i){
        if (d.IsGoodRating === 0)
        { // circle if bar === 0
            return symbolTypes.circle();
        }
        else
        {
            return symbolTypes.cross();
        }
    })
    // fill based on goo and foo
   .style("stroke", function(d,i){
        if (d.IsGoodRating === 0)
                return "red";
            else
                return "blue";
    })
   .style("fill","None");


// Chart 3

var yExtent = d3.extent(data, function(d) { return d.imdbVotes });

var sizeExtent = d3.extent(data, function(d) { return d.WinsNoms });

var yScale = d3.scale.linear()
		    .domain(yExtent)
		    .range([height, 0]);

var sizeScale = d3.scale.linear()
				.domain(sizeExtent)
				.range([50,150]);

var symbolTypesx = {
    "cross": d3.svg.symbol().type("cross").size(function(d) { return sizeScale(d.WinsNoms);}),
    "circle": d3.svg.symbol().type("circle").size(function(d) { return sizeScale(d.WinsNoms);})
};



var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');           

g3.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 50)
    .style("text-anchor", "end")
    .text("IMDb Rating");

g3.append('g')
    .attr('class', 'axis')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 60)
    .attr("dy", "1.5em")
    .style("text-anchor", "end")
    .text("IMDb Votes");

g3.selectAll("path")
    .data(data)
    .enter().append("path")
    .attr("class", "dot")
    // position it, can't use x/y on path, so translate it
    .attr("transform", function(d) { 
        return "translate("+xScale(d.imdbRating)+","+yScale(d.imdbVotes)+")"; 
    })
   .attr("d", function(d,i){
        if (d.IsGoodRating === 0)
        { // circle if bar === 0
            return symbolTypesx.circle(d);
        }
        else
        {
            return symbolTypesx.cross(d);
        }
    })
    // fill based on goo and foo
   .style("stroke", function(d,i){
        if (d.IsGoodRating === 0)
                return "red";
            else
                return "blue";
    })
   .style("fill","None");



 //chart 4
var yExtent = d3.extent(data, function(d) { return d.WinsNoms });


var yScale = d3.scale.sqrt()
		    .domain(yExtent)
		    .range([height, 0]);


var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');           

g4.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 50)
    .style("text-anchor", "end")
    .text("IMDb Rating");

g4.append('g')
    .attr('class', 'axis')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 60)
    .attr("dy", "1.5em")
    .style("text-anchor", "end")
    .text("Wins+Noms");

g4.selectAll("path")
    .data(data)
    .enter().append("path")
    .attr("class", "dot")
    // position it, can't use x/y on path, so translate it
    .attr("transform", function(d) { 
        return "translate("+xScale(d.imdbRating)+","+yScale(d.WinsNoms)+")"; 
    })
   .attr("d", function(d,i){
        if (d.IsGoodRating === 0)
        { // circle if bar === 0
            return symbolTypes.circle();
        }
        else
        {
            return symbolTypes.cross();
        }
    })
    // fill based on goo and foo
   .style("stroke", function(d,i){
        if (d.IsGoodRating === 0)
                return "red";
            else
                return "blue";
    })
    .style("fill","None");



 //chart 5
var yExtent = d3.extent(data, function(d) { return d.WinsNoms });

var winnomNormalScale = d3.scale.linear()
		.domain(yExtent)
		.range([1,10]);

var yScale = d3.scale.log()
		.domain([1,10])
		.range([height,0]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');           

g5.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 50)
    .style("text-anchor", "end")
    .text("IMDb Rating");

g5.append('g')
    .attr('class', 'axis')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 30)
    .attr("dy", "1.5em")
    .style("text-anchor", "end")
    .text("Wins+Noms");

g5.selectAll("path")
    .data(data)
    .enter().append("path")
    .attr("class", "dot")
    // position it, can't use x/y on path, so translate it
    .attr("transform", function(d) { 
        return "translate("+xScale(d.imdbRating)+","+yScale(winnomNormalScale(d.WinsNoms))+")"; 
    })
   .attr("d", function(d,i){
        if (d.IsGoodRating === 0)
        { // circle if bar === 0
            return symbolTypes.circle();
        }
        else
        {
            return symbolTypes.cross();
        }
    })
    // fill based on goo and foo
   .style("stroke", function(d,i){
        if (d.IsGoodRating === 0)
                return "red";
            else
                return "blue";
    })
   .style("fill","None");


});