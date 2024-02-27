// Restructure flight log data type

type flightLogType = {
  id: number,
  passengerName: string,
  isArrived: boolean,
  departure: {
    airport: string,
    timestamp: number
  },
  arrival: {
    airport: string | null,
    timestamp: number | null
  }
}

export class FlightLogService {
  initialData : flightLogType[]= [
    {
      id: 1,
      passengerName: "cherprang",
      isArrived: true,
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
