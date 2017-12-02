
var colour = ["#FF8A80", "#82B1FF", "#69F0AE", "#FFD180", "#EA80FC"];

var width = screen.width * 0.80;
var height = screen.height;


var forcex = d3.forceX(function (d) {
    return (width / 2)
}).strength(0.07)

var forcey = d3.forceY(function (d) {
    return (height / 2)
}).strength(0.07)

var sim = d3.forceSimulation()
    .velocityDecay(0.2)
    .force("xforce", forcex)
    .force("yforce", forcey)
    .force('center', d3.forceCenter(width / 2.3, height / 2));

    

var slider = document.getElementById("yearRange");
var year = document.getElementById("year");

year.innerHTML = slider.value;


var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


d3.csv("obesityData.csv", function (error, data) {
    var gData = data;
    var dataString = "MALE11";

    var bubbles = svg.selectAll("bubbles")
     .data(gData)
     .enter()
     .append("g")
     .attr("class", "bubble");

    bubbles.append("circle")
        .attr("r", function (d) {
            return +d[dataString] * 1.3;
        })
        .style("fill", function (d) {
            if (d["Region"] == "WEST")
                return colour[0];
            if (d["Region"] == "MIDWEST")
                return colour[1];
            if (d["Region"] == "NE")
                return colour[2];
            if (d["Region"] == "SOUTH")
                return colour[3];
            else
                return colour[4];

        })
        .style("cursor", "pointer");

    bubbles.append("text")
        .style("fill", "#FAFAFA")
        .style("font-family", "'Raleway', sans-serif")
        .style("font-size", "15")
        .style("cursor", "pointer")
        .text(function (d) {
            return d["LocationAbbr"];
        })


    var legend = svg.selectAll(".legend")
        .data(colour)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            var LegendHeight = 13 + 20;
            var horizontal = (width * 0.9);
            var vertical = i * LegendHeight + (height * 0.35);
            return "translate(" + horizontal + "," + vertical + ")";
        });

    legend.append("circle")
        .attr("r", 13)
        .style("fill", function (d, i) {
            return colour[i];
        });

    legend.append("text")
        .attr("x", 20)
        .attr("y", 5)
        .style("fill", "#FAFAFA")
        .style("font-family", "'Raleway', sans-serif")
        .style("font-size", "15")
        .text(function (d, i) {
            if (i == 0)
                return "West";
            if (i == 1)
                return "Midwest";
            if (i == 2)
                return "Northeast";
            if (i == 3)
                return "South";
            else
                return "National";
        });

    var tip = d3.select("#chartContainer")
        .data(gData)
        .enter()
        .append("div")
        .attr("class", "tip");

    tip.append("div")
        .attr("class", "state");
    tip.append("div")
        .attr("class", "value");
    tip.append("div")
        .attr("class", "poverty");
    tip.append("div")
        .attr("class", "healthy");
    tip.append("div")
        .attr("class", "overweight");
    tip.append("div")
        .attr("class", "obese");
    tip.append("div")
        .attr("class", "cereal");
    tip.append("div")
        .attr("class", "hint");

    bubbles.on("mouseover", function (d) {
            tip.select(".state").html(d["LocationDesc"]);
            tip.select(".value").html("Obesity rate: " + d[dataString]);
            tip.select(".cereal").html("")
            tip.select(".healthy").html("")
            tip.select(".overweight").html("") 
            tip.select(".obese").html("")
            tip.select(".poverty").html("")

            if (d["LocationAbbr"] == "US") {
                tip.select(".hint").html("");
            }
            else {
                tip.select(".hint")
                    .style("font-style", "italic")
                    .html("Click for state details");
            }
            
            tip.style("display", "block");
        })
        .on("mouseout", function (d) {
            tip.style("display", "none");
        })
        .on('mousemove', function (d) {
            tip.style('top', (d3.event.layerY - 90) + 'px')
               .style('left', (d3.event.layerX + 10) + 'px');
        });

    bubbles.on("click", function (d) {
        if (d["LocationAbbr"] == "US")
            return;
        tip.select(".value").html("");
        tip.select(".poverty").html("Poverty rate: " + d["Poverty Rate"] + "%")
        tip.select(".healthy").html("Healthy: " + d["Good"] + "%")
        tip.select(".overweight").html("Overweight: " + d["Overweight"] + "%")
        tip.select(".obese").html("Obese: " + d["Obese"] + "%")
        tip.select(".cereal").html("Favourite cereal: " + d["FAV"])
        tip.select(".hint").html("");
    });


    sim.nodes(gData)
        .force('charge', d3.forceManyBody().strength(function (d) {
            return -0.2 * Math.pow(+d[dataString], 2.0);

        }))
        .on('tick', updatePosition)

    slider.oninput = function () {
        year.innerHTML = this.value;
        sliderUpdateString();
    }

    radio1.addEventListener("click", radioUpdateString);
    radio2.addEventListener("click", radioUpdateString);
    radio3.addEventListener("click", radioUpdateString);
    radio4.addEventListener("click", radioUpdateString);
    radio5.addEventListener("click", radioUpdateString);
    radio6.addEventListener("click", radioUpdateString);
    radio7.addEventListener("click", radioUpdateString);
    radio8.addEventListener("click", radioUpdateString);
    radio9.addEventListener("click", radioUpdateString);
    radio10.addEventListener("click", radioUpdateString);
    radio11.addEventListener("click", radioUpdateString);
    radio12.addEventListener("click", radioUpdateString);
    radio13.addEventListener("click", radioUpdateString);
    radio14.addEventListener("click", radioUpdateString);
    radio15.addEventListener("click", radioUpdateString);
    radio16.addEventListener("click", radioUpdateString);
    radio17.addEventListener("click", radioUpdateString);

    radioGen.addEventListener("click", setRadios);
    radioAge.addEventListener("click", setRadios);
    radioInc.addEventListener("click", setRadios);
    radioEdu.addEventListener("click", setRadios);

    radio3.style.display = "none";
    radio4.style.display = "none";
    radio5.style.display = "none";
    radio6.style.display = "none";
    radio7.style.display = "none";
    radio8.style.display = "none";
    radio9.style.display = "none";
    radio10.style.display = "none";
    radio11.style.display = "none";
    radio12.style.display = "none";
    radio13.style.display = "none";
    radio14.style.display = "none";
    radio15.style.display = "none";
    radio16.style.display = "none";
    radio17.style.display = "none";
    


    function setRadios() {
        if (this.id == "radioGen") {
            radio1.style.display = "block";
            radio2.style.display = "block";
            radio3.style.display = "none";
            radio4.style.display = "none";
            radio5.style.display = "none";
            radio6.style.display = "none";
            radio7.style.display = "none";
            radio8.style.display = "none";
            radio9.style.display = "none";
            radio10.style.display = "none";
            radio11.style.display = "none";
            radio12.style.display = "none";
            radio13.style.display = "none";
            radio14.style.display = "none";
            radio15.style.display = "none";
            radio16.style.display = "none";
            radio17.style.display = "none";
        }
        else if (this.id == "radioAge") {
            radio1.style.display = "none";
            radio2.style.display = "none";
            radio3.style.display = "block";
            radio4.style.display = "block";
            radio5.style.display = "block";
            radio6.style.display = "block";
            radio7.style.display = "block";
            radio8.style.display = "block";
            radio9.style.display = "none";
            radio10.style.display = "none";
            radio11.style.display = "none";
            radio12.style.display = "none";
            radio13.style.display = "none";
            radio14.style.display = "none";
            radio15.style.display = "none";
            radio16.style.display = "none";
            radio17.style.display = "none";
        }
        else if (this.id == "radioInc") {
            radio1.style.display = "none";
            radio2.style.display = "none";
            radio3.style.display = "none";
            radio4.style.display = "none";
            radio5.style.display = "none";
            radio6.style.display = "none";
            radio7.style.display = "none";
            radio8.style.display = "none";
            radio9.style.display = "block";
            radio10.style.display = "block";
            radio11.style.display = "block";
            radio12.style.display = "block";
            radio13.style.display = "block";
            radio14.style.display = "block";
            radio15.style.display = "none";
            radio16.style.display = "none";
            radio17.style.display = "none";
        }
        else if (this.id == "radioEdu") {
            radio1.style.display = "none";
            radio2.style.display = "none";
            radio3.style.display = "none";
            radio4.style.display = "none";
            radio5.style.display = "none";
            radio6.style.display = "none";
            radio7.style.display = "none";
            radio8.style.display = "none";
            radio9.style.display = "none";
            radio10.style.display = "none";
            radio11.style.display = "none";
            radio12.style.display = "none";
            radio13.style.display = "none";
            radio14.style.display = "none";
            radio15.style.display = "block";
            radio16.style.display = "block";
            radio17.style.display = "block";
        }
        
    }

    

    function updatePosition() {
        bubbles.selectAll("circle")
          .attr("cx", function (d) {
              return d.x
          })
          .attr("cy", function (d) {
              return d.y
          })

        bubbles.selectAll("text")
            .attr("dx", function (d) {
                return d.x - 12;
            })
            .attr("dy", function (d) {
                return d.y + 5;
            })
    }

    function sliderUpdateString() {
        var currYear = year.innerHTML.slice(-2); //extract last 2 digits of year

        dataString = dataString.slice(0, -2);
        dataString += currYear;
        
        updateBubbles();
    }

    function radioUpdateString() {
        var currYear = year.innerHTML.slice(-2); //extract last 2 digits of year

        if (this.id == "radio1")
            dataString = "MALE" + currYear;
        else if (this.id == "radio2")
            dataString = "FEMALE" + currYear;
        else if (this.id == "radio3")
            dataString = "AGEYR1824-" + currYear;
        else if (this.id == "radio4")
            dataString = "AGEYR2534-" + currYear;
        else if (this.id == "radio5")
            dataString = "AGEYR3544-" + currYear;
        else if (this.id == "radio6")
            dataString = "AGEYR4554-" + currYear;
        else if (this.id == "radio7")
            dataString = "AGEYR5564-" + currYear;
        else if (this.id == "radio8")
            dataString = "AGEYR65PLUS-" + currYear;
        else if (this.id == "radio9")
            dataString = "INCLESS15-" + currYear;
        else if (this.id == "radio10")
            dataString = "INC1525-" + currYear;
        else if (this.id == "radio11")
            dataString = "INC2535-" + currYear;
        else if (this.id == "radio12")
            dataString = "INC3550-" + currYear;
        else if (this.id == "radio13")
            dataString = "INC5075-" + currYear;
        else if (this.id == "radio14")
            dataString = "INC75PLUS-" + currYear;
        else if (this.id == "radio15")
            dataString = "EDUHS-" + currYear;
        else if (this.id == "radio16")
            dataString = "EDUHSGRAD-" + currYear;
        else if (this.id == "radio17")
            dataString = "EDUGRAD-" + currYear;

        updateBubbles();
    }

    function updateBubbles() {
        
        bubbles.selectAll("circle")
            .transition()
            .duration(700)
            .attr("r", function (d) {
                return +d[dataString] * 1.3;
            });

        sim.force('charge', d3.forceManyBody().strength(function (d) {
                return -0.2 * Math.pow(+d[dataString], 2.0);

            }))
        .alpha(0.1)
        .restart();
    }


    

})

