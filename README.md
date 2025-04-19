# Maya Task Manager

## Features

- ✅ Clean & user-friendly UI/UX
- ✅ Display a list of tasks
- ✅ Ability to add/delete/move tasks
- ✅ Modular & reusable components
- ✅ Handling of edge cases

### Bonus

- ✅ Drag & drop functionality
- ✅ Persisting tasks
- ✅ Synchronization across multiple tabs

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

Make sure to have the necessary environment variables set up:

```bash
cp .env.example .env
```

Seed the database with initial data:

```bash
pnpm prisma migrate dev
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.
