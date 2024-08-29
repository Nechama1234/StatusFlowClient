import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './Services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'StatusFlowClient';
  constructor(private sharedService:SharedService)
  {
    
  }

  deleteAll():void{
    this.sharedService.deleteAllTables().subscribe(data=>{

    })
  }
}
