import React from "react";
import { Bar } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

const AllPlacesGraph = (props) => {
  const filteredEntries = props.filteredEntries;
  const place = props.place;
  const times = props.times;
  const counts = props.counts;
  const xRange = props.xRange;
  const timeSpanIntervals = props.timeSpanIntervals;
  const yMax = props.yMax;

  const placeEntries = filteredEntries.filter((each) =>
    each.z.includes(place.name)
  );

  // round times down to nearest 10 minutes and put it and attendee counts into new array
  const isolated = [];
  for (let i = 0; i < filteredEntries.length; i++) {
    if (filteredEntries[i].z.includes(place.name)) {
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

  let totalAttendeeCount = 0;
  if (placeEntries.length !== 0) {
    totalAttendeeCount = placeEntries
      .map((entry) => entry.y)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  const removeClass = () => {
    document.getElementById(`${place.id}`).classList.remove("graph_border");
  };

  return (
    <>
      {totalAttendeeCount !== 0 ? (
        <div
          className="places_graph_border"
          onClick={removeClass}
          id={place.id}
        >
          <Bar
            data={{
              labels: timeSpanIntervals.map((v) => v),
              datasets: [
                {
                  backgroundColor: place.route.color,
                  borderColor: "black",
                  borderWidth: 0.5,
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
          <Typography align="center">{place.name}</Typography>
          <Typography align="center">
            {totalAttendeeCount} attendees moved in {placeEntries.length} trips
          </Typography>
        </div>
      ) : (
        <div
          className="places_graph_border"
          style={{ padding: "20px 0 20px 0" }}
        >
          <Typography align="center" style={{ marginTop: 40 }}>
            There is no ridership data for {place.name}
          </Typography>
        </div>
      )}
    </>
  );
};

export default AllPlacesGraph;
