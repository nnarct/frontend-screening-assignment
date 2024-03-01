"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import {
  FlightLogService,
  flightLogType,
} from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import { AvgTime } from "../(flightlog)/AvgTime";
import BoardingPassCard from "../(boardingpass)/BoardingPassCard";
import ArrivalForm from "../(flightlog)/ArrivalForm";
import DepartureForm from "../(flightlog)/DepartureForm";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<flightLogType[]>([]);

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
          <LogCard style={{ width: "100%" }} data={logs} />
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <DepartureForm logs={logs} setLogs={setLogs}></DepartureForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <ArrivalForm logs={logs} setLogs={setLogs} />
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Average time of route</h2>
          <AvgTime logs={logs} />
        </div>

        {/* Render boarding pass here */}
        <div className="flex flex-col w-full items-center space-y-8">
          {logs.map((log) => {
            return log.isArrived ? (
              <BoardingPassCard key={log.id} log={log} />
            ) : null;
          })}{" "}
        </div>
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
