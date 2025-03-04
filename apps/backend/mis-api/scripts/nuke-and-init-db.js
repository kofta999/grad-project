import { execSync } from "child_process";

function runCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    process.exit(1);
  }
}

// Function to nuke and reinitialize the database
function nukeAndInitDB() {
  console.log("Nuking and reinitializing the database...");

  // Drop the existing database
  runCommand(
    'docker exec -i mis_postgres psql -U mis_user -d postgres -c "DROP DATABASE IF EXISTS mis_db;"',
  );

  // Recreate the database
  runCommand(
    'docker exec -i mis_postgres psql -U mis_user -d postgres -c "CREATE DATABASE mis_db;"',
  );

  // Run the initialization scripts
  runCommand(
    "docker exec -i mis_postgres psql -U mis_user -d mis_db -f /docker-entrypoint-initdb.d/01-schema.sql",
  );

  runCommand(
    "docker exec -i mis_postgres psql -U mis_user -d mis_db -f /docker-entrypoint-initdb.d/02-seed.sql",
  );
}

// Initial Docker start
try {
  execSync("docker compose version", { stdio: "inherit" });
  execSync("docker compose up -d", { stdio: "inherit" });
} catch (error) {
  execSync("docker-compose up -d", { stdio: "inherit" });
}

// Nuke and reinitialize the database
nukeAndInitDB()