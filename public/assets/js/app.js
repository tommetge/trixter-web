$(document).ready(function(){

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  $("#item2").highcharts({
    chart: {
      renderTo: 'container',
      type: 'gauge',
      alignTicks: false,
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      borderRadius: 0,
      events: {
        load: function() {
          var point = this.series[0].points[0];
          setInterval(function() {
            $.getJSON('/current', function(data) {
              point.update(data['rpms']);
            });
          }, 1000);
        }
      }
    },
    title: {
      text: 'RPMs'
    },
    pane: {
      startAngle: -150,
      endAngle: 150
    },
    yAxis: [{
      min: 0,
      max: 200,
      offset: -25,
      lineWidth: 2,
      labels: {

      },
      tickLength: 5,
      minorTickLength: 5,
      endOnTick: false
    }],
    series: [{
      name: 'RPMs',
      data: [0]
    }]
  });

  $("#item1").highcharts({
    chart: {
      type: 'spline',
      borderRadius: 0,
      events: {
        load: function() {
          var series = this.series;
          setInterval(function() {
            $.getJSON('/current', function(data) {
              series[0].addPoint(
                [(new Date()).getTime(),
                data['difficulty']],
                true,
                true);
            });
          }, 2000);
        }
      }
    },
    title: {
      text: 'Difficulty'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 100
    },
    yAxis: {
      title: {
        text: 'Level'
      },
      plotlines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'Level',
      data: (function() {
        var data = [],
            time = (new Date()).getTime(),
            i;
        for (i = -19; i <= 0; i++) {
          data.push({
            x: time + i * 2000,
            y: 0
          });
        }
        return data;
      })()
    }]
  });

});
