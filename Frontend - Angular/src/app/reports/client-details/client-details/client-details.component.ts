import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/data/client-details/client-details';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientDetailsService } from 'src/app/data/client-details/client-details.service';
import { from } from 'rxjs';
import { ReportDetailsService } from '../../../data/report-details.service';
import { JrReportDetailsService } from '../../../data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  clientDetails: MatTableDataSource<ClientDetails>
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public resultsLength = 0;
  date1
  date2

  constructor(
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private jrReportDetailsService: JrReportDetailsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private clientDetailsService: ClientDetailsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.getClientDetails(this.date1, this.date2);

    });
  }
  //get data for the table
  getClientDetails(date1,date2){
    this.reportDetailsService.ClientDetails(date1,date2).subscribe(
      Response=>{
      this.clientDetails = new MatTableDataSource(Response) ;
      this.isLoadingResults=false;
      this.resultsLength = this.clientDetails.data.length;
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
    })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientDetails.filter = filterValue.trim().toLowerCase();
  }

ClientDetailsJrReport(){
  this.isLoadingResults = true;
  this.jrReportDetailsService.ClientDetailsJrReport(this.date1,this.date2,this._authentication.userId).subscribe(
    Response => {console.log("success", Response)
    this.isLoadingResults=false;
    this.viewPdf();
  },
  (error)=>{
    const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
    this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
  }
  )
}
  
  viewPdf() {
    this.jrReportDetailsService.viewPdf(this._authentication.userId).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        window.open(url, '_blank');
      },
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      });
  }

  displayedColumns: string[] = ['user_id', 'client_name', 'amc_no', 'contact_person', 'contact_no', 'address',
     'start_date','active',];
}
