/*
var colour = d3.scaleOrdinal()
    .range(["#FFD180", "#FFD180", "#FFCCBC", "#FFCCBC", "#FFCCBC", "#FF9E80", "#FF9E80", "#FF9E80",
        "#FF8A80", "#FF8A80", "#FF8A80", "#FF80AB", "#FF80AB", "#FF80AB", "#EA80FC", "#EA80FC",
        "#B388FF", "#B388FF", "#B388FF", "#8C9EFF", "#8C9EFF", "#8C9EFF", "#82B1FF", "#82B1FF",
        "#82B1FF", "#80D8FF", "#80D8FF", "#80D8FF", "#00E5FF", "#00E5FF", "#00E5FF", "#1DE9B6",
        "#1DE9B6", "#B9F6CA", "#B9F6CA", "#B9F6CA", "#FFFF8D", "#FFFF8D", "#FFE57F", "#FFE57F",
        "#FFE57F"]);
        */

var colour = ["#FF8A80", "#82B1FF", "#69F0AE", "#FFD180", "#EA80FC"];

var width = screen.width * 0.70;
var height = screen.height;


var forcex = d3.forceX(function (d) {
    return (width / 2)
}).strength(0.07)

var forcey = d3.forceY(function (d) {
    return (height / 2)
}).strength(0.07)

var sim = d3.forceSimulation()
  .force("xforce", forcex)
  .force("yforce", forcey)
  .force("collisions", d3.forceCollide(function (d) {
      return (30)
  }))

var slider = document.getElementById("yearRange");
var year = document.getElementById("year");

year.innerHTML = slider.value;


var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


d3.csv("gender.csv", function (error, data) {
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

    sim
        .nodes(gData)
        .force("collisions", d3.forceCollide(function (d) {
            return (+d[dataString] + 11)
        }))
        .on('tick', updatePosition)

    radio1.addEventListener("click", radioUpdateString);
    radio2.addEventListener("click", radioUpdateString);
    radio3.style.display = "none";
    radio4.style.display = "none";
    slider.oninput = function () {
        year.innerHTML = this.value;
        sliderUpdateString();
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

        if (this.innerText == "Male")
            dataString = "MALE" + currYear;
        else if (this.innerText == "Female")
            dataString = "FEMALE" + currYear;

        updateBubbles();
    }

    function updateBubbles() {
        
        bubbles.selectAll("circle")
            .transition()
            .duration(700)
            .attr("r", function (d) {
                return +d[dataString] * 1.3;
            });
        sim
        .force("collisions", d3.forceCollide(function (d) {
            return (+d[dataString] + 11)
        }))
        .alpha(0.01)
        .restart();
    }


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
    

})

