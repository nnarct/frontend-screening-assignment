function LogItem(props) {
  const { item } = props;

  // Formate the date-time from Unix epoch timestamp to dd/mm/year hh:mm (24hours format)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  const date = (new Date(item.timestamp * 1000)).toLocaleString('th-TH', options);

  return (
    <div style={{ display: "flex" }}>
      {/* Add [id] column to display [id] of the log */}
      <span style={{ flex: 0.5 }} className="text-center">{item.id}</span>
        {/* Changed size of passenger's name column and timestamp column */}
      <span style={{ flex: 2 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1.5 }}>{item.timestamp}</span>
      {/* Add date-time column */}
      <span style={{ flex: 2 }}>{date}</span> 
      <span style={{ flex: 1 }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
