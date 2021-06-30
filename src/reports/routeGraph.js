import React from "react";
import { Bar } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

const RouteGraph = (props) => {
  const entries = props.filteredEntries;
  const accumulated = props.accumulated;
  const xRange = props.xRange;
  const timeSpanIntervals = props.timeSpanIntervals


  // get the attendee count for each time interval, those with no data set y = 0 (meaning the bar has no height)
  function getAttendeeCountOrMakeZero(x) {
    for (let each of accumulated) {
      if (x === each.x) {
        return each.y;
      }
    }
    return 0;
  }

  let totalAttendeeCount = 0;
  if (entries.length !== 0) {
    totalAttendeeCount = entries
      .map((entry) => entry.attendee_count)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  return (
    <div className="graph_border">
      <Bar
        data={{
          labels: timeSpanIntervals.map((v) => v),
          datasets: [
            {
              backgroundColor: "black",
              borderColor: "black",
              data: timeSpanIntervals.map((v) => getAttendeeCountOrMakeZero(v)),
            },
          ],
        }}
        options={{
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  maxTicksLimit: xRange,
                },
              },
            ],
            yAxes: [
              {
                display: true,
              },
            ],
          },
        }}
      />
      <Typography align="center">All Routes</Typography>
      <Typography align="center">
        {totalAttendeeCount} attendees moved in {entries.length} trips
      </Typography>
    </div>
  );
};

export default RouteGraph;
