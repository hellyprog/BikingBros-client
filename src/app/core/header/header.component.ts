import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WalletConnectorService } from '@core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding('class.transparent') isHomePage: boolean = true;
  walletAddress!: string;
  unformattedWalletAddress!: string | null;
  
  constructor(
    private router: Router,
    private walletConnectorService: WalletConnectorService,
    private snackBar: MatSnackBar
  ) {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        const homePath = '/home';
        this.isHomePage = value.url === homePath || value.urlAfterRedirects === homePath;
      }
    });
  }

  async ngOnInit() {
    if (!await this.walletConnectorService.isWalletConnected() || !this.walletAddress) {
      await this.connectWallet();
    }

    this.walletConnectorService.subscribeToWalletEvent('chainChanged', this.chainChangedHandler.bind(this));
  }

  ngOnDestroy(): void {
    this.walletConnectorService.unsubscribeFromWalletEvent('chainChanged', this.chainChangedHandler.bind(this));
  }

  async chainChangedHandler() {
    if (!await this.walletConnectorService.isCorrectNetworkConnected()) {
      const snackBarText = 'Selected network is incorrect. Please switch to Mumbai network.';
      this.snackBar.open(snackBarText, 'Close', {
        duration: 4000,
        panelClass: ['snackbar-dark']
      });
    }
  }

  async connectWallet() {
    this.unformattedWalletAddress = await this.walletConnectorService.connectWallet();
    const isCorrectNetworkConnected = await this.walletConnectorService.isCorrectNetworkConnected();

    if (!isCorrectNetworkConnected) {
      await this.walletConnectorService.switchNetworkToMumbai();
    }

    if (this.unformattedWalletAddress) {
      this.walletAddress = this.formatAddress(this.unformattedWalletAddress);
    }
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 3)}...${address.slice(address.length - 3)}`;
  }
}
