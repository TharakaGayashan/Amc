import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-quarter-wise-revenue-report',
  templateUrl: './quarter-wise-revenue-report.component.html',
  styleUrls: ['./quarter-wise-revenue-report.component.scss']
})
export class QuarterWiseRevenueReportComponent implements OnInit {

  dataSource:MatTableDataSource<any[]>;
  public isLoadingResults = true;
  public isRateLimitReached =false;
  public resultsLength = 0;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
  ) { }

  date1: any;
  date2: any;
  category: String

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      var d = new Date(this.date1);
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.date2= new Date(year + 1, month, day -1);
      //------------------
      this.category = params.get('category');
      this.QuarterWiseRevenue(this.date1,this.category);
    });
  }

  QuarterWiseRevenue(date1,category) {
    this.reportDetailsService.QuarterWiseRevenue(date1,category).subscribe(
      data => {
        this.dataSource=new MatTableDataSource(data);
        this.isLoadingResults=false;
        this.resultsLength = this.dataSource.data.length;
      },
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
        this.isLoadingResults=false;
      })
  }

  QuarterWiseRevenueJrReport(){
    this.isLoadingResults=true;
    this.jrReportDetailsService.QuarterWiseRevenueJrReport(this.date1,this.category,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.isLoadingResults=false;
      this.viewPdf();
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
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
  displayedColumns: string[] = ['quarter1', 'quarter2', 'quarter3', 'quarter4', 'total'];
}
