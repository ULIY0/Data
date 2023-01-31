import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { configureChains, createClient } from 'wagmi';

export default function initWeb3Modal() {
  const bscMain = {
    id: 56,
    name: 'Binance Smart Chain',
    network: 'bsc',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
      Ankr: 'https://www.ankr.com/rpc/bsc',
    },
    testnet: false,
  };

  // Wagmi client
  const { chains, provider } = configureChains(
    [bscMain],
    [walletConnectProvider({ projectId: 'c68cdf13f3a77f0902d493dee999a1b9' })]
  );
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: 'appname', chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return { ethereumClient, wagmiClient };
}
