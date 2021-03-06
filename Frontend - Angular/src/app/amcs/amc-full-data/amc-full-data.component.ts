import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { AmcData } from './../../Model/amc-data.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-amc-full-data',
  templateUrl: './amc-full-data.component.html',
  styleUrls: ['./amc-full-data.component.css']
})
export class AmcFullDataComponent implements OnInit {

  private currentDate = new Date();
  public clientName: string;
  public data: AmcData;
  public isLoadingResults = true;
  public isLoadingScannedCopy = false;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public isAuthorized = false;
  public isExpired = false;
  public isInactive = false;
  public isBlocked = false;

  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
    if (this.authService.role === 'ROLE_CLIENT') this.isBlocked = true;
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      if (value.type === "%M1%") { //type defines the whether the data are loaded useing either Amc No. or Amc Serial No. %M1%-> using Amc No
        this.clientName = value.cname;
        this.loadDataByAmcNo(value.amcno);
      }
      else if (value.type === "%S2%") { //%S2% -> using serial No
        this.clientName = value.cname;
        this.loadDataByAmcSerialNo(value.serial);
      }

    });
  }

  //Get amc  full data from amc no
  loadDataByAmcNo(amcNo: string): void {
    this.isLoadingResults = true;
    this.amcService.getAmcFullDataByAmcNo(amcNo).subscribe(response => {
      this.data = response;
      this.checkStatus();
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
    }, error => {
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    })
  }

  //get amc full data from serial no
  loadDataByAmcSerialNo(amcSerialNo: string): void {
    this.isLoadingResults = true;
    this.amcService.getAmcFullDataByAmSerialcNo(amcSerialNo).subscribe(response => {
      this.data = response;
      this.checkStatus()
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
    }, error => {
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    })
  }

  checkStatus(): void {
    if (this.currentDate > new Date(this.data.mtc_end_date)) this.isExpired = true;
    if (!this.data.active) this.isInactive = true;
    if(this.isInactive && this.isExpired) this.isBlocked = true;
  }

  //Download scanned copy of amc
  getScannedCopy(): void {
    this.isLoadingScannedCopy = true;
    this.amcService.getAmcScannedCopy(this.data.contract_url).subscribe(response => {
      this.isLoadingScannedCopy = false;
      let url = URL.createObjectURL(response);
      window.open(url, '_blank');
    },
      error => {
        this.isLoadingScannedCopy = false;
        let message = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      });
  }

  //renew amc
  onRenew(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "serial": this.data.amc_serial_no,
          "cname": this.clientName
        })
      }
    };
    this.router.navigate([`clients/amc-list/${this.data.amc_serial_no}/renew`], navigationExtras);
  }

  //Edit amc general data
  onEditGeneral(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          cname: this.clientName,
          dname: this.data.department_name,
          amcNo: this.data.amc_no,
          asno: this.data.amc_serial_no,
          did: this.data.client_dept_id,
          type: "%u2%"
        })
      }
    };
    this.router.navigate(['/amcMaster/new'], navigationExtras);
  }

}
