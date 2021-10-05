import { mapKeys, mapValues } from 'lodash';
import { DAI_ADDRESS, WBTC_ADDRESS } from './addresses';
import savingAssets from './compound/saving-assets.json';
import { Asset, SavingsAsset } from '@rainbow-me/entities';

export {
  CURATED_UNISWAP_TOKENS,
  PAIR_GET_RESERVES_CALL_DATA,
  PAIR_GET_RESERVES_FRAGMENT,
  PAIR_INTERFACE,
  RAINBOW_TOKEN_LIST,
  TOKEN_SAFE_LIST,
  UNISWAP_TESTNET_TOKEN_LIST,
  UNISWAP_V1_EXCHANGE_ABI,
  UNISWAP_V2_BASES,
  UNISWAP_V2_ROUTER_ABI,
  UNISWAP_V2_ROUTER_ADDRESS,
} from './uniswap';
export { default as chains } from './chains.json';
export { default as compoundCERC20ABI } from './compound/compound-cerc20-abi.json';
export { default as compoundCETHABI } from './compound/compound-ceth-abi.json';
export { default as emojis } from './emojis.json';
export { default as erc20ABI } from './erc20-abi.json';
export { default as ethUnits } from './ethereum-units.json';
export { default as shitcoins } from './shitcoins.json';

export const ETH_ICON_URL = 'https://s3.amazonaws.com/token-icons/eth.png';

export const TRANSFER_EVENT_TOPIC_LENGTH = 3;
export const TRANSFER_EVENT_KECCAK =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export const AddCashCurrencies = {
  kovan: {
    DAI: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
    ETH: 'eth',
  },
  mainnet: {
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
    ETH: 'eth',
  },
};

export const AddCashCurrencyInfo = {
  kovan: {
    '0xc4375b7de8af5a38a93548eb8453a498222c4ff2': {
      decimals: 18,
      name: 'Dai',
      symbol: 'DAI',
    },
    'eth': {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
  },
  mainnet: {
    '0x6b175474e89094c44da98b954eedeac495271d0f': {
      decimals: 18,
      name: 'Dai',
      symbol: 'DAI',
    },
    'eth': {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
  },
};

export const DefaultUniswapFavorites = {
  mainnet: ['eth', DAI_ADDRESS, WBTC_ADDRESS],
  rinkeby: [
    // Ethereum
    'eth',
    // DAI
    '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
  ],
};

export const savingsAssetsList = savingAssets;

export const savingsAssetsListByUnderlying: Record<
  string,
  Record<string, SavingsAsset>
> = mapValues(savingAssets, (assetsByNetwork: Record<string, Asset>) =>
  mapKeys(
    mapValues(assetsByNetwork, (assetByContract, contractAddress) => ({
      ...assetByContract,
      contractAddress,
    })),
    value => value.address
  )
);
