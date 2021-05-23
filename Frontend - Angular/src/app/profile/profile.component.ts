import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router'
import {Users } from '../data/Users/users'
import { UsersService } from '../data/Users/users.service';
import {ImageService} from '../data/image-service.service';
import { error } from 'selenium-webdriver';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId : String
  users: Users
  imgSource : String
  public isLoadingResults = true;
  public isRateLimitReached =false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private imageService: ImageService,
    private notificationService: NotificationService,
    ) { }
    public imageSrc: string;

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['userId']
    this.users=new Users();
    this.usersService.getUsersById(this.userId).subscribe(data =>{
      console.log(data);
      this.users=data;
      this.imageSrc= this.imageService.Image(this.userId);
      this.isLoadingResults = false;
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
    })
    //get image--------------------
    // this.imageService.getImage(this.userId).subscribe(
    //   data =>{
    //     this.imageSrc = data;
    //     console.log("ssssssssss")
    //     console.log(data)
    //   },
    // )
    // this.imageSrc= this.imageService.Image(this.userId);
  }

  editprofile (userId: String){
    this.router.navigate(['editprofile',userId])
    }
}