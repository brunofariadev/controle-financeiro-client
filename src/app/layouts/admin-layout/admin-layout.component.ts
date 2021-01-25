import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sidebarCollapse() {
    $('#sidebar, #content').toggleClass('active');
  }

}
