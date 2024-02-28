import { useEffect, useState } from "react";

const formatDuration = (durationSeconds: number) => {
  const days = Math.floor(durationSeconds / (3600 * 24));
  const hours = Math.floor((durationSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = durationSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}hr`);
  if (minutes > 0) parts.push(`${minutes}min`);
  if (seconds > 0) parts.push(`${seconds}sec`);

  return parts.join(" ");
};

export const AvgTime = (props) => {
  const { logs } = props;

  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [avg, setAvg] = useState([]);

  const calculateAvgTime = () => {
    const routeStats = logs.reduce(
      (
        stats: { [x: string]: { count: number } },
        log: {
          isArrived: boolean;
          departure: { airport: string; timestamp: number };
          arrival: { airport: string | null; timestamp: number | null };
        }
      ) => {
        if (!log.isArrived) return stats;
        const route = `${log.departure.airport} ${log.arrival.airport}`;
        const duration = log.arrival.timestamp - log.departure.timestamp; // Duration in seconds
        if (!stats[route]) stats[route] = { totalDuration: 0, count: 0 };
        stats[route].totalDuration += duration;
        stats[route].count++;
        return stats;
      },
      {}
    );

    const routesArray = Object.entries(routeStats).map(
      ([route, { totalDuration, count }]) => {
        const avgDuration = totalDuration / count;
        return {
          departure: route.split(" ")[0],
          arrival: route.split(" ")[1],
          avg: formatDuration(avgDuration),
        };
      }
    );
    setAvg(routesArray);
    setLastUpdate(new Date());
    return routesArray;
  };

  return (
    <>
      <div>
        <div className="bg-gray-300 rounded w-fit px-2">
          Last update: {lastUpdate.toLocaleString()}
        </div>
        <div>
          {avg?.map((route) => {
            return (
              <li key={`${route.departure}${route.arrival}`}>
                {route.departure} - {route.arrival} : {route.avg}
              </li>
            );
          })}
        </div>
        <button
          onClick={calculateAvgTime}
          className="cursor-pointer bg-green-500 border border-1 border-green-500 hover:bg-white text-green-900 rounded-xl py-1 px-2 mt-1"
        >
          Print average time
        </button>
      </div>
    </>
  );
};
