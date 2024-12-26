# Bank Account Dashboard

A Next.js application for managing and viewing bank accounts and transactions. Built with Next.js, Supabase, and Tailwind CSS.

## Features

- View all linked bank accounts and balances
- Track transaction history
- Filter transactions by:
  - Search terms
  - Activity type
  - Date range
  - Transaction type (credited/debited)
- Real-time balance updates
- Responsive design

## Tech Stack

- Next.js
- Supabase
- TypeScript
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

## Database Schema

### Bank Accounts Table

- id: string (primary key)
- bank: string
- account_number: string
- balance: string
- card: string
- account_holder: string

### Transactions Table

- id: string (primary key)
- bank_id: string (foreign key)
- transaction_name: string
- transaction_type: string
- transaction_amount: string
- transaction_date: string
- description: string
