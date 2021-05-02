import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import {RenewalAmcs} from '../../data/RenewalAmcs/renewal-amcs'
import { ReportDetailsService } from '../../data/report-details.service'

@Component({
  selector: 'app-renewal-amcs-report',
  templateUrl: './renewal-amcs-report.component.html',
  styleUrls: ['./renewal-amcs-report.component.scss']
})
export class RenewalAmcsReportComponent implements OnInit {

  renewalAmcs: MatTableDataSource<RenewalAmcs>;
  public isLoadingResults = true;
  public resultsLength = 0;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
  ) { }
  date1 : any
  date2 : any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.RenewalAmcsDetails(this.date1,this.date2);
  });
}

  RenewalAmcsDetails(date1,date2){
    this.reportDetailsService.RenewalAmcsDetails(date1,date2).subscribe(
      data=>{
      this.renewalAmcs =new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.renewalAmcs.data.length;
    })
  }
  viewPdf() {
    this.jrReportDetailsService.viewPdf(this._authentication.userId).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      });
  }
  displayedColumns: string[] = [ 'amc_no','amc_serial_no','renewal','client_name','department_name','conatact_no',
  'category_name','frequency','currency_name','total_value_lkr','mtc_qty', ];
}
