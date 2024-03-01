// Restructure flight log data type

export type flightLogType = {
  id: number,
  passengerName: string,
  isArrived: boolean,
  seat: string,
  flightNumber: string,
  gate: string,
  class: string | "Business" | "Economy" | "First Class"
  departure: {
    airport: string,
    timestamp: number,
  },
  arrival: {
    airport: string | null,
    timestamp: number | null,
  }
}

export class FlightLogService {
  initialData : flightLogType[]= [
    {
      id: 1,
      passengerName: "cherprang",
      isArrived: true,
      flightNumber: "A 0137",
      seat: "26A",
      gate: "18",
      class: "Economy",
      departure: {
        airport: "bangkok",
        timestamp:1630454400,
      },
      arrival: {
        airport: "tokyo",
        timestamp: 1630454405,
      }
    },
    {
      id: 2,
      passengerName: "sita",
      isArrived: false,
      flightNumber: "B 625",
      seat: "32F",
      gate: "A1",
      class: "Business",
      departure: {
        airport: "chiangmai",
        timestamp:1630627200
      },
      arrival: {
        airport: null,
        timestamp:null
      }
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
