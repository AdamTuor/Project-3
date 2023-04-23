// Setup the selectors used for building the URL
const neighborhood = d3.select('#neighborhood');
const crimeType = d3.select('#crime-type');
const yearStart = d3.select('#start-year');
const yearEnd = d3.select('#end-year');
const neighborhood2 = document.getElementById('neighborhood');
let mymap;
let markerLayer;


d3.select('form')
  .on('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and resetting options
    handleChange(); // Call function to handle user input
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
        

        
        //  Loop through the data and count the number of crimes for each year
        crimeData.forEach((crime)=>
        {
            let year = crime.REPORT_YEAR;
            // add to the year or initialize if it's 0.
            counts[year] = (counts[year] || 0) +1;
        
            
        });

        const yearlyCrimeTrace =
        {
            x:Object.keys(counts),
            y:Object.values(counts),
            type:"line",
            name:"Yearly"
            
        };
        
        const yearlyCrimeLayout =
        {
            title:`${crimeType.property("value")} in ${neighborhood2.selectedOptions[0].textContent} from ${yearStart.property("value")}-${yearEnd.property("value")}`,
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
function plotRadialCharts() 
{
    // Create a dynamic link based on user input
    let url = `http://localhost:5000/radial?neighborhood=${neighborhood.property("value")}&start_year=${yearStart.property("value")}&end_year=${yearEnd.property("value")}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        
        let crimes = ['Auto Theft','Assault','Bike Theft','Homicide','Robbery','Shooting','Theft from MV','Theft Over','B&E'];
        let crimeKeys = ['auto_theft', 'assault', 'bike_theft', 'homicide', 'robbery', 'shooting', 'theft_from_vehicle', 'theft_over', 'break_and_enter'];
        let crimeCounts = data.data;
        console.log(crimeCounts);
        // Did not want the table names to be on the chart, mapped the keys to the values returned but used crimes array for names
        let radialData = [{
            r: crimeKeys.map(key => crimeCounts[key]),
            theta: crimes,
            name: "Crimes",
            type: "scatterpolar",
            fill: "toself"
          }];
  
        const radialLayout = {
          title: `Crime breakdown in ${neighborhood2.selectedOptions[0].textContent} from ${yearStart.property("value")}-${yearEnd.property("value")}`,
          polar: {
            radialaxis: {
              visible: true,
              range: [0, Math.max(...radialData[0].r)],
            },
          },
        };
        
        Plotly.newPlot("radial-chart", radialData, radialLayout);
      });
}

function plotBarChart()
{
    url = `http://localhost:5000/top5?crime_type=${crimeType.property("value")}&start_year=${yearStart.property("value")}&end_year=${yearEnd.property("value")}`;
    fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        let top5Data = data.data;
        let barTrace ={
            x:Object.keys(top5Data).reverse(),
            y:Object.values(top5Data).reverse(),
            type:'bar'
        };
        let barLayout ={
            title:`Lowest ${crimeType.property("value")} occurence from ${yearStart.property("value")}-${yearEnd.property("value")}`
        };
        
        let barData = [barTrace];

        Plotly.newPlot("bar-chart",barData,barLayout);

    });

}

function initMap() 
{
  // Initialize the map
  var mymap = L.map("mapid").setView([43.6532, -79.3832], 10);
  // Add the tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(mymap);
  markerLayer = L.layerGroup().addTo(mymap);
}

function updateMarkers()
{

  url = `http://localhost:5000/crime_data?crime_type=${crimeType.property("value")}&neighborhood=${neighborhood.property("value")}&start_year=${yearStart.property("value")}&end_year=${yearEnd.property("value")}`;
  // Load the crime data from the specified URL and plot markers on the map
  fetch(url)
  .then(response => response.json())
  .then(data =>  
  {
      console.log("data1");
      console.log(data.data);
      mapData = data.data;

      // Clear existing markers from the layer group
      markerLayer.clearLayers();
      crimeTypeMap = crimeType.property("value");
      mapData.map((row) => 
      {
        // console.log(row.X);
        var lat = row.Y;
        var lng = row.X;
        var marker = L.marker([lat, lng]);
        console.log(marker);
        // Add the marker to the layer group instead of directly to the map
        markerLayer.addLayer(marker);
        if(crimeTypeMap !== "bike_theft" && crimeTypeMap !=="homicide" && crimeTypeMap !=="shooting")
        {
          var popupContent =
            "<div class='marker-popup'>" +
            "<h3>Crime Info</h3>" +
            // "<br> --------- </br>" +
            "Neighbourhood: " +
            row.NEIGHBOURHOOD_158 +
            "<br>Reported: " +
            row.REPORT_MONTH + " " +row.REPORT_YEAR +
                      
            "<br>Offence: "+row.OFFENCE+
            "</div>";
          marker.bindPopup(popupContent);
        }
        else if(crimeTypeMap == "bike_theft")
        {
          var popupContent =
            "<div class='marker-popup'>" +
            "<h3>Crime Info</h3>" +
            // "<br> --------- </br>" +
            "Neighbourhood: " +
            row.NEIGHBOURHOOD_158 +
            "<br>Reported: " +
            row.REPORT_MONTH + " " +row.REPORT_YEAR +
                      
            "<br>Offence: "+row.PRIMARY_OFFENCE+
            "</div>";
          marker.bindPopup(popupContent);
        }
        else
        {
          var popupContent =
            "<div class='marker-popup'>" +
            "<h3>Crime Info</h3>" +
            // "<br> --------- </br>" +
            "Neighbourhood: " +
            row.NEIGHBOURHOOD_158 +
            "<br>Reported: " +
            row.REPORT_MONTH + " " +row.REPORT_YEAR +                
            
            "</div>";
          marker.bindPopup(popupContent);
        }
      })
    });
}



function handleChange()
{
    //console.log("Handling changes");

    plotCharts();
    plotRadialCharts();
    plotBarChart();
    updateMarkers();
    
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
    initMap();
    updateMarkers();

}

  

setup();

