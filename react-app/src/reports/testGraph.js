import React from "react";
import { Bar } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

const TestGraph = (props) => {
  const filteredEntries = props.filteredEntries;

  // console.log("filteredEntries", filteredEntries);

  const times = filteredEntries.map((entry) => entry.time.slice(0, 4));
  const counts = filteredEntries.map((entry) => entry.attendee_count);



  const isolated = [];

  // isolate just times and counts into an array
  for (let i = 0; i < filteredEntries.length; i++) {
    isolated.push({ x: `${times[i]}0`, y: counts[i] });
  }

  // console.log("isolated", isolated)



  const holder = {};
  const accumulated = [];

  // reduce duplicate times and accumulate attendee counts for those duplicate times
  isolated.forEach(function (a) {
    if (holder.hasOwnProperty(a.x)) {
      holder[a.x] = holder[a.x] + a.y;
    } else {
      holder[a.x] = a.y;
    }
  });

  for (const prop in holder) {
    accumulated.push({ x: prop, y: holder[prop] });
  }

  // console.log("accumulated", accumulated)
// 


  let xMin = "";
  let xMax = "";
  if (accumulated.length !== 0) {
    xMin = parseInt(accumulated[0].x);
    xMax = parseInt(accumulated[accumulated.length - 1].x) + 1;
  }

  console.log("min", xMin, "max", xMax)


  const xRange = (xMax - xMin + 1) * 2;

  // console.log(xRange)

  const timeSpanIntervals = [];
  for (let j = xMin; j < xMax; j++) {
    for (let i = 0; i < 6; i++) {
      if (j < 10) {
        timeSpanIntervals.push(`0${j}:${i}0`);
      } else {
        timeSpanIntervals.push(`${j}:${i}0`);
      }
    }
  }

  console.log("timeSpanIntervals", timeSpanIntervals)

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
  if (filteredEntries.length !== 0) {
    totalAttendeeCount = filteredEntries
      .map((entry) => entry.attendee_count)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  return (
    <div className="graph_border">
      <Bar
        data={{
          // labels: filteredEntries.map((entry) => entry.time),
          // labels: accumulated.map((each) => each.x),
          labels: timeSpanIntervals.map((v) => v),
          datasets: [
            {
              backgroundColor: "black",
              borderColor: "black",
              // data: filteredEntries.map((entry) => entry.attendee_count),
              // data: accumulated.map((each) => each.y),
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
                // ticks: {
                //   maxTicksLimit: xRange,
                // },
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
        {totalAttendeeCount} attendees moved in {filteredEntries.length} trips
      </Typography>
    </div>
  );
};

export default TestGraph;
