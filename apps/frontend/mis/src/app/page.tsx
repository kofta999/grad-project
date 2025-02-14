import { log } from "@repo/logger";
import { Link } from "@repo/ui/link";
import { CounterButton } from "@repo/ui/counter-button";
import { hcWithType } from "@repo/mis-api";
import { Suspense } from "react";

// To indicate it's not a static page
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Store | Kitchen Sink",
};
export default async function Store() {
  // log("Hey! This is the Store page.");
  const client = hcWithType("http://127.0.0.1:3000");
  const res = await client.auth.register1.$post({ json: {} });
  if (res.status === 200) {
    const json = await res.json();
    json.studentId
  }
  // const data = await (await client.index.$get()).text();
  // console.log(data);

  return (
    <div className="container">
      <h1 className="bg-red-300">
        Store <br />
        <Suspense fallback={<span>loading</span>}>
          <span>{"yo"}</span>
        </Suspense>
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
