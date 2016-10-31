import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map-preview',
  templateUrl: './google-map-preview.component.html',
  styleUrls: ['./google-map-preview.component.css']
})
export class GoogleMapPreviewComponent implements OnInit {

  constructor() { }

  lat: number = -34.9519472;
  lng: number = 136.9726123;
  label: string = "Corny Point :)";
  zoomLevel: number = 9;

  ngOnInit() {
  }
}
