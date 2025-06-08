import { Suspense } from "react";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { ThemeButton } from "@/components/theme-button";
import { ChainDataTable } from "@/components/chain-data-table";

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start px-4 md:px-24 py-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-4xl font-bold mt-8">🏡 Home Verifiability Score</h1>
        <ThemeButton />
      </div>
      <p className="text-lg text-muted-foreground mt-4">
        The Home Verifiability Score (HVS) is a metric that measures how easily
        and efficiently a blockchain network can be verified by consumer
        hardware at home. A higher score indicates better accessibility and
        lower hardware requirements for running a full node.
      </p>

      <Suspense fallback={<div className="mt-8 h-96 bg-muted animate-pulse rounded-md" />}>
        <ChainDataTable />
      </Suspense>

      <h4 className="text-xl mt-8 font-bold">
        How is the Home Verifiability Score calculated?
      </h4>
      <p className="text-muted-foreground mt-2">
        The Home Verifiability Score (HVS) is calculated as a weighted average
        of hardware requirements: RAM (30%), CPU (30%), Storage (15%), and
        Bandwidth (25%). Each component is scored based on accessibility for
        typical home setups based on hardware purchase cost and maintenance
        costs.
      </p>

      <p className="flex text-muted-foreground mt-4">
        Found something incorrect? The code is open source and available on&nbsp;
        <a
          href="https://github.com/rixcian/home-verifiability-score"
          target="_blank"
          className="underline"
        >
          <span className="flex items-center gap-1">
            Github <ExternalLinkIcon className="w-3 h-3" />
          </span>
        </a>
      </p>

      <div className="w-full flex justify-center items-center mt-8 text-sm">
        Fork of&nbsp;
        <Link
          href="https://github.com/dhaiwat10/chain-viability-index"
          target="_blank"
          className="dark:text-white text-black underline"
        >
          Dhai&apos;s
        </Link>
        &nbsp;work, re-implemented by&nbsp;
        <Link
          href="https://twitter.com/rixcian"
          target="_blank"
          className="dark:text-white text-black underline"
        >
          rixcian
        </Link>
      </div>
    </main>
  );
}
