import { hcWithType } from "@repo/mis-api";

export const apiClient = hcWithType("http://localhost:3000", {
  init: { credentials: "include" },
});
