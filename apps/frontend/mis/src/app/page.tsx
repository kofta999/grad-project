"use client";
import { log } from "@repo/logger";
import { Link } from "@repo/ui/link";
import { CounterButton } from "@repo/ui/counter-button";
import { hcWithType } from "@repo/mis-api";
import { Suspense } from "react";

// To indicate it's not a static page
export const dynamic = "force-dynamic";

export default async function Store() {
  // log("Hey! This is the Store page.");
  const client = hcWithType("http://localhost:3000", {
    init: { credentials: "include" },
  });

  const res = await client.applications.$get();
  console.log(await res.json())
  console.log("adada");

  return (
    <div className="container">
      <h1 className="bg-red-300">
        Store <br />
        {res.status}
        <Suspense fallback={<span>loading</span>}></Suspense>
      </h1>
      <CounterButton />
      <p className="description">
        Built With{" "}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {" & "}
        <Link href="https://nextjs.org/" newTab>
          Next.js
        </Link>
      </p>
    </div>
  );
}
