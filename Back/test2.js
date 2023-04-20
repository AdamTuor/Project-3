// Setup the selectors used for building the URL

//const neighborhood = $('#select-neighborhood')
const neighborhood = d3.select('#neighborhood');
const crimeType = d3.select('#crime-type');
const yearStart = d3.select('#start-year');
const yearEnd = d3.select('#end-year');
//const submit = d3.select('#submit-button');

//neighborhood.on("select2:select", handleChange)
//neighborhood.on("select2:unselect", handleChange)
//neighborhood.on("select2:clear", handleChange)

//neighborhood.on("change", handleChange)
//crimeType.on("change", handleChange)
//yearStart.on("change", handleChange)
//yearEnd.on("change", handleChange)
//submit.on("click", handleChange);
d3.select('form')
  .on('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and resetting options
    handleChange(); // Call your function to handle the form submission
  });


let crimeData = null;

function plotCharts()
{
    // Create a dynamic link based on user input
    let url = `http://localhost:5000/crime_data?crime_type=${crimeType.property("value")}&neighborhood=${neighborhood.property("value")}&start_year=${yearStart.property("value")}&end_year=${yearEnd.property("value")}`;
    fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        console.log(data);
        let crimeData = data.data;
        let counts = {};
        console.log("We made it into the fetch");
        crimeData.forEach((crime)=>
        {
            let year = crime.REPORT_YEAR;
            counts[year] = (counts[year] || 0) +1;
            console.log("We're in the for loop");
            
        });
        console.log(counts);
        console.log(Object.keys(counts));
        console.log(Object.values(counts));
        const yearlyCrimeTrace =
        {
            x:Object.keys(counts),
            y:Object.values(counts),
            type:"line",
            name:"Yearly"
            
        };
        const yearlyCrimeLayout =
        {
            title:`Yearly crime occurences`,
            xaxis:
            {
                title:"Year"
            },
            yaxis:
            {
                title:"Number of Crimes each Year"
            }
        };

        console.log('Plotly:', Plotly);
        let lineData = [yearlyCrimeTrace];
        Plotly.newPlot("yearly-line-plot",lineData,yearlyCrimeLayout);


    });
}



function handleChange()
{
    console.log("Handling changes");
    let neighborhoodVal = neighborhood.property("value");
    let crimeTypeVal = crimeType.property("value");
    let yearStartVal = yearStart.property("value");
    let yearEndVal = yearEnd.property("value");
    plotCharts();
    
}

function setup()
{   
    fetch('http://localhost:5000/neighborhoods')
    .then(response => response.json())
    .then(data => 
    {
        neighborhood.selectAll("option")
        .data(data.data)
        .enter()
        .append("option")
        .attr("value", d => d.value)
        .text(d => d.text);
      });
    //plotCharts();
}
// function plotExampleData() 
// {
//     const exampleData = {
//       x: ["2014", "2015", "2016", "2017", "2018", "2019"],
//       y: [9, 4, 6, 1, 8, 14],
//       type: "line",
//       name: "Yearly"
//     };
  
//     const exampleLayout = {
//       title: "Yearly crime occurrences",
//       xaxis: {
//         title: "Year"
//       },
//       yaxis: {
//         title: "Number of Crimes each Year"
//       }
//     };
  
//     Plotly.newPlot("yearly-line-plot", [exampleData], exampleLayout);
// }
  

setup();
//plotExampleData();
