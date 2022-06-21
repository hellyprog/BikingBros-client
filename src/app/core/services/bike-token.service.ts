import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { WalletConnectorService } from './wallet-connector.service';
import BikeToken from '@assets/contracts/BikeToken.json';
import { ethers } from 'ethers';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BikeTokenService {
  provider!: ethers.providers.Web3Provider;
  wsProvider!: ethers.providers.WebSocketProvider;
  bikeContract: any = {};

  constructor(
    private walletConnectorService: WalletConnectorService,
    private appConfigService: AppConfigService
  ) {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    }

    this.wsProvider = new ethers.providers.WebSocketProvider(this.appConfigService.contract.wsProvider);
    this.bikeContract.address = this.appConfigService.contract.bikeContractAddress;
    this.bikeContract.abi = BikeToken.abi;
  }

  async getBalance() {
    const correctNetworkConnected = await this.walletConnectorService.isCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.bikeContract.address, this.bikeContract.abi, signer);

      return contract['balanceOf'](await this.walletConnectorService.getWalletAddress());
    }

    return null;
  }

  subscribeToContractEvent(eventName: string, callback: any) {
    const signer = this.wsProvider.getSigner();
    const contract = new ethers.Contract(this.bikeContract.address, this.bikeContract.abi, signer);
    contract.on(eventName, callback);
  }

  unsubscribeFromContractEvent(eventName: string, callback: any) {
    const signer = this.wsProvider.getSigner();
    const contract = new ethers.Contract(this.bikeContract.address, this.bikeContract.abi, signer);
    contract.off(eventName, callback);
  }
}
