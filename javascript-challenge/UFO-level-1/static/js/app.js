
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
console.log(tableData);
tableData.forEach(function(datetime) {
    console.log(datetime);
    
    var trow = tbody.append("tr");
    trow.append("td").text(datetime.datetime)
    trow.append("td").text(datetime.city)
    trow.append("td").text(datetime.state)
    trow.append("td").text(datetime.country)
    trow.append("td").text(datetime.shape)
    trow.append("td").text(datetime.durationMinutes)
    trow.append("td").text(datetime.comments)
});

var button = d3.select("#filter-btn");
var form = d3.select("#form");



button.on("click", runEnter);
form.on("submit", runEnter);

function runEnter() {

  
    d3.event.preventDefault();
    
    
    var inputElement = d3.select("#datetime");
  
    
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);
    console.log(tableData);
  
    
    var filteredData = tableData.filter(function(d){
        return d.datetime === inputValue
    })
    console.log(filteredData);  
    tbody.html("");
    filteredData.forEach(function(results) {
  
    
        var trow = tbody.append("tr");
        trow.append("td").text(results.datetime)
        trow.append("td").text(results.city)
        trow.append("td").text(results.state)
        trow.append("td").text(results.country)
        trow.append("td").text(results.shape)
        trow.append("td").text(results.durationMinutes)
        trow.append("td").text(results.comments)
        console.log(results)
    });
    console.log(filteredData)
    
    
};  

var clear = d3.select("#clear-btn");
clear.on("click", runClear);
function runClear() {
    tableData.forEach(function(clear) {
        console.log(clear);
        d3.event.preventDefault();
        var trow = tbody.append("tr");
        trow.append("td").text(clear.datetime)
        trow.append("td").text(clear.city)
        trow.append("td").text(clear.state)
        trow.append("td").text(clear.country)
        trow.append("td").text(clear.shape)
        trow.append("td").text(clear.durationMinutes)
        trow.append("td").text(clear.comments)
});
};
