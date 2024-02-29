"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
import { AvgTime } from "../(flightlog)/AvgTime";
import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState([]);

  // Separate functions to handle logical processes for adding departure and arrival logs respectively
  const handleAddDepartureLog = useCallback(
    // Function to handle adding a departure log
    (log: any) => {
      const flight = {
        id: logs.length + 1,
        isArrived: false,
        passengerName: log.passengerName,
        departure: {
          airport: log.airport,
          timestamp: log.timestamp
        },
        arrival: {
          airport: null,
          timestamp: null
        },
      }
      setLogs(prevLogs => [...prevLogs, flight]);
      return true
    },
    [logs]
  );

  const handleAddArrivalLog = useCallback(
    // Function to handle adding an arrival log
    (log: any) => {
      let pass = true
      setLogs(prevLogs => {
        
        const id = Number(log.departureID) // Convert string to number

        // Find the index of the object in prevLogs where object.id matches id
        // and object.passengerName matches form's passengerName
        // and the flight must not have arrived
        const index = prevLogs.findIndex(obj => (obj.id === id && obj.passengerName === log.passengerName && obj.isArrived === false));

        if (index !== -1) {
          // Create a copy of the object with the arrival property updated
          const updatedObject = { ...prevLogs[index], arrival: { airport: log.airport, timestamp: log.timestamp }, isArrived: true };

          // Create a new array with the updated object at the same index
          const output = [...prevLogs.slice(0, index), updatedObject, ...prevLogs.slice(index + 1)];
          return output;
        } else {
          pass = false
          // Return the previous state without modifications
          return prevLogs;
        }
      });
      return pass
    },
    [logs]
  );

  useEffect(() => {
    const fetch = async () => {
      const data: any = await flightLogService.getLogs();
      setLogs(data);
    };

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Flight Logs</h2>
          <LogCard style={{ width: "100%" }} data={logs}></LogCard>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"departure"}
            onSubmit={handleAddDepartureLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"arrival"}
            onSubmit={handleAddArrivalLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Average time of route</h2>
          <AvgTime logs={logs} />
        </div>
      
        {/* Render boarding pass here */}
        {logs.map((log, i) => {
          return  log.isArrived ?  <BoardingPassCard key={i} log={log} /> : null
        })} 
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
