/**
 * This object defines the correct names to be used in the Address Manager and deployment artifacts.
 */
export const names = {
  managed: {
    contracts: {
      ChainStorageContainer_CTC_batches: 'ChainStorageContainer-CTC-batches',
      ChainStorageContainer_SCC_batches: 'ChainStorageContainer-SCC-batches',
      CanonicalTransactionChain: 'CanonicalTransactionChain',
      StateCommitmentChain: 'StateCommitmentChain',
      BondManager: 'BondManager',
      OVM_L1CrossDomainMessenger: 'OVM_L1CrossDomainMessenger',
      Proxy__OVM_L1CrossDomainMessenger: 'Proxy__OVM_L1CrossDomainMessenger',
      Proxy__OVM_L1StandardBridge: 'Proxy__OVM_L1StandardBridge',
      L1CrossDomainMessengerFast: 'L1CrossDomainMessengerFast',
      Proxy__L1CrossDomainMessengerFast: 'Proxy__L1CrossDomainMessengerFast',
    },
    accounts: {
      OVM_Sequencer: 'OVM_Sequencer',
      OVM_Proposer: 'OVM_Proposer',
      OVM_FastRelayer: 'OVM_FastRelayer',
      OVM_TONStakingManager: 'OVM_TONStakingManager',
    },
  },
  unmanaged: {
    AddressDictator: 'AddressDictator',
    ChugSplashDictator: 'ChugSplashDictator',
    Lib_AddressManager: 'Lib_AddressManager',
  },
}
