# MIS Project

This project consists of a backend API and a frontend application. The backend is built with Node.js and TypeScript, while the frontend is built with Next.js and React. The project uses Docker for containerization and `bun` for running scripts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [bun](https://bun.sh/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installing Docker and Docker Compose

#### Docker

Follow the instructions for your operating system on the [Docker installation page](https://docs.docker.com/get-docker/).

#### Docker Compose

Docker Compose is included in Docker Desktop for Windows and macOS. For Linux, follow the instructions on the [Docker Compose installation page](https://docs.docker.com/compose/install/).

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/kofta999/grad-project.git
   cd grad-project
   ```

2. **Install dependencies:**

   ```sh
   bun install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `apps/backend/mis-api` directory and add the necessary environment variables. For example:

   ```env
   NODE_ENV=development
   PORT=3000
   LOG_LEVEL=debug
   DATABASE_URL=postgresql://mis_user:mis_password@localhost:5432/mis_db
   ```

## Running the Project

### Both Backend and Frontend

1. **Start all servers using:**

   ```sh
   bun dev
   ```

### Backend Only

1. **Navigate to the backend directory:**

   ```sh
   cd apps/backend/mis-api
   ```

2. **Start the backend server:**

   ```sh
   bun dev
   ```

   This will start the Docker containers and run the backend server with hot-reloading.

### Frontend Only

1. **Navigate to the frontend directory:**

   ```sh
   cd apps/frontend/mis
   ```

2. **Start the frontend development server:**

   ```sh
   bun dev
   ```

This will start the Next.js development server on port 3002.
