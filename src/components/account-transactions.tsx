"use client";
import { formatDollarValue } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";

interface Transaction {
  id: string;
  bank_id: string;
  transaction_name: string;
  transaction_type: string;
  transaction_amount: string;
  transaction_date: string;
  description: string;
}
interface AccountTransactionsProps {
  selectedBankId: string;
}

const NegativeTransactions = [
  "Partial redemption",
  "Full redemption",
  "Withdrawal",
];

export const AccountTransactions = ({
  selectedBankId,
}: AccountTransactionsProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("all");
  const [transactionType, setTransactionType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [bankBalance, setBankBalance] = useState<string>("");

  const fetchTransactions = async () => {
    if (!selectedBankId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("bank_id", selectedBankId);

      if (error) console.error(error);

      setTransactions(data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to get transaction");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankAccountBalance = async () => {
    if (!selectedBankId) return;
    try {
      const { data, error } = await supabase
        .from("bank_accounts")
        .select("balance")
        .eq("id", selectedBankId)
        .maybeSingle();

      if (error) {
        toast(error);
        return;
      }

      if (data) {
        setBankBalance(data.balance);
      }
    } catch (error) {
      toast.error(error || "Error fetching bank account balance:");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBankAccountBalance();
  }, [selectedBankId]);

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch =
      searchTerm.toLowerCase().trim() === ""
        ? true
        : transaction.transaction_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim()) ||
          transaction.transaction_type
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim()) ||
          transaction.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase().trim());

    const activityMatch =
      activityType === "all"
        ? true
        : transaction.transaction_type === activityType;

    const transactionTypeMatch =
      transactionType === "all"
        ? true
        : transactionType === "debited"
        ? NegativeTransactions.includes(transaction.transaction_type)
        : transactionType === "credited"
        ? !NegativeTransactions.includes(transaction.transaction_type)
        : false;

    const dateMatch =
      dateRange === "all"
        ? true
        : (() => {
            const transactionDate = new Date(transaction.transaction_date);
            const today = new Date();
            const timedif = Math.abs(
              today.getTime() - transactionDate.getTime()
            );
            const diffDays = Math.ceil(timedif / (1000 * 60 * 60 * 24));
            return diffDays <= parseInt(dateRange);
          })();

    return searchMatch && activityMatch && dateMatch && transactionTypeMatch;
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        {selectedBankId ? "Account Transactions" : "Select an account"}
      </h2>

      {selectedBankId && (
        <>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="Partial redemption">Received</option>
              <option value="Full redemption">Full redemption</option>
              <option value="Incoming transfer">Incoming transfer</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Deposit">Deposit</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">Anytime</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 7 days</option>
              <option value="1">Today</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="all">All types</option>
              <option value="credited">Credited</option>
              <option value="debited">Debited</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center text-xl py-8 text-gray-600">
              No transactions
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex bg-white items-center justify-between p-4 rounded-xl"
                >
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-semibold text-gray-500">
                      {new Date(
                        transaction.transaction_date
                      ).toLocaleDateString()}
                    </div>
                    <div className="text-xl font-semibold">
                      {transaction.transaction_name}
                    </div>
                    <div className="text-sm font-semibold text-gray-500">
                      {transaction.transaction_type}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xl font-semibold ${
                        NegativeTransactions.includes(
                          transaction.transaction_type
                        )
                          ? "text-red-500"
                          : "text-primary"
                      }`}
                    >
                      {NegativeTransactions.includes(
                        transaction.transaction_type
                      )
                        ? "-$"
                        : "+$"}
                      {formatDollarValue(transaction.transaction_amount)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      ${formatDollarValue(bankBalance)}
                    </div>
                  </div>
                  <IoIosArrowDown className="ml-4 w-5 h-5" />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
