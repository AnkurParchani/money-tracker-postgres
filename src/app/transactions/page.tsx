import AddTransactionForm from "./AddTransactionForm";

import { getUser } from "../../../lib/actions/users";

const page = async () => {
  const user = await getUser();

  const currentBalance =
    user &&
    user.transactions
      .filter((transaction) => transaction.type === "deposit")
      .reduce((cur, acc) => cur + (acc.amount as number), 0) -
      user.transactions
        .filter((transaction) => transaction.type === "withdraw")
        .reduce((cur, acc) => cur + (acc.amount as number), 0);

  return (
    <>
      <div className="flex text-3xl my-10 justify-between items-center">
        <h1>Transactions Portal:-</h1>

        {currentBalance ? (
          <h1
            className={`text-lg bg-gray-900 px-6 border-x-4  py-1 rounded-md ${
              currentBalance > 0
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
          >
            ₹{Math.abs(currentBalance!)}
          </h1>
        ) : (
          <></>
        )}
      </div>

      {user && user.transactions && (
        <div className="border-b-2 pb-3 border-gray-500">
          <h1 className="text-2xl mb-5 text-gray-300 underline">
            All Transactions:
          </h1>

          <div className=" flex flex-col gap-3 text-gray-300">
            {user.transactions.map((transaction) => {
              return (
                <div
                  key={transaction.id}
                  className={`bg-gray-900 px-3 py-4 rounded-md border-l-4 ${
                    transaction.type === "deposit"
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
                >
                  <h1>Description: {transaction.desc}</h1>
                  <h1>Amount: {transaction.amount}</h1>
                  <h1>Type: {transaction.type}</h1>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10 border border-gray-400 px-4 py-4 rounded-md">
        <h1 className="text-2xl text-gray-300 underline">Add Transaction: </h1>

        <AddTransactionForm />
      </div>
    </>
  );
};

export default page;
