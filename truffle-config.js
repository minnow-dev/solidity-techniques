const HDWalletProvider = require('truffle-hdwallet-provider');
const KlaytnWalletProvider = require("truffle-hdwallet-provider-klaytn");
const mnemonic = 'hello hello';
const privateKey = '';
const infuraKey = '';
module.exports = {
  plugins: ['solidity-coverage'],
  networks: {
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infurakey}`);
      },
      port: 8545,
      network_id: 1,
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`);
      },
      port: 8545,
      network_id: '3',
      skipDryRun: true,
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`);
      },
      port: 8545,
      network_id: '4',
      skipDryRun: true,
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    }
  },
  compilers: {
    solc: {
      version: '0.6.8',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: '', //basically verstion defult, petersburg, istanbul use petersburg for klaytn
      },
    },
  },
};
