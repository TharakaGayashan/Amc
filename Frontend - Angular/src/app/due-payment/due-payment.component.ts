import { AuthenticationService } from './../_helpers/authentication.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DuePaymentService } from './../due-payment.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-due-payment',
  templateUrl: './due-payment.component.html',
  styleUrls: ['./due-payment.component.scss']
})
export class DuePaymentComponent implements OnInit {

  duePayments: MatTableDataSource<any>

  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error";
  public isAuthorized: boolean;

  constructor(
    public duePaymentService: DuePaymentService,
    public router: Router,
    public _authentication: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  displayedColumns:string[] = ['id','due_date','invoice_amount','amc_no','invoice_payble_lkr','currency_id','Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

    this.getDuepayemt();
    this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
  }

  getDuepayemt(){
    if(this._authentication.role == 'ROLE_CLIENT'){
      this.duePaymentService.getDuePaymentclient(this._authentication.userId).subscribe(data =>{
        this.duePayments = new MatTableDataSource(data); 
        this.duePayments.sort = this.sort;  
        this.duePayments.paginator = this.paginator;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        }, error => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
        })
    }else{
    this.duePaymentService.getDuepaymentList().subscribe(data =>{
    this.duePayments = new MatTableDataSource(data); 
    this.duePayments.sort = this.sort;  
    this.duePayments.paginator = this.paginator;
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
    })
  }
  }

  deletedueinvoice(id: number){ 
  this.duePaymentService.deletedueinvoice(id).subscribe(data =>{
    this.notificationService.showNoitfication('Successfully delete', 'OK', 'success', () => {  
    this.getDuepayemt();  });
       
  },
  error =>  { let message = (error.status === 0 || error.status === 400  || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. please try again'
  this.notificationService.showNoitfication(message, 'OK', 'error', null); }
);
}

  applyFilter(filterValue: string) {
    this.duePayments.filter = filterValue.trim().toLowerCase();
  }

  updatedueinvoice(id: number){
    this.router.navigate(['editdueinvoice',id]);
  } 

}
