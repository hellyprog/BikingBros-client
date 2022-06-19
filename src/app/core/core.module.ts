import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService, BikeTokenService, WalletConnectorService } from './services';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AppConfigService,
    WalletConnectorService,
    BikeTokenService
  ]
})
export class CoreModule { }
