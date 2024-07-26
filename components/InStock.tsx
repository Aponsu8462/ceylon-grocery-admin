import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

type InStockProps = {
  id?: string;
  availability: boolean;
};

const InStock = ({ availability, id }: InStockProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={`${
          availability ? "bg-green-500" : "bg-gray-300"
        } flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10`}
      >
        <AiOutlineCheck
          className={`text-white ${availability ? "block" : "hidden"}`}
        />
      </div>
      <div
        className={`${
          availability ? "bg-gray-300" : "bg-red-500"
        } flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10`}
      >
        <AiOutlineClose
          className={`text-white ${availability ? "hidden" : "block"}`}
        />
      </div>
    </div>
  );
};

export default InStock;
