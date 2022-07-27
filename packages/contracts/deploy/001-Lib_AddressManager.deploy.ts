/* Imports: Internal */
import { DeployFunction } from 'hardhat-deploy/dist/types'

import { registerAddress } from '../src/deploy-utils'
import { predeploys } from '../src/predeploys'
import { names } from '../src/address-names'

/* Imports: External */

const deployFn: DeployFunction = async (hre) => {
  const { deploy } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()

  // deploy a contract
  await deploy(names.unmanaged.Lib_AddressManager, {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: hre.deployConfig.numDeployConfirmations,
  })

  await registerAddress({
    hre,
    name: 'L2TokamakToken',
    address: predeploys.L2StandardERC20,
  })

  await registerAddress({
    hre,
    name: 'Tokamak_GasPriceOracle',
    address: predeploys.Tokamak_GasPriceOracle,
  })
}

// This is kept during an upgrade. So no upgrade tag.
deployFn.tags = ['Lib_AddressManager']

export default deployFn
