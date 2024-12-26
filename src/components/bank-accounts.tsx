"use client";
import { formatDollarValue } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";

interface BankAccount {
  id: string;
  bank: string;
  account_number: string;
  balance: string;
  card: string;
  account_holder: string;
}

interface Props {
  selectedBankId: string;
  onSelectBank: (id: string) => void;
}

export const BankAccounts = ({ selectedBankId, onSelectBank }: Props) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBankAccounts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("bank_accounts").select("*");

      if (error) console.error(error);

      if (data && data.length > 0) {
        setBankAccounts(data);
        if (!selectedBankId) {
          onSelectBank(data[0].id);
        }
      } else {
        setBankAccounts([]);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatedCardNumber = (value: string) => {
    const numberString = value.toString();
    if (numberString.length <= 4) {
      return numberString;
    }
    const lastFourDigits = numberString.slice(-4);
    const hidenDigits = "xxxx";
    return `${hidenDigits}${lastFourDigits}`;
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">
          Your Bank Accounts ({bankAccounts.length})
        </h2>
        <button className="text-primary" aria-label="Add Bank Account">
          <IoIosAdd className="w-8 h-8" />
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-4">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className={`p-4 rounded-lg border ${
                selectedBankId === account.id
                  ? "bg-primary/5 border-primary"
                  : "bg-white border-gray-200"
              } cursor-pointer`}
              onClick={() => onSelectBank(account.id)}
            >
              <div className="text-sm text-gray-600">
                {account.bank} ({account.account_number})
              </div>
              <div
                className={`font-semibold mt-1 ${
                  selectedBankId === account.id && "text-primary"
                }  text-md`}
              >
                {account.account_holder}
              </div>
              <div className="text-sm">
                ({formatedCardNumber(account.card)})
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">Balance</div>
                <div className="text-xl font-semibold">
                  ${formatDollarValue(account.balance)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
