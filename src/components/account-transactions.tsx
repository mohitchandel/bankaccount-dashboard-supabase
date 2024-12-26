import { IoIosArrowDown, IoIosSearch } from "react-icons/io";

export const AccountTransactions = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        Eltican Capital SPC Eltican Positron SP
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
          <option>Activity type</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
          <option>Last 30 days</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
          <option>All type</option>
        </select>
      </div>

      <div className="space-y-4">
        {[
          {
            date: "12/10/2024",
            description:
              "BOLB OUTGOING WIRE Mehdi Lauranet AAkka 202314581928141012",
            type: "Partial redemption",
            amount: -350000.0,
            balance: 450915.0,
          },
          {
            date: "12/10/2024",
            description: "INCOMING WIRE, TAN WEI LLEOVERSEA 201234981029139412",
            type: "Partial redemption",
            amount: 100000.0,
            balance: 450915.0,
          },
        ].map((transaction, i) => (
          <div
            key={i}
            className="flex bg-white items-center justify-between p-4 rounded-xl"
          >
            <div className="flex-1 space-y-1">
              <div className="text-sm font-semibold text-gray-500">
                {transaction.date}
              </div>
              <div className="text-xl font-semibold">
                {transaction.description}
              </div>
              <div className="text-sm font-semibold text-gray-500">
                {transaction.type}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-xl font-semibold ${
                  transaction.amount > 0 ? "text-primary" : "text-red-500"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {transaction.balance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
            <IoIosArrowDown className="ml-4 w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </>
  );
};
