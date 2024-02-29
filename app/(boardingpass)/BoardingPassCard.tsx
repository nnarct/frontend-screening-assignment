function BoardingPassCard(props) {
  const { log } = props;
  return (
    <>
      <div className="flex border border-red rounded-xl w-full">
        <div className="rounded-tl-xl -z-1 flex w-1/6 bg-blue-300 text-white">
          <div>Logo and barcode</div>
        </div>
        <div className="p-3 flex justify-between items-center w-2/3 bg-yellow-300">
          <div className="text-3xl text-semibold">Sky Airlines</div>
          <div className="text-right text-lg">
            Boarding pass<br></br>
            <span className="italic">Business</span>
          </div>
        </div>
        <div className="rounded-tr-xl p-3 flex w-1/4 bg-green-300 justify-end">
          <div className="text-right text-lg">
            Boarding pass<br></br>
            <span className="italic">Business</span>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-1/6">barcode</div>
        <div className="w-2/3 bg-pink-300">
          <div className="grid grid-cols-3 grid-rows-6">
              <div>
                p
              </div>
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>
    </>
  );
}

// TODO: add propTypes
// BoardingPassCard.propTypes = {};

export default BoardingPassCard;
