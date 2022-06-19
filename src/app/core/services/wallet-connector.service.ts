import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { AppConfigService } from './app-config.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class WalletConnectorService {
  provider: ethers.providers.Web3Provider;

  constructor(private appConfigService: AppConfigService) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  }

  async connectWallet(): Promise<string | null> {
    try {
      await this.provider.send('eth_requestAccounts', []);
      
      return this.getWalletAddress();
    } catch (error) {
      return null;
    }
  }

  async getWalletAddress(): Promise<string> {
    const signer = this.provider.getSigner();

    return signer.getAddress();
  }

  async isWalletConnected(): Promise<boolean> {
    const accounts = await this.provider.listAccounts();

    return accounts.length > 0;
  }

  async isCorrectNetworkConnected(): Promise<boolean> {
    const { chainId } = await this.provider.getNetwork();
    return chainId === this.appConfigService.mumbaiNetworkId;
  }

  subscribeToWalletEvent(eventName: string, callback: any) {
    window.ethereum.on(eventName, callback);
  }

  unsubscribeFromWalletEvent(eventName: string, callback: any) {
    window.ethereum.removeListener(eventName, callback);
  }
}