/* Imports: External */
import { DeployFunction, DeploymentSubmission } from 'hardhat-deploy/dist/types'
import { Contract, ContractFactory, ethers } from 'ethers'
import { getContractFactory } from '@eth-optimism/contracts'

import { registerAddress } from './000-L1MessengerFast.deploy'
import ProxyJson from '../artifacts/contracts/libraries/Lib_ResolvedDelegateProxy.sol/Lib_ResolvedDelegateProxy.json'
import L2LiquidityPoolJson from '../artifacts/contracts/LP/L2LiquidityPool.sol/L2LiquidityPool.json'
import L2BillingContractJson from '../artifacts/contracts/L2BillingContract.sol/L2BillingContract.json'

let Factory__Proxy__L2BillingContract: ContractFactory

let Proxy__L2LiquidityPool: Contract
let Proxy__L2BillingContract: Contract

const deployFn: DeployFunction = async (hre) => {
  //get address manager
  const addressManager = getContractFactory('Lib_AddressManager')
    .connect((hre as any).deployConfig.deployer_l1)
    .attach(process.env.ADDRESS_MANAGER_ADDRESS) as any

  // get factory of proxy contract
  Factory__Proxy__L2BillingContract = new ContractFactory(
    ProxyJson.abi,
    ProxyJson.bytecode,
    (hre as any).deployConfig.deployer_l2
  )

  // check deployed Proxy__L2LiquidityPool
  const Proxy__L2LiquidityPoolDeployment = await hre.deployments.getOrNull(
    'Proxy__L2LiquidityPool'
  )
  Proxy__L2LiquidityPool = new Contract(
    Proxy__L2LiquidityPoolDeployment.address,
    L2LiquidityPoolJson.abi,
    (hre as any).deployConfig.deployer_l2
  )

  const L2BillingContract = await (hre as any).deployments.get(
    'TokamakBillingContract'
  )

  // deploy Proxy__L2BillingContract
  Proxy__L2BillingContract = await Factory__Proxy__L2BillingContract.deploy(
    L2BillingContract.address
  )
  await Proxy__L2BillingContract.deployTransaction.wait()
  const Proxy__L2BillingContractDeploymentSubmission: DeploymentSubmission = {
    ...Proxy__L2BillingContract,
    receipt: Proxy__L2BillingContract.receipt,
    address: Proxy__L2BillingContract.address,
    abi: Proxy__L2BillingContract.abi,
  }
  await hre.deployments.save(
    'Proxy__TokamakBillingContract',
    Proxy__L2BillingContractDeploymentSubmission
  )
  console.log(
    `Proxy__TokamakBillingContract deployed to: ${Proxy__L2BillingContract.address}`
  )

  // Initialize the billing contract
  const L2TON = await hre.deployments.getOrNull('L2TON')

  Proxy__L2BillingContract = new Contract(
    Proxy__L2BillingContract.address,
    L2BillingContractJson.abi,
    (hre as any).deployConfig.deployer_l2
  )

  // initial exit fee = 10 TON
  await Proxy__L2BillingContract.initialize(
    L2TON.address,
    (hre as any).deployConfig.deployer_l2.address,
    ethers.utils.parseEther('10')
  )

  console.log(`Proxy__TokamakBillingContract initialized`)

  // Register the address of the L2 billing contract
  await Proxy__L2LiquidityPool.configureBillingContractAddress(
    Proxy__L2BillingContract.address
  )
  console.log(`Added TokamakBillingContract to Proxy__L2LiquidityPool`)

  // register addresses in the addrss manager
  await registerAddress(
    addressManager,
    'Proxy__TokamakBillingContract',
    Proxy__L2BillingContract.address
  )
}

deployFn.tags = ['Proxy__TokamakBillingContract', 'required']

export default deployFn