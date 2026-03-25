function renderScoreGraph(containerSelector, dataUrl) {
  var margin = { top: 20, right: 120, bottom: 40, left: 50 };
  var width = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select(containerSelector)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json(dataUrl).then(function (json) {
    var players = json.players;
    if (!players || players.length === 0) {
      d3.select(containerSelector).append("p").text("No score data available.");
      return;
    }

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xExtent = [
      0,
      d3.max(players, function (p) {
        return d3.max(p.data, function (d) {
          return d[0];
        });
      }),
    ];
    var yExtent = [
      d3.min(players, function (p) {
        return d3.min(p.data, function (d) {
          return d[1];
        });
      }),
      d3.max(players, function (p) {
        return d3.max(p.data, function (d) {
          return d[1];
        });
      }),
    ];

    var x = d3.scaleLinear().domain(xExtent).range([0, width]);
    var y = d3.scaleLinear().domain(yExtent).range([height, 0]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Time (seconds)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Score");

    var line = d3
      .line()
      .x(function (d) {
        return x(d[0]);
      })
      .y(function (d) {
        return y(d[1]);
      });

    players.forEach(function (player, i) {
      svg
        .append("path")
        .datum(player.data)
        .attr("fill", "none")
        .attr("stroke", color(i))
        .attr("stroke-width", 2)
        .attr("d", line);

      svg
        .append("text")
        .attr("x", width + 5)
        .attr(
          "y",
          y(player.data[player.data.length - 1][1]),
        )
        .attr("fill", color(i))
        .style("font-size", "11px")
        .text(player.name);
    });
  }).catch(function (err) {
    console.error("Score graph error:", err);
    d3.select(containerSelector).append("p").text("Failed to load score data.");
  });
}

function renderWeaponPieChart(containerSelector, dataUrl) {
  var width = 500;
  var height = 400;
  var radius = Math.min(width, height) / 2 - 20;

  var svg = d3
    .select(containerSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json(dataUrl).then(function (json) {
    var rows = json.rows;
    if (!rows || rows.length === 0) {
      d3.select(containerSelector).append("p").text("No weapon data available.");
      return;
    }

    var data = rows.map(function (r) {
      var weaponId = r.cell[0];
      var label =
        typeof weaponFormatter === "function"
          ? weaponFormatter(weaponId)
          : weaponId;
      return { label: label, value: Number(r.cell[1]) };
    });

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var pie = d3
      .pie()
      .value(function (d) {
        return d.value;
      })
      .sort(null);

    var arc = d3.arc().innerRadius(0).outerRadius(radius);
    var labelArc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    var arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d, i) {
        return color(i);
      })
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    arcs
      .append("text")
      .attr("transform", function (d) {
        return "translate(" + labelArc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(function (d) {
        var pct = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
        return pct > 5 ? d.data.label : "";
      });

    svg
      .append("text")
      .attr("y", -height / 2 + 15)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Kills by weapon");
  }).catch(function (err) {
    console.error("Pie chart error:", err);
    d3.select(containerSelector).append("p").text("Failed to load weapon data.");
  });
}
