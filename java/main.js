window.onload = function () {

//  Area Chart
    "use strict";
    var areaChart = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        animationDuration: 750,
        backgroundColor: "transparent",
        axisX: {
            title: "Dagen",
            titleFontColor: "white",
            labelFontColor: "white",
            labelFontFamily: "Montserrat",
            minimum: 0,
            maximum: 5,
            valueFormatString: "D",
            labelFontSize: 12
        },
        axisY: {
            labelFontColor: "white",
            suffix: " L",
            labelFontFamily: "Montserrat",
            labelFontSize: 12
        },
        toolTip: {
            borderThickness: 0,
            cornerRadius: 4,
            backgroundColor: "whtie",
            content: "{x}: {y} L"
        },
        data: [{
            lineColor: "white",
            indexLabelFontColor: "white",
            color: "#0083B0",
            markerColor: "white",
            type: "area",
            dataPoints: [
                { x: 0, y: 12.5, label: "1", indexLabel: "Hoogst", indexLabelFontFamily: "Montserrat", indexLabelFontSize: 12, markerColor: "red" },
                { x: 1, y: 5, label: "2" },
                { x: 2, y: 3, label: "3" },
                { x: 3, y: 8, label: "4" },
                { x: 4, y: 4, label: "5" },
                { x: 5, y: 5, label: "6" }
            ]

        }]
    });
    areaChart.render();
    
//  Doughnut Chart water
    var doughnutChart = new CanvasJS.Chart("chartContainer2", {
        backgroundColor: "transparent",
        exportFileName: "Doughnut Chart",
        exportEnabled: true,
        animationEnabled: true,
        animationDuration: 750,
        legend: {
            fontColor: "white",
            fontSize: 30,
            fontWeight: 100,
            fontFamily: "montserrat",
            cursor: "pointer",
            verticalAlign: "center",
            horizontalAlign: "center",
            markerMargin: -30,
            itemclick: explodePie
        },
        data: [{
            type: "doughnut",
            startAngle:  270,
            innerRadius: 75,
            showInLegend: true,
            legendMarkerType: "none",
            legendText: "{water} #percent%",
            toolTipContent: "<b>{name}</b>: {y} L (#percent%)",
            indexLabel: "{name} - #percent%",
            indexLabelFontColor: "white",
            indexLabelFontFamily: "montserrat",
            indexLabelFontSize: "15",
            dataPoints: [
                { y: 29, name: "Leeg", color: "#d3d3d3", showInLegend: false },
                { y: 71, name: "Vol", color: "#0083B0"}
            ]
        }]
    });
    doughnutChart.render();
    function explodePie(e) {
        if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    }

//  Column Chart eten
    var columnChart = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        backgroundColor: "transparent",
        animationEnabled: true,
        animationDuration: 750,
        axisY: {
            title: "Aantal",
            titleFontColor: "white",
            titleFontFamily: "montserrat",
            labelFontColor: "white",
            labelFontFamily: "montserrat",
            labelFontSize: 12
        },
        axisX: {
            labelFontColor: "white",
            labelFontFamily: "montserrat",
            labelFontSize: 12
        },
        data: [{      
            type: "column",
            dataPoints: [    
                { y: 76, color: "#f0ebd8", label: "Rijst" },
                { y: 54, color: "#d8ca3f", label: "Kip" },
                { y: 67, color: "#00ffb5", label: "Vis" },
                { y: 37, color: "#ff7f7f", label: "Vlees" }
            ]
        }]
    });
    columnChart.render();
    
//  Dynamic Spline Chart
    var dps = [];
    var splineChart = new CanvasJS.Chart("chartContainer4", {
        exportEnabled: true,
        backgroundColor: "transparent",
        axisY: {
            includeZero: false,
            labelFontFamily: "Montserrat",
            labelFontColor: "white",
            maximum: 5,
            minimum: 0
        },
        axisX: {
            labelFontFamily: "Montserrat",
            labelFontColor: "white"
        },
        data: [{
            type: "spline",
            markerSize: 0,
            dataPoints: dps
        }]
    });

    var xVal = 0;
    var yVal = 5;
    var updateInterval = 2000;
    var dataLength = 10; // number of dataPoints visible at any point

    var updateChart = function (count) {
        count = count || 1;
        // count is number of times loop runs to generate random dataPoints.
        for (var j = 0; j < count; j++) {	
            yVal = Math.floor(Math.random() * 5);           
            
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
        if (dps.length > dataLength) {
            dps.shift();
        }
        splineChart.render();
    };

    updateChart(dataLength); 
    setInterval(function(){ updateChart() }, updateInterval); 
    
    function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);
}