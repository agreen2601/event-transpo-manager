import React from "react";
import { Bar } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

const AllRoutesGraph = (props) => {
  const filteredEntries = props.filteredEntries;
  const route = props.route;
  const times = props.times;
  const counts = props.counts;
  const xRange = props.xRange;
  const timeSpanIntervals = props.timeSpanIntervals;
  const yMax = props.yMax;

  const routeEntries = filteredEntries.filter((each) =>
    each.z.includes(route.name)
  );

  // round times down to nearest 10 minutes and put it and attendee counts into new array
  const isolated = [];
  for (let i = 0; i < filteredEntries.length; i++) {
    if (filteredEntries[i].z.includes(route.name)) {
      isolated.push({ x: `${times[i]}0`, y: counts[i] });
    } else {
      isolated.push({ x: `${times[i]}0`, y: 0 });
    }
  }

  const holder = {};

  // reduce duplicate times and accumulate attendee counts for those duplicate times
  isolated.forEach(function (a) {
    if (holder.hasOwnProperty(a.x)) {
      holder[a.x] = holder[a.x] + a.y;
    } else {
      holder[a.x] = a.y;
    }
  });

  const accumulated = [];

  for (const prop in holder) {
    accumulated.push({ x: prop, y: holder[prop] });
  }

  // get the attendee count for each time interval, those with no data set y = 0 (meaning the bar has no height)
  function getAttendeeCountOrMakeZero(x) {
    for (let each of accumulated) {
      if (x === each.x) {
        return each.y;
      }
    }
    return 0;
  }

  let routeName = "";
  parseInt(route.name) < 10
    ? (routeName = route.name.slice(1))
    : (routeName = route.name);

  let totalAttendeeCount = 0;
  if (routeEntries.length !== 0) {
    totalAttendeeCount = routeEntries
      .map((entry) => entry.y)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  return (
    <>
      {totalAttendeeCount !== 0 ? (
        <div className="places_graph_border">
          <Bar
            data={{
              labels: timeSpanIntervals.map((v) => v),
              datasets: [
                {
                  backgroundColor: route.color,
                  borderColor: "black",
                  borderWidth: .5,
                  data: timeSpanIntervals.map((v) =>
                    getAttendeeCountOrMakeZero(v)
                  ),
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
                    ticks: {
                      suggestedMax: yMax,
                    },
                  },
                ],
              },
            }}
          />
          {isNaN(route.name) === true ? (
            <Typography align="center">
              {routeName} {route.description}
            </Typography>
          ) : (
            <Typography align="center">
              Route {routeName} {route.description}
            </Typography>
          )}
          <Typography align="center">
            {totalAttendeeCount} attendees moved in {routeEntries.length} trips
          </Typography>
        </div>
      ) : (
        <div className="places_graph_border" style={{padding: "20px 0 20px 0"}}>
          {isNaN(route.name) === true ? (
            <Typography align="center">
              There is no ridership data for {routeName} {route.description}
            </Typography>
          ) : (
            <Typography align="center">
              There is no ridership data for Route {routeName}{" "}
              {route.description}
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export default AllRoutesGraph;
