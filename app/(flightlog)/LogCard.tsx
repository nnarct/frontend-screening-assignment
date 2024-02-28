import { useState, useEffect } from "react";
import LogItem from "./LogItem";

function LogCard(props) {
  const { data } = props;

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    // Since one flight log collect both departure and arrival flights' detail 
    // but the flight logs card must display each departure and arrival log separately
    // therefor we have to create the new structure model for the display data
    let formattedLogs: any = []
    data.forEach((flight : any) => {
      const departureLog = {
          id: flight.id,
          passengerName: flight.passengerName,
          airport: flight.departure.airport,
          timestamp: flight.departure.timestamp,
          type: "departure"
        }
      formattedLogs.push(departureLog)
      if (flight.isArrived) {
        const arrivalLog = {
          id: flight.id,
          passengerName: flight.passengerName,
          airport: flight.arrival.airport,
          timestamp: flight.arrival.timestamp,
          type: "arrival"
        }
        formattedLogs.push(arrivalLog)
      }
    })
    formattedLogs = formattedLogs.slice().sort((log1, log2) => log1.timestamp - log2.timestamp);
    setLogs(formattedLogs);
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: 4,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {/* Changed size of passenger's name column and timestamp column */}
        <span style={{ flex: 0.5 }} className="text-center">ID</span>
        <span style={{ flex: 2 }}>Passenger Name</span>
        <span style={{ flex: 1 }}>Airport</span>
        <span style={{ flex: 1.5 }}>Timestamp</span>
        {/* Add date time for easy to read */}
        <span style={{ flex: 2 }}>Date, Time</span>
        <span style={{ flex: 1 }}>Type</span>
      </div>
      {/* Add type to avoid error alert */}
      {logs.map((item: { passengerName: any; }, idx) => (
        // Use self-closing tag
        <LogItem key={idx} item={item} />
      ))}
    </div>
  );
}

export default LogCard;
