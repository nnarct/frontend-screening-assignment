import { useState , useEffect} from "react";
export const AvgTime = (props) => {
  const { logs } = props
  const routeStats = logs.reduce((stats, log) => {
    if (!log.isArrived) return stats;
    const route = `${log.departure.airport} ${log.arrival.airport}`;
    const duration = log.arrival.timestamp - log.departure.timestamp; // Duration in seconds
    if (!stats[route]) stats[route] = { totalDuration: 0, count: 0 };
    stats[route].totalDuration += duration;
    stats[route].count++;
    return stats;
  }, {});
  const formatDuration = (durationSeconds) => {
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
  const routesArray = Object.entries(routeStats).map(([route, { totalDuration, count }]) => {
    const avgDuration = totalDuration / count;
    return {
      departure: route.split(" ")[0],
      arrival: route.split(" ")[1],
      avg: formatDuration(avgDuration)
    };
  });
  

  const [avg,setAvg] = useState([])

  useEffect(() => {
    setAvg(routesArray)
  }, [logs])

  return (
    <>
     <div></div>
      <div style={{ margin: 16, width: "100%" }} >
        <button className="cursor-pointer bg-green-500 border border-4 border-green-500 hover:bg-white text-green-900 w-full rounded-xl py-2 text-xl">
          Print average time to console
        </button>
        {avg && avg.map((route) => {
          return <div>{route.departure} - {route.arrival} : {route.avg}</div>
        })}
      </div>

    </>)

}