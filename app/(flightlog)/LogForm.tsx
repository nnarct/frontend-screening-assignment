import { useState, useCallback } from "react";

type emptyFormType = {
  passengerName: string,
  airport: string,
  timestamp: number,
  departureID: null | number
}

const emptyForm: emptyFormType = {
  passengerName: "",
  airport: "",
  timestamp: 0,
  departureID: null
};

function LogForm(props) {
  const { type, onSubmit } = props;

  const [formData, setFormData] = useState(emptyForm);

  const [errorText, setErrorText] = useState<string|null>(null) // Create variable for error text message

  const handleSubmit = useCallback(() => {
    if(formData.passengerName === "" || formData.airport === "" || formData.timestamp.toString().length === 1){
      setErrorText("Please fill all field")
      return;
    }
    formData.timestamp = new Date( formData.timestamp ).getTime() / 1000;
    const res = onSubmit({ ...formData, type }) // Call onSubmit() and get the response into the res
    if (res === true)
      setFormData(emptyForm); // if the data has been submitted successfully with return true, reset form
    else
      setErrorText("No matching departure flight") // if the data hasn't been submitted , display error text
  }, [formData, type, onSubmit]);

  const handleChange = useCallback(({ target }) => {
    setErrorText(null) // remove error text if user made some changes
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }, []);

  return (
  <>
    <div style={{ display: "flex", columnGap: 8 }}>
      {/* Add input for arrival log form for users to select which departure flight they took before adding their arrivals */}
      {type === "arrival" && <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="pname" style={{ fontWeight: "bold" }}>
          Departure ID:
        </label>
        <input
          type="number"
          id="departureID" // Change id and name to match key of emptyForm
          name="departureID"
          value={formData.departureID | 0}
          onChange={handleChange}
        />
      </div>}
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="pname" style={{ fontWeight: "bold" }}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="passengerName" // Change id and name to match key of emptyForm
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="airport" style={{ fontWeight: "bold" }}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="timestamp" style={{ fontWeight: "bold" }}>
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
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        {/* Styled the submit button */}
        <button className="cursor-pointer px-[0.25rem] py-[0.15rem] text-white rounded bg-blue-500 hover:ring hover:ring-2" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    {/* Add error text alert */}
    {errorText && <div className="text-red-400 h-0">{errorText}</div>}
    </>
  );
}

export default LogForm;
