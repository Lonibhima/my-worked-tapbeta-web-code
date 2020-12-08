import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss']
})
export class FailedComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  public goHome(): void { 
      this.router.navigate(['/']);
  }

}
