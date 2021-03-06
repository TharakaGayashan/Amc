import { AuthenticationService } from './../_helpers/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { environment } from 'src/environments/environment';
import { ImageService } from '../data/image-service.service';
import { LoginDetailsService } from '../data/login-details.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userId: String
  notificationNo;
  hide = true;
  private redirectURL: any;
  public imageSrc: string;
  public showMessage = false;
  error: any;
  public isDesabled = false;
  public isLoadingResults = false
  public isRateLimitReached = false;
  errorMessage = "Unknown Error"

  private baseURL = environment.baseServiceUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public _authentication: AuthenticationService,
    private imageService: ImageService,
    private loginDetailsService: LoginDetailsService,
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.queryParams;
    if (params['redirectURL']) {
      this.showMessage = true;
      this.redirectURL = params['redirectURL'];
    }
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required,
      Validators.minLength(8),]
      ]
    });
  }

  logout() {
    this.loginDetailsService.logoutDetails().subscribe(
      Responce => {
        this.router.navigate(['/login']);
        window.location.reload()
      }
    )
  }
  onLogin(): void {

    /*
    response {
      status: true if login successful, false if login unsuccessful,
      token: JWT token,
      message: login successful or username/password incorrect,
      role: admin/user
    }
    */

    this.error = '';
    if (this.loginForm.valid) {
      this.isLoadingResults = true
      this.http.post<any>(`${this.baseURL}authenticate`, this.loginForm.value).subscribe(
        response => {

          const currentUser = {
            token: response.jwt,
            role: response.role,
            username: response.username,
            userId: response.userId,
            imageSrc: this.imageService.Image(response.userId),
         
          }
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          if (this.redirectURL) {
            this.router.navigateByUrl(this.redirectURL).catch(() => {
              this.navigatePage(response);
            })
          } else {
            this.navigatePage(response);
          }
          this.isLoadingResults = true;
          this.isRateLimitReached = false;
        }, error => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          this.errorMessage = (error.status === 0  || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data'; }
      );
    } this.isDesabled = true;
  }

  forgotpassword() {
    this.router.navigate(['login/forgetPassword'])
  }

  navigatePage(response: any) {
    if (response.role == "ROLE_ADMIN" || response.role == "ROLE_AMC_COORDINATOR" || response.role == "ROLE_ACCOUNTANT") {
      this.router.navigate(['/adminhome']);
    } else if (response.role == "ROLE_CLIENT") {
      this.router.navigate(['/clienthome']);
    } else {
      this.dialog.open(AlertComponent);
    }
  }

  gotoadminhome(){
    this.router.navigate(['/adminhome']);
  }
  gotoclienthome(){
    this.router.navigate(['/clienthome']);
  }


}


