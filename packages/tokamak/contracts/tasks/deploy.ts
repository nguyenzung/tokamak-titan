/* Imports: External */
import { task } from 'hardhat/config'
import * as types from 'hardhat/internal/core/params/argumentTypes'

// tokamak optimism goerli
const DEFAULT_EM_CHAIN_ID = 5050

// create custom task
task('deploy', 'Deploy contracts to L1 and L2')
  .addOptionalParam(
    'emOvmChainId',
    'Chain ID for the L2 network.',
    DEFAULT_EM_CHAIN_ID,
    types.int
  )
  .setAction(async (args, hre: any, runSuper) => {
    hre.deployConfig = args
    return runSuper(args)
  })