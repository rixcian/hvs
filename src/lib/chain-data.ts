import { calculateHVS, Chain } from "./chains";

export const chainData: Chain[] = [
  {
    name: "Solana",
    iconURL: "/solana.jpg",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 12,
      ram: 256,
      storage: 4000,
      bandwidth: 15,
      refLink: "https://docs.solana.com/running-validator/validator-reqs",
    },
    maxTheoreticalTPS: 65000,
  },
  {
    name: "Aptos",
    iconURL: "/aptos.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 32,
      ram: 64,
      storage: 3000,
      bandwidth: 15,
      refLink: "https://aptos.dev/en/network/nodes/validator-node/node-requirements#hardware-requirements",
    },
    maxTheoreticalTPS: 160000,
  },
  {
    name: "Sui",
    iconURL: "/sui.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 8,
      ram: 128,
      storage: 4000,
      bandwidth: 3,
      refLink: "https://docs.sui.io/guides/operator/sui-full-node#hardware-requirements",
    },
    maxTheoreticalTPS: 297000,
  },
  {
    name: "Monad",
    iconURL: "/monad.jpg",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 16,
      ram: 32,
      storage: 4000,
      bandwidth: 3,
      refLink: "https://docs.monad.xyz/monad-arch/hardware-requirements",
    },
    maxTheoreticalTPS: 10000,
  },
  {
    name: "Sei",
    iconURL: "/sei.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 16,
      ram: 64,
      storage: 2000,
      bandwidth: 15,
      refLink: "https://docs.seinetwork.io/nodes/hardware-requirements",
    },
    maxTheoreticalTPS: 12500,
  },
  {
    name: "Starknet",
    iconURL: "/starknet.png",
    layer: 2,
    hardwareRequirements: {
      cpuCores: 4,
      ram: 8,
      storage: 2000,
      bandwidth: 1.5,
      refLink: "https://docs.starknet.io/ecosystem/fullnodes-rpc-providers/#full_nodes",
    },
    maxTheoreticalTPS: 857,
  },
  {
    name: "Ethereum",
    iconURL: "/ethereum.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 4,
      ram: 16,
      storage: 2000,
      bandwidth: 2,
      refLink:
        "https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node#what-is-an-ethereum-full-node",
    },
  },
  {
    name: "Bitcoin",
    iconURL: "/bitcoin.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 2,
      ram: 2,
      storage: 600,
      bandwidth: 0.3,
      refLink: "https://bitcoin.org/en/full-node",
    },
  },
  {
    name: "Base",
    iconURL: "/base.webp",
    layer: 2,
    hardwareRequirements: {
      cpuCores: 8,
      ram: 16,
      storage: 2000,
      bandwidth: 2,
      refLink: "https://docs.base.org/chain/run-a-base-node#hardware-requirements",
    },
  },
  {
    name: "Optimism",
    iconURL: "/optimism.png",
    layer: 2,
    hardwareRequirements: {
      cpuCores: 8,
      ram: 16,
      storage: 2000,
      bandwidth: 2,
      refLink:
        "https://docs.optimism.io/builders/node-operators/tutorials/mainnet",
    },
  },
  {
    name: "Arbitrum One",
    iconURL: "/arbitrum.png",
    layer: 2,
    hardwareRequirements: {
      cpuCores: 4,
      ram: 16,
      storage: 5000,
      bandwidth: 3,
      refLink: "https://docs.arbitrum.io/run-arbitrum-node/run-full-node",
    },
  },
  {
    name: "ZKSync Era",
    iconURL: "/zksync.webp",
    layer: 2,
    hardwareRequirements: {
      cpuCores: 4,
      ram: 32,
      storage: 500,
      bandwidth: 2,
      refLink:
        "https://github.com/matter-labs/zksync-era/blob/main/docs/src/guides/external-node/00_quick_start.md#system-requirements",
    },
  },
  {
    name: "Gnosis",
    iconURL: "/gnosis.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 2,
      ram: 16,
      storage: 2000,
      bandwidth: 3,
      refLink: "https://docs.gnosischain.com/node#requirements",
    },
  },
  {
    name: "Monero",
    iconURL: "/monero.svg",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 4,
      ram: 4,
      storage: 500,
      bandwidth: 0.3,
      refLink: "https://docs.getmonero.org/running-node/monerod-systemd/#assumptions",
    },
  },
  {
    name: "Polkadot",
    iconURL: "/polkadot.png",
    layer: 1,
    hardwareRequirements: {
      cpuCores: 6,
      ram: 32,
      storage: 2000,
      bandwidth: 2,
      refLink: "https://docs.polkadot.network/docs/en/maintain-guides-hardware-requirements",
    },
  },
];

export const getChainDataWithHVS = () => {
  const withHVS = chainData.map((chain) => {
    return {
      ...chain,
      hvs: calculateHVS(chain),
    };
  });

  // sort by HVS in descending order
  return withHVS.sort((a, b) => b.hvs - a.hvs);
};

export const renderCPUCores = (cpuCores: number) => {
  return cpuCores === 1 ? "1 core" : `${cpuCores} cores`;
};

export const renderRAM = (RAM: number) => {
  return `${RAM} GB`;
};

export const renderStorage = (storage: number) => {
  if (storage < 1000) {
    return `${storage} GB`;
  }
  const storageInTB = storage / 1000;

  // if there is a decimal, round to 2 decimal places
  if (storageInTB % 1 !== 0) {
    return `${storageInTB.toFixed(2)} TB`;
  }

  return `${storageInTB} TB`;
};

export const renderBandwidth = (bandwidth: number) => {
  if (bandwidth > 10) {
    return `> 10TB/month`;
  }

  return `~ ${bandwidth} TB/month`;
};
