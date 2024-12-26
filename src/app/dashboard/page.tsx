"use client";
import { AccountTransactions } from "@/components/account-transactions";
import { BankAccounts } from "@/components/bank-accounts";
import { useState } from "react";

export default function Dashboard() {
  const [selectedBankId, setSelectedBankId] = useState<string>("");

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-6 border-b">
        <h1 className="text-4xl font-bold">Bank Accounts</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-96 flex-shrink-0 px-6 py-6 h-[calc(100vh-88px)] overflow-y-auto scrollbar-hide">
          <BankAccounts
            selectedBankId={selectedBankId}
            onSelectBank={setSelectedBankId}
          />
        </div>
        <div className="flex-1 bg-gray-100/40 px-6 py-6 h-[calc(100vh-88px)] overflow-y-auto scrollbar-hide">
          <AccountTransactions selectedBankId={selectedBankId} />
        </div>
      </div>
    </div>
  );
}
