import { useState, useCallback } from "react";
import { flightLogType } from "./fightlog.service";

type emptyArrivalFormType = {
  passengerName: string;
  airport: string;
  timestamp: number;
  departureID: number;
};

const emptyForm: emptyArrivalFormType = {
  passengerName: "",
  airport: "",
  timestamp: 0,
  departureID: 1,
};

function ArrivalForm(props: {
  logs: flightLogType[];
  setLogs: React.Dispatch<React.SetStateAction<flightLogType[]>>;
}) {
  const { logs, setLogs } = props;

  const [formData, setFormData] = useState<emptyArrivalFormType>(emptyForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(({ target }: { target: any }) => {
    setErrorMessage(null); // remove error text if user made some changes
    setFormData((prev: emptyArrivalFormType) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }, []);

  // Function to handle adding an arrival log
  const handleAddArrivalLog = useCallback(
    (log: emptyArrivalFormType) => {
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

      setLogs((prevLogs: flightLogType[]) => {
        const id = Number(log.departureID); // Convert string to number

        // Find the index of the object in prevLogs where object.id matches id
        // and object.passengerName matches form's passengerName
        // and the flight must not have arrived
        const index = prevLogs.findIndex(
          (obj: flightLogType) =>
            obj.id === id &&
            obj.passengerName === log.passengerName &&
            obj.isArrived === false
        );

        if (index === -1) {
          // Return the previous state without modifications
          // Set error message
          setErrorMessage("No matching departure flight.");
          return prevLogs;
        } else {
          // Create a copy of the object with the arrival property updated
          const updatedObject = {
            ...prevLogs[index],
            arrival: {
              airport: log.airport,
              timestamp: new Date(log.timestamp).getTime() / 1000,
            },
            isArrived: true,
          };

          return [
            ...prevLogs.slice(0, index),
            updatedObject,
            ...prevLogs.slice(index + 1),
          ];
        }
      });
    },
    [setLogs]
  );

  return (
    <>
      <div className="flex gap-2">
        <div className="flex flex-col">
          <label htmlFor="departureID" className="font-bold">
            <span className="text-red-400">*</span>Departure ID:
          </label>
          <input
            type="number"
            id="departureID" // Change id and name to match key of emptyForm
            name="departureID"
            min="1"
            max={Math.max(
              ...logs.map((log: flightLogType) => log.id)
            ).toString()}
            value={formData.departureID}
            onChange={handleChange}
            className="w-32"
            placeholder="1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pname" className="font-bold">
            <span className="text-red-400">*</span>Passenger Name:
          </label>
          <input
            type="text"
            id="passengerName" // Change id and name to match key of emptyForm
            name="passengerName"
            value={formData.passengerName}
            onChange={handleChange}
            placeholder="Cleverse"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="airport" className="font-bold">
            <span className="text-red-400">*</span>Airport:
          </label>
          <input
            type="text"
            id="airport"
            name="airport"
            value={formData.airport}
            onChange={handleChange}
            placeholder="Bangkok"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="timestamp" className="font-bold">
            <span className="text-red-400">*</span>Date-time:
          </label>
          <input
            type="datetime-local"
            id="timestamp"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-end">
          {/* Styled the submit button */}
          <button
            className="cursor-pointer px-4 py-[0.25rem] text-white rounded bg-blue-500 hover:ring hover:ring-2"
            onClick={() => handleAddArrivalLog({ ...formData })}
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

export default ArrivalForm;
