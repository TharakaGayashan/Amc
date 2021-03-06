import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserserviceService } from '../userservice.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  id: number;
  searchKey:string;

  listData:  MatTableDataSource<any>;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public pagesize = 20;
  public filterValue: string;
  isEdit=false;
  userEditForm:FormGroup;
  public dataSavingProgress = false;
  userId:number;
  

  displayedColumns: string[] = ['userId', 'uname','role', 'active', 'email','contactNo','savedIp','savedBy','savedOn','lastModifiedBy','lastModifiedOn','action'];
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private _service: UserserviceService, private router: Router,
    private route: ActivatedRoute,private formBuilder:FormBuilder,private notificationService: NotificationService) { }

    ngOnInit():void{
      this.isEdit=false;
       this._service.getUserList().subscribe(
         list=>{
          this.listData = new MatTableDataSource(list);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.isLoadingResults = false;
         }
       ),
       catchError( error => {
        this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
        this.isLoadingResults = false;
        // set flag to identify that errors ocuured
        this.isRateLimitReached = true;
        return observableOf([]);
      })


      this. userEditForm=this.formBuilder.group(
        {
          role:['',[Validators.required]],
          active:['',[Validators.required]]
        }
      )
    }
 
     onEdit(){
      this.dataSavingProgress = true;
       this._service.updateUser(this.userId,this.userEditForm.value).subscribe(
        (result)=>{
          this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
          this.dataSavingProgress = false;
        },  (error) => {
          const errMessage = (error.status === 0 || error.status === 400 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
          this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
        }).add(()=>this.dataSavingProgress=false)
      
      }
       
  editUserList(row) {
    this.isEdit=true;
    this.userId=row.userId;
    this.userEditForm.patchValue({
      role:row.role,
      active:row.active
    });  
   }

  addUser(){
    this.router.navigate(['user']);
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
