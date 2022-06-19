import { Component, OnInit } from '@angular/core';
import { BikeTokenService } from '@core/services';
import { ethers } from 'ethers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private  bikeTokenService: BikeTokenService) {
  }

  async ngOnInit() {
    console.log(ethers.utils.formatEther(await this.bikeTokenService.getBalance()));
  }

}