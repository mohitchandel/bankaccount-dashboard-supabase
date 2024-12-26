import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Your Bank Dashboard
        </h1>

        <div className="max-w-3xl mx-auto">
          <p className="text-xl mb-6 text-center">
            Manage all your bank accounts in one place. Get a clear overview of
            your finances and track your transactions with ease.
          </p>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
            <ul className="list-inside space-y-2 list-none">
              <li>View balances across your multiple bank accounts</li>
              <li>Track your recent transactions</li>
              <li>Analyze your spending patterns</li>
              <li>Set your budgets and financial goals</li>
              <li>Secure and private access to your financial data</li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-primary rounded-md text-white"
            >
              Access Your Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
