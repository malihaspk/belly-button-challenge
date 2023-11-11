let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
 
let metasamples = data.metadata;
let newArray = metasamples.wfreq[0];

// Gauge Chart
 var gauge_data = [{
    type: "indicator",
    mode: "gauge+number",
    value: newArray,
    title: { text: "Weekly Scrub Frequency" },
    gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
            { range: [0, 1], color: "lightgreen" },
            { range: [1, 2], color: "lightgreen" },
            { range: [2, 3], color: "mediumseagreen" },
            { range: [3, 4], color: "mediumseagreen" },
            { range: [4, 5], color: "seagreen" },
            { range: [5, 6], color: "seagreen" },
            { range: [6, 7], color: "darkgreen" },
            { range: [7, 8], color: "darkgreen" },
            { range: [8, 9], color: "darkgreen" }

        ]
    }
}];

var gaugelayout = {
    width: 400,
    height: 300,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('gauge', gauge_data, gaugelayout);
