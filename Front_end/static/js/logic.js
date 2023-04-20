// function createMap(bikeStations) {

//     // Create the tile layer that will be the background of our map.
//     let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
  
  
//     // Create a baseMaps object to hold the streetmap layer.
//     let baseMaps = {
//       "Street Map": streetmap
//     };
  
//     // Create an overlayMaps object to hold the bikeStations layer.
//     let overlayMaps = {
//       "Bike Stations": bikeStations
//     };
  
//     // Create the map object with options.
//     let map = L.map("map-id", {
//       center: [40.73, -74.0059],
//       zoom: 12,
//       layers: [streetmap, bikeStations]
//     });
  
//     // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//   }
  
//   function createMarkers(response) {
  
//     // Pull the "stations" property from response.data.
//     let stations = response.data.stations;
  
//     // Initialize an array to hold bike markers.
//     let bikeMarkers = [];
  
//     // Loop through the stations array.
//     for (let index = 0; index < stations.length; index++) {
//       let station = stations[index];
  
//       // For each station, create a marker, and bind a popup with the station's name.
//       let bikeMarker = L.marker([station.lat, station.lon])
//         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
//       // Add the marker to the bikeMarkers array.
//       bikeMarkers.push(bikeMarker);
//     }
  
//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//     createMap(L.layerGroup(bikeMarkers));
//   }
  
  
//   // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
//   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);

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
        Plotly.newPlot("yearly-line-plot",yearlyCrimeTrace,yearlyCrimeLayout);


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
    
}

setup();