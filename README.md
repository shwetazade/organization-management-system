# Organization Management System

## Project Setup & Installation

Install the project dependencies:

```bash
npm install
```

## Execution

Build the TypeScript project:

```bash
npm run build
```

Run the application:

```bash
npm start
```

## Project Structure

```text
src/
├── index.ts
├── models/
│   ├── Employee.ts
│   ├── Engineer.ts
│   ├── Lead.ts
│   ├── Manager.ts
│   ├── Director.ts
│   └── CEO.ts
└── services/
    └── Organization.ts
```

- `models/` contains the employee classes.
- `Organization.ts` manages employees, hierarchy, validations and CRUD operations.
- `index.ts` contains mock data and test scenarios.

## Design Approach & Assumptions

- Uses an abstract `Employee` base class with role-specific classes extending it.
- `Organization` manages employee records and reporting relationships.
- Employee IDs are unique.
- The organization can have only one CEO.
- Employees follow the hierarchy: **CEO → Director → Manager → Lead → Engineer**.
- Employees with reportees cannot be deleted.
- The application uses mock data and does not include a UI.