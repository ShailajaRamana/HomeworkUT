function buildTable(
    id,
    ethnicity,
    gender,
    age,
    location,
    bbtype,
    wfreq,
) {
    var table = d3.select("#sample-metadata");
    var tbody = table.append("tbody");
    var trow;
    console.log(id)

    trow = tbody.append("tr");
    trow.append("td").text(`id: ${id}`);
    trow = tbody.append("tr");
    trow.append("td").text(`ethnicity: ${ethnicity}`);
    trow = tbody.append("tr");
    trow.append("td").text(`gender: ${gender}`);
    trow = tbody.append("tr");
    trow.append("td").text(`age: ${age}`);
    trow = tbody.append("tr");
    trow.append("td").text(`location: ${location}`);
    trow = tbody.append("tr");
    trow.append("td").text(`bbtype: ${bbtype}`);
    trow = tbody.append("tr");
    trow.append("td").text(`wfreq: ${wfreq}`);
}

function buildDropdown(
    names, values
) {
    var dropdown = d3.select("#selDataset");
    for (i = 0; i < names.length; i++) {
        var name = names[i];
        var value = values[i]
        var option = dropdown.append(`option`)
        option.attr('value', i)
        option.text(name)
    }
}

let selectedName = "904"
let selectedNameIndex = 0
var data

// 1. Use the D3 library to read in `samples.json`.
const loadData = async() => {
        data = await d3.json("data/samples.json");
        console.log(data);

        // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // Grab values from the response json object to build the plots
        var nameDict = {}
        data.names.forEach((name, index) => {
            nameDict[name] = index
        })
        console.log(nameDict)

        buildDropdown(data.names, data.names)
        selectedName = "940"
        const selectedNameIndex = nameDict[selectedName]

        // 4. Display the sample metadata, i.e., an individual's demographic information.
        //Table values
        var id = data.metadata[selectedNameIndex].id;
        var ethnicity = data.metadata[selectedNameIndex].ethnicity;
        var gender = data.metadata[selectedNameIndex].gender;
        var age = data.metadata[selectedNameIndex].age;
        var location = data.metadata[selectedNameIndex].location;
        var bbtype = data.metadata[selectedNameIndex].bbtype;
        var wfreq = data.metadata[selectedNameIndex].wfreq;
        buildTable(id, ethnicity, gender, age, location, bbtype, wfreq);


        const {
            slicedValues,
            slicedlabels,
            labels,
            values,
            otulabels,
            reversedValues,
            reversedlabels
        } =
        getData()

        var hover = data.samples[selectedNameIndex].otu_labels;
        console.log(hover);

        //Create the traces for bar chart
        var trace1 = {
            x: reversedValues,
            y: reversedlabels,
            type: "bar",
            orientation: "h",
            text: hover
        };


        var data1 = [trace1]

        // Define the plot layout
        var layout = {
            barmode: "group",
            yaxis: {
                gridwidth: 2
            },
            bargap: 0.05
        };


        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data1, layout);

        // 3. Create a bubble chart that displays each sample.
        // * Use`otu_ids` for the x values.
        // * Use`sample_values` for the y values.
        // * Use`sample_values` for the marker size.
        // * Use`otu_ids` for the marker colors.
        // * Use`otu_labels` for the text values.
        var trace1 = {
            x: labels,
            y: values,
            text: hover,
            mode: 'markers',
            marker: {
                color: labels,
                size: values
            }
        };

        var data2 = [trace1];

        var layout = {
            showlegend: false,
        };

        Plotly.newPlot('bubble', data2, layout);

    }
    // 6. Update all of the plots any time that a new sample is selected.
function getData() {
    var values = data.samples[selectedNameIndex].sample_values;
    var sortedValues = values.sort((a, b) => b.labels - a.labels);
    var slicedValues = sortedValues.slice(0, 10);
    var labels = data.samples[selectedNameIndex].otu_ids;
    var slicedlabels = labels.slice(0, 10);
    var reversedValues = slicedValues.reverse();
    //Categorize y axis by name
    var otulabels = slicedlabels.map((label) => {
            return `OTU ID ${label}`
        })
        // * Use`otu_labels` as the hovertext for the chart.
    var reversedlabels = otulabels.reverse();
    return ({ slicedValues, slicedlabels, labels, values, otulabels, reversedValues, reversedlabels })
}

function updatePlotly() {
    console.log("here")
    const {
        slicedValues,
        slicedlabels,
        labels,
        values,
        otulabels,
        reversedValues,
        reversedlabels
    } =
    getData()
    console.log(otulabels)
    var trace1 = {
        x: reversedValues,
        y: reversedlabels,
        type: "bar",
        orientation: "h",
        text: hover
    };
    var hover = data.samples[selectedNameIndex].otu_labels;
    var data1 = [trace1]
    Plotly.restyle("bar", "values", data1);
}

// Function called by DOM changes
function optionChanged() {
    var select = document.getElementById("selDataset");

    selectedNameIndex = select.value;
    selectedName = data.names[selectedNameIndex];
    updatePlotly();
    console.log(selectedName, selectedNameIndex, "a");

}



const main = async() => {


    await loadData()
}
main()
