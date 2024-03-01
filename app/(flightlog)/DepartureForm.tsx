import { useState, useCallback } from "react";
import { flightLogType } from "./fightlog.service";

type emptyDepartureFormType = {
  passengerName: string;
  airport: string;
  timestamp: number;
  flightNumber: string;
  seat: string;
  gate: string;
  class: string | "Economy" | "Business" | "First Class";
};

const emptyForm: emptyDepartureFormType = {
  passengerName: "",
  airport: "",
  timestamp: 0,
  flightNumber: "",
  seat: "",
  gate: "",
  class: "",
};

function DepartureForm(props: {
  logs: flightLogType[];
  setLogs: React.Dispatch<React.SetStateAction<flightLogType[]>>;
}) {
  const { logs, setLogs } = props;

  const [formData, setFormData] = useState<emptyDepartureFormType>(emptyForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(({ target }: { target: any }) => {
    setErrorMessage(null); // remove error text if user made some changes
    setFormData((prev: emptyDepartureFormType) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }, []);

  // Function to handle adding a departure log
  const handleAddDepartureLog = useCallback(
    (log: emptyDepartureFormType) => {
      // This is temporary validation , better use promise or etc.

      if (log.passengerName === "") {
        setErrorMessage("Please enter passenger name.");
        return false;
      }

      if (log.airport === "") {
        setErrorMessage("Please enter airport name.");
        return false;
      }

      if (log.timestamp.toString().length === 1) {
        setErrorMessage("Please enter date.");
        return false;
      }

      if (log.flightNumber === "") {
        setErrorMessage("Please enter flight number.");
        return false;
      }

      if (log.seat === "") {
        setErrorMessage("Please enter seat.");
        return false;
      }

      if (log.class === "") {
        setErrorMessage("Please enter class.");
        return false;
      }

      const flight = {
        id: logs.length + 1,
        isArrived: false,
        passengerName: log.passengerName,
        flightNumber: log.flightNumber,
        seat: log.seat,
        class: log.class,
        gate: log.gate,
        departure: {
          airport: log.airport,
          timestamp: new Date(log.timestamp).getTime() / 1000,
        },
        arrival: {
          airport: null,
          timestamp: null,
        },
      };
      setLogs((prevLogs: flightLogType[]) => [...prevLogs, flight]);
      return true;
    },
    [logs.length, setLogs]
  );

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col">
          <label htmlFor="pname" className="font-bold">
            Passenger Name:
          </label>
          <input
            type="text"
            id="passengerName" // Change id and name to match key of emptyForm
            name="passengerName"
            value={formData.passengerName}
            onChange={handleChange}
            placeholder="Nannapat"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="airport" className="font-bold">
            Airport:
          </label>
          <input
            type="text"
            id="airport"
            name="airport"
            value={formData.airport}
            onChange={handleChange}
            placeholder="Narita"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="timestamp" className="font-bold">
            Date-time:
          </label>
          <input
            type="datetime-local"
            id="timestamp"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="flightNumber" className="font-bold">
            Flight number:
          </label>
          <input
            type="text"
            id="flightNumber"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            placeholder="A 0123"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="seat" className="font-bold">
            Seat:
          </label>
          <input
            type="text"
            id="seat"
            name="seat"
            value={formData.seat}
            onChange={handleChange}
            placeholder="24D"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="gate" className="font-bold">
            Gate:
          </label>
          <input
            type="text"
            id="gate"
            name="gate"
            value={formData.gate}
            onChange={handleChange}
            placeholder="A2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="class" className="font-bold">
            Class:
          </label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="Economy"
          />
        </div>
        <div className="flex items-end">
          {/* Styled the submit button */}
          <button
            className="cursor-pointer px-4 py-[0.25rem] text-white rounded bg-blue-500 hover:ring hover:ring-2"
            onClick={() => handleAddDepartureLog({ ...formData })}
          >
            Submit
          </button>
        </div>
      </div>
      {/* Add error text alert */}
      {errorMessage && <div className="text-red-400 h-0">{errorMessage}</div>}
    </>
  );
}

export default DepartureForm;
