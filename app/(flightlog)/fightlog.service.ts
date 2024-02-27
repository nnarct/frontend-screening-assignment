export class FlightLogService {
  initialData = [
    {
      passengerName: "cherprang",
      airport: "bangkok",
      timestamp: 1630454400,
      type: "departure",
    },
    {
      passengerName: "sita",
      airport: "chiangmai",
      timestamp: 1630627200,
      type: "departure",
    },
    {
      passengerName: "cherprang",
      airport: "tokyo",
      timestamp: 1630454405,
      type: "arrival",
    },
  ];

  getLogs() {
    return new Promise( (resolve) => {
      // Change function to arrow function
      setTimeout( () =>  {
        resolve(this.initialData || []);
      }, 2000);
    });
  }
}
