import Image from "next/image";
import cleverseLogo from "../../public/cleverse.png";
import barcode from "../../public/barcode.svg";

const getTime = (timestamp: number) => {
  if (typeof timestamp !== "number") return "00:00";
  return new Date(timestamp * 1000).toLocaleTimeString("th-TH", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

function BoardingPassCard(props) {
  const { log } = props;

  const formattedDate =
    new Date(log.departure.timestamp * 1000).getDate().toString() +
    new Date(log.departure.timestamp * 1000).toLocaleString("en-US", {
      month: "short",
    });

  return (
    <>
      <div className="bg-sky-500 pb-4 rounded-xl shadow-xl grid grid-cols-12 w-5/6">
        <div className="text-white col-span-2 relative">
          <Image
            src={cleverseLogo}
            alt="airline_logo"
            className="absolute w-4/5 left-4 top-4 z-10 rounded-full border-4  border-white"
          />
        </div>
        <div className="text-white col-span-7 p-3 flex justify-between items-center border-r border-dashed">
          <div className="text-3xl text-semibold">Sky Airlines</div>
          <div className="text-right text-lg">
            Boarding pass<br></br>
            <span className="italic">{log.class}</span>
          </div>
        </div>
        <div className="text-white col-span-3 p-3 flex justify-end">
          <div className="text-right text-lg">
            Boarding pass<br></br>
            <span className="italic">Business</span>
          </div>
        </div>
        <div className="bg-white col-span-2 flex-">
          {/* <Image src={barcode} alt="barcode" style={{ transform: 'rotate(90deg)' }} className="bg-red-400 w-3/4"/> */}
        </div>
        <div className="bg-white col-span-7 border-r border-dashed">
          <div className="grid grid-cols-3 px-3">
            <GirdDetail label="Passenger name">{log.passengerName}</GirdDetail>
            <GirdDetail label="Date">{formattedDate}</GirdDetail>
            <GirdDetail label="Time">
              {getTime(log.departure.timestamp)}
            </GirdDetail>
            <GirdDetail label="From">{log.departure.airport}</GirdDetail>
            <GirdDetail bold label="Flight">
              {log.flightNumber}
            </GirdDetail>
            <GirdDetail bold label="Seat">
              {log.seat}
            </GirdDetail>
            <GirdDetail label="To">{log.arrival.airport}</GirdDetail>
            <GirdDetail bold label="Gate">
              {log.gate}
            </GirdDetail>
            <GirdDetail bold label="Board till">
              {/* Assume board till is 20mins before departure time */}
              {getTime(log.departure.timestamp - 20 * 60)}
            </GirdDetail>
          </div>
        </div>
        <div className="bg-white col-span-3">
          <GirdDetail label="Passenger name" className="py-1">
            {log.passengerName}
          </GirdDetail>
          <GirdDetail label="From" className="py-1">
            {log.departure.airport}
          </GirdDetail>
          <GirdDetail label="To" className="py-1">
            {log.arrival.airport}
          </GirdDetail>
          <div className="grid grid-cols-4">
            <GirdDetail label="Date" className="py-1">
              <span className="leading-3 text-xs">{formattedDate}</span>
            </GirdDetail>
            <GirdDetail label="Time" className="py-1">
              <span className="leading-3 text-xs">
                {getTime(log.departure.timestamp)}
              </span>
            </GirdDetail>
            <GirdDetail bold label="Flight" className="py-1 col-span-2">
              <span className="leading-3 text-xs">{log.flightNumber}</span>
            </GirdDetail>
          </div>
          <div className="grid grid-cols-4">
            <GirdDetail bold label="Seat" className="py-1">
              <span className="leading-3 text-xs">{log.seat}</span>
            </GirdDetail>
            <GirdDetail bold label="Gate" className="py-1">
              <span className="leading-3 text-xs">{log.gate}</span>
            </GirdDetail>
          </div>
        </div>
      </div>
    </>
  );
}

const GirdDetail = ({
  label,
  children,
  bold,
  className,
}: {
  label: string;
  children: React.ReactNode;
  bold?: boolean;
  className?: string;
}) => {
  return (
    <div className={`p-2 ${className}`}>
      <div className="text-gray-600 text-sm leading-5">{label}</div>
      <div className={`${bold ? "font-bold" : ""} uppercase leading-3`}>
        {children}
      </div>
    </div>
  );
};

// TODO: add propTypes
// BoardingPassCard.propTypes = {};

export default BoardingPassCard;
