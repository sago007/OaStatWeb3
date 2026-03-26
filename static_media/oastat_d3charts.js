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
