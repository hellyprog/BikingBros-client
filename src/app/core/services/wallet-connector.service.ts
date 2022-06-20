import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { AppConfigService } from './app-config.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class WalletConnectorService {
  provider!: ethers.providers.Web3Provider;

  constructor(private appConfigService: AppConfigService) {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    }
  }

  async connectWallet(): Promise<string | null> {
    try {
      await this.provider?.send('eth_requestAccounts', []);
      
      return this.getWalletAddress();
    } catch (error) {
      return null;
    }
  }

  async getWalletAddress(): Promise<string> {
    const signer = this.provider?.getSigner();

    return signer?.getAddress();
  }

  async isWalletConnected(): Promise<boolean | null> {
    const accounts = await this.provider?.listAccounts();

    return accounts?.length > 0;
  }

  async isCorrectNetworkConnected(): Promise<boolean | null> {
    const { chainId } = Object(await this.provider?.getNetwork());

    return chainId === this.appConfigService.mumbaiNetworkId;
  }

  async switchNetworkToMumbai() {
    try {
      const chainId = '0x' + this.appConfigService.mumbaiNetworkId.toString(16);
      await this.provider?.send('wallet_switchEthereumChain', [{ chainId }]);
    } catch(error) {
      console.log(error);
    }
  }

  subscribeToWalletEvent(eventName: string, callback: any) {
    window.ethereum?.on(eventName, callback);
  }

  unsubscribeFromWalletEvent(eventName: string, callback: any) {
    window.ethereum?.removeListener(eventName, callback);
  }
}
