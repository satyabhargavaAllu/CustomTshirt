import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mydesigns',
  templateUrl: './mydesigns.component.html',
  styleUrls: ['./mydesigns.component.css']
})
export class MydesignsComponent implements OnInit {
  designs = [];
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
   this.designs = this.route.snapshot.data['mydesigns'];
  }

}
