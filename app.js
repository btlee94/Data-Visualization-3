
/*var colour = d3.scaleOrdinal()
    .range(["#FF8A80", "#FF5252", "#FFCCBC", "#FF80AB", "#FF4081", "#F50057", "#EA80FC", "#E040FB",
        "#D500F9", "#B388FF", "#7C4DFF", "#651FFF", "#8C9EFF", "#536DFE", "#3D5AFE", "#82B1FF",
        "#448AFF", "#2979FF", "#80D8FF", "#40C4FF", "#00B0FF", "#84FFFF", "#18FFFF", "#00E5FF",
        "#A7FFEB", "#64FFDA", "#1DE9B6", "#B9F6CA", "#69F0AE", "#00E676", "#CCFF90", "#B2FF59",
        "#76FF03", "#FFE57F", "#FFD740", "#FFC400", "#FFD180", "#FF9E80", "#FF6E40", "#FF3D00",
        "#FFAB40", "#FF9100", "#FFFF8D", "#FFFF00", "#FFEA00", "#F4FF81", "#EEFF41", "#C6FF00",
        "#CCFF90", "#B2FF59", "#76FF03"]);
        */

var colour = d3.scaleOrdinal()
    .range(["#FFD180", "#FFD180", "#FFCCBC", "#FFCCBC", "#FFCCBC", "#FF9E80", "#FF9E80", "#FF9E80",
        "#FF8A80", "#FF8A80", "#FF8A80", "#FF80AB", "#FF80AB", "#FF80AB", "#EA80FC", "#EA80FC",
        "#B388FF", "#B388FF", "#B388FF", "#8C9EFF", "#8C9EFF", "#8C9EFF", "#82B1FF", "#82B1FF",
        "#82B1FF", "#80D8FF", "#80D8FF", "#80D8FF", "#84FFFF", "#84FFFF", "#84FFFF", "#A7FFEB",
        "#A7FFEB", "#B9F6CA", "#B9F6CA", "#B9F6CA", "#FFFF8D", "#FFFF8D", "#FFE57F", "#FFE57F",
        "#FFE57F"]);


var width = screen.width;
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
slider.oninput = function () {
    year.innerHTML = this.value;
}


var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bubble");


d3.csv("gender.csv", function (error, data) {

    var gData = data;

    var bubbles = svg.selectAll("bubbles")
     .data(gData)
     .enter()
       .append("circle")
       .attr("r", function (d) {
           return +d["MALE11"] * 1.3;
       })
       .style("fill", function (d) { return colour(d["LocationAbbr"]); });


    sim
        .nodes(gData)
        .force("collisions", d3.forceCollide(function (d) {
            return (+d["MALE11"] + 10)
        }))
        .on('tick', updatePosition)

    radio1.addEventListener("click", updateData);
    radio2.addEventListener("click", updateData);
    radio3.style.display = "none";
    radio4.style.display = "none";
    

    function updatePosition() {
        bubbles
          .attr("cx", function (d) {
              return d.x
          })
          .attr("cy", function (d) {
              return d.y
          })
    }

    function updateData() {
        var newData;
        if (this.innerText == "Male")
            newData = "MALE11";
        else if(this.innerText == "Female")
            newData = "FEMALE11";

        bubbles
            .transition()
            .duration(700)
            .attr("r", function (d) {
                return +d[newData] * 1.3;
            });
        sim
        .force("collisions", d3.forceCollide(function (d) {
            return (+d[newData] + 10)
        }))
        .alpha(0.01)
        .restart();
    }

})