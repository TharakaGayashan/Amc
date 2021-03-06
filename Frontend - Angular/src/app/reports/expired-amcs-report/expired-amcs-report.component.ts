import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ExpiredAmcs } from '../../data/ExpiredAmcs/expired-amcs';

@Component({
  selector: 'app-expired-amcs-report',
  templateUrl: './expired-amcs-report.component.html',
  styleUrls: ['./expired-amcs-report.component.scss']
})
export class ExpiredAmcsReportComponent implements OnInit {

  expiredAmcs : MatTableDataSource<ExpiredAmcs>;
  public isLoadingResults = true;
  public isRateLimitReached =false;
  public resultsLength = 0;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    ) { }

    date1
    date2

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.date1 = params.get('date1');
        this.date2 = params.get('date2');
        this.ExpiredAmcsDetails(this.date1,this.date2);
    });
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expiredAmcs.filter = filterValue.trim().toLowerCase();
  }

  ExpiredAmcsDetails(date1,date2){
    this.reportDetailsService.ExpiredAmcsDetails(date1,date2).subscribe(
      data=>{
      this.expiredAmcs = new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.expiredAmcs.data.length;
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
    })
  }

  ExpiredAmcJrReport(){
    this.isLoadingResults = true;
    this.jrReportDetailsService.ExpiredAmcsJrReport(this.date1,this.date2,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.isLoadingResults=false;
      this.viewPdf()
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
    });
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

  displayedColumns: string[] = [ 'amc_no','mtc_end_date','renewal','client_name','category_name','contact_no','frequency',
                                  'total_value_lkr',];
}
