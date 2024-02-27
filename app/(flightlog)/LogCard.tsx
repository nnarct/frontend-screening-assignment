import { useState, useEffect } from "react";
import LogItem from "./LogItem";

function LogCard(props) {
  const { data } = props;
  const [logs, setLogs] = useState(data);

  useEffect(() => {
    setLogs(data);
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
        <span style={{ flex: 2 }}>Passenger Name</span>
        <span style={{ flex: 1 }}>Airport</span>
        <span style={{ flex: 1.5 }}>Timestamp</span>
        {/* Add date time for easy to read */}
        <span style={{ flex: 2 }}>Date, Time</span> 
        <span style={{ flex: 1 }}>Type</span>
      </div>
      {/* Add type to avoid error alert */}
      {logs.map((item: { passengerName: any; }) => (
        // Use self-closing tag
        <LogItem key={`${item.passengerName}`} item={item} />
      ))}
    </div>
  );
}

export default LogCard;
