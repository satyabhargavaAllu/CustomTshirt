import { Component, OnInit,Input } from '@angular/core';
import { faFont } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-designed-tshirt',
  templateUrl: './designed-tshirt.component.html',
  styleUrls: ['./designed-tshirt.component.css']
})
export class DesignedTshirtComponent implements OnInit{
 @Input() tshirtColor;
 @Input() imageUrl;
 @Input() id;
 faFont=faFont;

  constructor() { }

  ngOnInit() {
  }

}
