# Express TypeScript Backend with PRISMA ORM

This repository contains an Express backend written in TypeScript, using PRISMA as an ORM.

## Exposed Endpoints

### Health Check Endpoint
- **GET `/`**
  - Returns successful if the backend is running.

### Add Email and Name
- **POST `/`**
  - Users can add their email and name through this endpoint.

## Objective

Create two Docker containers:
1. One running the backend code.
2. Another running the PostgreSQL database locally.

Connect both containers and ensure that the data stored in the database persists after the containers are killed.

## Setup Instructions

### Step 1: Clone the Repository

```sh
git clone <your-repo-url>
cd <your-repo-directory>
```

### Step 2: Create a Volume

Volumes help the database to persist data after reset.

```sh
docker volume create postgres_database
```

### Step 3: Create a Network

Containers cannot communicate with each other on their own; they need to be part of the same network to do that.

```sh
docker network create my_network
```

### Step 4: Start the Database Container

```sh
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -v postgres_database:/var/lib/postgresql/data -p 5432:5432 --network my_network -d postgres
```

- Container name: `some-postgres`
- Password: `mysecretpassword`
- Port mapping: `5432:5432`
- Network: `my_network`
- Volume: `postgres_database` (for data persistence)

### Step 5: Build the Backend Docker Image

```sh
docker build -t backend .
```

### Step 6: Create the Backend Container

```sh
docker run --name backend --network my_network -p 3000:3000 -e DATABASE_URL=postgresql://postgres:mysecretpassword@some-postgres:5432/postgres -d backend
```

- Container name: `backend`
- Network: `my_network`
- Port mapping: `3000:3000`
- Environment Variable: `DATABASE_URL` with the connection string to the PostgreSQL container.

With this setup, your backend functionality is exposed at `localhost:3000`. Users can be added through the exposed endpoints, and the data will persist in the PostgreSQL database even after container restarts or removals.