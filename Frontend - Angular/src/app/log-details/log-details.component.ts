import { Component, OnInit } from '@angular/core';
import { HomedetailsService } from '../homedetails.service';
import { LoginDetails } from '../data/loginDetails/login-details';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss']
})
export class LogDetailsComponent implements OnInit {

  loginDetails: MatTableDataSource<LoginDetails[]>
  public isLoadingResults = true;
  public resultsLength = 0;

  constructor(
             private homedetalis: HomedetailsService
  ) { }

  ngOnInit(): void {
    this.getLogindetails()
  }

  getLogindetails(){
    this.homedetalis.logdetails().subscribe(data =>{
      this.loginDetails = data  
      this.isLoadingResults=false;
      this.resultsLength = this.loginDetails.data.length;
  });
}
  

}
