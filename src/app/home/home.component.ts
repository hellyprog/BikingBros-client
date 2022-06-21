import { Component, OnInit } from '@angular/core';
import { BikeTokenService } from '@core/services';
import { ethers } from 'ethers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videoVersion: number;

  constructor(private  bikeTokenService: BikeTokenService) {
    this.videoVersion = Math.random() * 10;
  }

  async ngOnInit() {
    this.initVideo();
    //console.log(ethers.utils.formatEther(await this.bikeTokenService.getBalance()));
  }

  private initVideo() {
    const videoElement = document.getElementById('video-background') as HTMLVideoElement;

    if (videoElement) {
      videoElement.muted = true;
      videoElement.play();
    }
  }
}