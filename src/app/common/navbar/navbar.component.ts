import { Component, OnInit} from '@angular/core';
import {navList} from '../../models/nav.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navListMenu:navList[];
  constructor() { }

    ngOnInit() {
      this.navListMenu = [
          {name:'Home',link:''},
          {name:'MyDesigns',link:'/mydesigns'}
      ]
    }

}
