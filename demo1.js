//import * as d3 from "d3";
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 800 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;



// append the svg object to the body of the page
var chart1 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")


    

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = chart1.append("g")
  .attr("transform", "translate(0," + height + ")")
 

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = chart1.append("g")
  .attr("class", "myYaxis")

// A function that create / update the plot for a given variable:
//function update(selectedVar) {

  // Parse the Data
  d3.csv("prediction1.csv", function(data) {

   var nest = d3.nest()
    .key(function(d) { return d.Class; })
    .sortKeys(d3.ascending)
    .rollup(function(v) { return v.length; })
    .entries(data);
   //console.log(data);
    // X axis
    x.domain(nest.map(function(d) { return d.key; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x)).selectAll("text")	
        .style("text-anchor", "end")// End of the X label is rotated
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")  


    // Add Y axis
    y.domain([0, d3.max(nest, function(d) { return parseInt(d.value);}) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    //Create Title 
    chart1.append("text")
	.attr("x", width / 2 )
        .attr("y", 0)
	.style("font-weight","bold")
	.style("font-size","22")
        .style("text-anchor", "middle")
        .text("Bar plot");


    //Create X axis label   
    chart1.append("text")
	.attr("x", width / 2 )
        .attr("y",  height + margin.bottom )
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .text("Classes");


    // Add a label to the y axis
    chart1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
	.style("font-weight","bold")
        .style("text-anchor", "middle")
        .text("Frequency of Occurence")
        .attr("class", "y axis label");


    // variable u: map data to existing bars
    var u = chart1.selectAll("rect")
      .data(nest)
      .enter()
      .append("rect")
      //.merge(chart1)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })// To invert the position for Bar graph plot
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })  
        .attr("fill", "steelblue");
  });

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

var colors = d3.scaleOrdinal(d3.schemeDark2);

//var svg = d3.select("body").append("svg")
//	.attr("width",width)
//	.attr("height", height)
		//.style("background","pink");
svg.append("g")
      	.attr("class", "lines");
	//var details = [{grade:"A+",number:8},{grade:"A",number:21},
	//	       {grade:"B",number:15},{grade:"C",number:22},
	//	       {grade:"D",number:8},{grade:"F",number:10}];
	//var details =[];
	d3.csv("prediction1.csv", function(d) {
   		var nest = d3.nest()
    			.key(function(d) { return d.Class; })
    			.sortKeys(d3.ascending)
    			.rollup(function(v) { return v.length; })
    			.entries(d);
		//console.log(nest);
		var data = d3.pie()
			.sort(null)
			.value(function(d){return d.value;})
			(nest);
		//console.log(data);
		    //Create Title 
    		svg.append("text")
			.attr("x", width / 2 )
        		.attr("y", 0)
			.style("font-weight","bold")
			.style("font-size","22")
        		.style("text-anchor", "middle")
        		.text("Pie plot");
		var segments = d3.arc()
			.innerRadius(0)
			.outerRadius(150)
			.padAngle(.05)
			.padRadius(50);
		
		var sections = svg.append("g")
			.attr("transform","translate(250,250)")
			.selectAll("path")
			.data(data);

		sections.enter().append("path").attr("d", segments)
			.attr("fill", function(d){return colors(d.data.value);});

		var legends = svg.append("g").attr("transform", "translate(500,10)")
				.selectAll(".legends").data(data);
		var legend = legends.enter().append("g").classed("inside", true).attr("transform", function(d,i){return "translate(0,"+ (i+1)*30 +")";});
		legend.append("rect").attr("width",20).attr("height",20).attr("fill",function(d){return colors(d.data.value);})
		legend.append("text").classed("label",true).text(function(d){return d.data.key;})
				.attr("fill",function(d){return colors(d.data.value);})
				.attr("x", 30)
				.attr("y", 20);	
		//console.log(funtion(d){return d})
	
	});

// append the svg object to the body of the page
var svg1 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

var colors = d3.scaleOrdinal(d3.schemeDark2);

//var svg = d3.select("body").append("svg")
//	.attr("width",width)
//	.attr("height", height)
		//.style("background","pink");
svg1.append("g")
      	.attr("class", "lines");
	var details = [{key:"Brushing Teeth",value:3408},{key:"Cow",value:7313},
		       {key:"Doorwood Knock",value:15067},{key:"Handsaw",value:11786},
		       {key:"Snoring",value:31679}];
	

	
		var data = d3.pie()
			.sort(null)
			.value(function(d){return d.value;})
			(details);
		console.log(data);
		    //Create Title 
    		svg1.append("text")
			.attr("x", width / 2 )
        		.attr("y", 50)
			.style("font-weight","bold")
			.style("font-size","22")
        		.style("text-anchor", "middle")
        		.text("Most occurred events");
		var segments = d3.arc()
			.innerRadius(75)
			.outerRadius(150)
			.padAngle(.05)
			.padRadius(50);
		
		var sections = svg1.append("g")
			.attr("transform","translate(250,250)")
			.selectAll("path")
			.data(data);

		sections.enter().append("path").attr("d", segments)
			.attr("fill", function(d){return colors(d.data.value);});
		var content = d3.select("g").selectAll("text").data(data);
		content.enter().append("text").classed("inside", true).each(function(d){
			var center = segments.centroid(d);
			d3.select(this).attr("x",center[0]).attr("y",center[1])
				.text(d.data.value);		
		});
		var legends = svg1.append("g").attr("transform", "translate(500,100)")
				.selectAll(".legends").data(data);
		var legend = legends.enter().append("g").attr("transform", function(d,i){return "translate(0,"+ (i+1)*30 +")";});
		legend.append("rect").attr("width",20).attr("height",20).attr("fill",function(d){return colors(d.data.value);})
		legend.append("text").classed("label",true).text(function(d){return d.data.key;})
				.attr("fill",function(d){return colors(d.data.value);})
				.attr("x", 30)
				.attr("y", 20);	
		//console.log(funtion(d){return d})

var svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

var colors = d3.scaleOrdinal(d3.schemeDark2);

//var svg = d3.select("body").append("svg")
//	.attr("width",width)
//	.attr("height", height)
		//.style("background","pink");
svg2.append("g")
      	.attr("class", "lines");
var details = [{key:"Airplane",value:5},{key:"Carhorn",value:4},
		       {key:"Crying baby",value:1},{key:"Drinking Sipping",value:10},
		       {key:"Glassbreaking",value:2}];
	

	
var data = d3.pie()
	.sort(null)
	.value(function(d){return d.value;})
	(details);
		//console.log(data);
		    //Create Title 
 svg2.append("text")
	.attr("x", width / 2 )
        .attr("y", 50)
	.style("font-weight","bold")
	.style("font-size","22")
        .style("text-anchor", "middle")
        .text("Least occurred events");
var segments = d3.arc()
	.innerRadius(75)
	.outerRadius(150)
	.padAngle(.05)
	.padRadius(50);
		
var sections = svg2.append("g")
	.attr("transform","translate(250,250)")
	.selectAll("path")
	.data(data);

sections.enter().append("path").attr("d", segments)
	.attr("fill", function(d){return colors(d.data.value);});

var content = d3.select("g").selectAll("text").data(data);
	content.enter().append("text").classed("inside",true).each(function(d){
		var center = segments.centroid(d);
		d3.select(this).attr("x",center[0]).attr("y",center[1])
			.text(d.data.value);		
	});

var legends = svg2.append("g").attr("transform", "translate(500,100)")
		.selectAll(".legends").data(data);
var legend = legends.enter().append("g").attr("transform", function(d,i){return "translate(0,"+ (i+1)*30 +")";});
	legend.append("rect").attr("width",20).attr("height",20).attr("fill",function(d){return colors(d.data.value);})
	legend.append("text").classed("label",true).text(function(d){return d.data.key;})
				.attr("fill",function(d){return colors(d.data.value);})
				.attr("x", 30)
				.attr("y", 20);	


