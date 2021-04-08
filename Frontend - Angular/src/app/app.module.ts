import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MessageComponent } from './message/message.component';

//---------
import { AmcMasterService } from './shared/amc-master.service';
import { ClientService } from './shared/client.service';
import { SharedAmcService } from './shared/shared-amc.service';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { DepartmentListComponent } from './clients/department-list/department-list.component';
import { CreateAmcMasterComponent } from './amcs/create-amc-master/create-amc-master.component';
import { AmcSerialComponent } from './amcs/amc-serial/amc-serial.component';
import { TableFiterPipe } from './clients/table-fiter.pipe';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { ProformaInvoiceComponent } from './proforma-invoice/proforma-invoice.component';
import { SettingComponent } from './setting/setting.component';
import { ReportsComponent } from './reports/reports.component';
import { DashComponent } from './dash/dash.component';
import { ListcategoryComponent } from './listcategory/listcategory.component'
import { CategoryserviceService } from './categoryservice.service';
import { MatInputModule } from '@angular/material/input';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
//--------------

import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReportComponent } from './report/report.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { AllAmcFilterComponent } from './Filters/all-amc-filter/all-amc-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AllAmcReportComponent } from './Reports/all-amc-report/all-amc-report.component';
import { ClientDetailsFilterComponent } from './Filters/client-details-filter/client-details-filter.component';
import { AllClientsDetailsFilterComponent } from './Filters/all-clients-details-filter/all-clients-details-filter.component';
import { AllClientsDetailsReportComponent } from './Reports/all-clients-details-report/all-clients-details-report.component';
import { UsersFilterComponent } from './Filters/users-filter/users-filter.component';

import { AllAmcsService } from './data/all-amcs/all-amcs.service';
//-------------------------
import { AuthenticationGuard } from './_helpers/authentication.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { TaxListComponent } from './tax-list/tax-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { ProductPieComponent } from './product-pie/product-pie.component';
import { ClientdashtableComponent } from './clientdashtable/clientdashtable.component';
import { TaxFComponent } from './tax-f/tax-f.component';
import { DuePaymentComponent } from './due-payment/due-payment.component';
import { UpdateTaxComponent } from './update-tax/update-tax.component';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { AlertComponent } from './alert/alert.component';
import { SattlementComponent } from './sattlement/sattlement.component';
import { CreateDueinvoiceComponent } from './create-dueinvoice/create-dueinvoice.component';
import { EditDueinvoiceComponent } from './edit-dueinvoice/edit-dueinvoice.component';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { PaymentsDetailsComponent } from './reports/payments-details/payments-details.component';
import { ClientAmcComponent } from './reports/client-amc/client-amc.component';
import { ClientPaymentDetailsComponent } from './reports/client-payment-details/client-payment-details.component';
import { ClientDetailsComponent } from './reports/client-details/client-details/client-details.component';
import { FullDetailsComponent } from './reports/full-details/full-details.component';
import { FullDetailsFilterComponent } from './Filters/full-details-filter/full-details-filter.component';
import { RenewalAmcsFilterComponent } from './Filters/renewal-amcs-filter/renewal-amcs-filter.component';
import { RenewedAmcsFilterComponent } from './Filters/renewed-amcs-filter/renewed-amcs-filter.component';
import { ExpiredAmcsFilterComponent } from './Filters/expired-amcs-filter/expired-amcs-filter.component';
import { RenewalAmcsReportComponent } from './reports/renewal-amcs-report/renewal-amcs-report.component';
import { RenewedAmcsReportComponent } from './reports/renewed-amcs-report/renewed-amcs-report.component';
import { ExpiredAmcsReportComponent } from './reports/expired-amcs-report/expired-amcs-report.component';
import { PaymentReportFilterComponent } from './Filters/payment-report-filter/payment-report-filter.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { FrequencyserviceService } from './frequencyservice.service';
import { UserlistComponent } from './userlist/userlist.component';
import { UserserviceService } from './userservice.service';
import { ProductserviceService } from './productservice.service';
import { UserAddingComponent } from './user-adding/user-adding.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { DatePipe } from '@angular/common';
import { NotificationService } from './shared/notification.service';
import { AmcMasterListComponent } from './amcs/amc-master-list/amc-master-list.component';
import { AmcSerialListComponent } from './amcs/amc-serial-list/amc-serial-list.component';
import { AmcFullDataComponent } from './amcs/amc-full-data/amc-full-data.component';
import { AmcRenewEditComponent } from './amcs/amc-renew-edit/amc-renew-edit.component';
import { NotifierComponent } from './notifier/notifier.component';


@NgModule({
  declarations: [
    AppComponent,
    RootNavComponent,
    HomeComponent,
    ProformaInvoiceComponent,
    SettingComponent,
    ReportsComponent,
    DashComponent,
    AppComponent,
    AddClientComponent,
    ClientListComponent,
    DepartmentListComponent,
    CreateAmcMasterComponent,
    AmcSerialComponent,
    TableFiterPipe,
    ListcategoryComponent,
    AppComponent,
    ProfileComponent,
    EditProfileComponent,
    ReportComponent,
    GenerateReportComponent,
    LoginComponent,
    HomeComponent,
    AllAmcFilterComponent,
    AllAmcReportComponent,
    ClientDetailsFilterComponent,
    AllClientsDetailsFilterComponent,
    AllClientsDetailsReportComponent,
    UsersFilterComponent,
    TaxListComponent,
    InvoiceListComponent,
    CreateInvoiceComponent,
    CurrencyListComponent,
    PaymentListComponent,
    ProductPieComponent,
    ClientdashtableComponent,
    TaxFComponent,
    DuePaymentComponent,
    UpdateTaxComponent,
    UpdateInvoiceComponent,
    MessageComponent,
    AlertComponent,
    SattlementComponent,
    CreateDueinvoiceComponent,
    EditDueinvoiceComponent,
    CreateReceiptComponent,
    PaymentsDetailsComponent,
    ClientAmcComponent,
    ClientPaymentDetailsComponent,
    ExpiredAmcsReportComponent,
    RenewedAmcsReportComponent,
    RenewalAmcsReportComponent,
    ExpiredAmcsFilterComponent,
    RenewedAmcsFilterComponent,
    RenewalAmcsFilterComponent,
    FullDetailsFilterComponent,
    FullDetailsComponent,
    ClientDetailsComponent,
    PaymentReportFilterComponent,
    FrequencyComponent,
    UserlistComponent,
    UserAddingComponent,
    ProductlistComponent,
    AddClientComponent,
    ClientListComponent,
    DepartmentListComponent,
    CreateAmcMasterComponent,
    AmcSerialComponent,
    TableFiterPipe,
    AmcMasterListComponent,
    AmcSerialListComponent,
    AmcFullDataComponent,
    AmcRenewEditComponent,
    NotifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ClientService,
    AmcMasterService,
    SharedAmcService,
    CategoryserviceService,
    AllAmcsService,
    UserserviceService,
    FrequencyserviceService,
    ProductserviceService,
    NotificationService,
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddClientComponent,
    AllAmcFilterComponent
  ],
})
export class AppModule { }

