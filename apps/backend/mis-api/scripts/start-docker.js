import { execSync } from "child_process";

try {
  execSync("docker compose version", { stdio: "inherit" });
  execSync("docker compose up -d", { stdio: "inherit" });
} catch (error) {
  execSync("docker-compose up -d", { stdio: "inherit" });
}
