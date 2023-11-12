let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function for drop down menue
function dropdownmenue(){

d3.json(url).then((data) => {
    console.log(data);
    // access the dropdown selector from the index.html file
    let selector = d3.select("#selDataset");
    let sampleNames = data.names;
            
    sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });        
    metatable(sampleNames[0])
    charts(sampleNames[0])


});
}

//calling the drop down function
dropdownmenue()

// function that populates the demographics box
function metatable(sample_id){

   // used d3.json in order to get all of the data
    
   d3.json(url).then((data) => {
        console.log(data);
       
        let selector = d3.select("#sample-metadata");
        // get all of the metadata
        let metasamples = data.metadata;
        let newArray = metasamples.filter(number => number.id == sample_id)[0];
// clear the metadata out
        selector.html("")
 
// use Object.entries to get the key/value pairs and put into the demographics box on the page
       Object.entries(newArray).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            selector
                .append("h5")
                .text(`${key}:${value}`)


          });


  });
    }
// function that executes when the selected option in the dropdown 
//menue changes.It updates the metadata and charts.
    function optionChanged (sample_id){

        metatable(sample_id)
        charts(sample_id)
    }

  // defining a function for charts including bubble chart, bar chart,guage chart
  
    
    function charts(sample_id){

        d3.json(url).then((data) => {
            console.log(data);
           
  //getting the samples from the data
            let metasamples = data.samples;
 // filter based on the value of the sample (should be 1 result)
            let newArray = metasamples.filter(number => number.id == sample_id)[0];
            
//getting the meta data for charts
            
            let metadatasample = data.metadata;
 // filter based on the value of the metadata ID (should be 1 result)           
            let newArray1 =  metadatasample.filter(number => number.id == sample_id)[0];

//used object.values for reaching the wfreq(washing frequency)in the metadata

            let washFrequency = Object.values(newArray1)[6];
           
// extracting all values that needed to display the bubble chart

//  otu_ids for the x values and for the marker colors.
otu_ids = newArray.otu_ids

//  sample_values for the y values and for the marker size
sample_values = newArray.sample_values

// otu_labels for the text values.
otu_labels = newArray.otu_labels

// set up the bubble chart 

 var bubble_data = {
    x: otu_ids ,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values,
      //colorscale: 'Viridis'
    }
  };
  
  var bubbledata = [bubble_data];

  // set up the layout
  var bubblelayout = {
    title: 'Bacteria cultures per sample',
    showlegend: false,
    
  };
   // call Plotly to plot the bubble chart on the page
  
  Plotly.newPlot('bubble', bubbledata, bubblelayout);



// set up the bar chart
var bardata = [{
    type: 'bar',
    x: sample_values.slice(0, 10).reverse(),
    y: otu_ids.slice(0, 10).map(id =>`OTU${id}`).reverse(),
    orientation: 'h',
    text: otu_labels.slice(0, 10).reverse(),
    hoverinfo: 'text+y' 
  }

  ];
 // set up the layout
  var barlayout = {
    title: 'Top 10 Belly Button Bacteria',
    showlegend: false,
    
  };
  // call Plotly to plot the bar chart on the page
  Plotly.newPlot('bar', bardata,barlayout);

  


// setting up Gauge Chart
 var gauge_data = [{
    type: "indicator",
    mode: "gauge+number",
    value: washFrequency,
    title: { text: "Weekly Scrub Frequency" },
    gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
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
            { range: [8, 9], color: "darkgreen" },
            { range: [9, 10], color: "darkgreen" }

        ]
    }
}];
//setting up the lay out
var gaugelayout = {
    width: 400,
    height: 300,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
};
// call Plotly to plot the guage chart on the page
Plotly.newPlot('gauge', gauge_data, gaugelayout);
// });


  
   });
        }
