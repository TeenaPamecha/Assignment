import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Countries from '../../assets/data/Countries.json';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from '../services/authentication.service';
import { UserDataService } from '../services/user-data.service';
import { serverCodes } from '../server-codes';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  focus1: boolean;
  focus1Touched: boolean = false;
  focus2Touched: boolean = false;
  focus3Touched: boolean = false;
  TCCP_HOST_URL: any = window.location.protocol + "//" + window.location.host+'/TCPP/ichefTCPP.html?';
   //environment.TCCP_HOST_URL;

  loginForm: FormGroup = this.formBuilder.group({
    country_code: ['', Validators.required],
    country: ['', Validators.required],
    mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern('^-?[0-9]+$')]],
    otp: ['', [Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^-?[0-9]+$')]]
  });

  login = false;
  // Validators.pattern("^-?[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]*$")
  loginEForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required]]
  });

  InvalidEmailId: boolean = false;

  dropdownSettings = {};
  tabs = ['Email Login', 'Mobile Login'];
  activeTab = this.tabs[0];

  OTPRequired: boolean = false;
  OTPRequiredError: string = '';
  countryError: string = '';

  countries_array;
  userData: any;
  isResendOtp: boolean = false;
  interval: number = 30;

  constructor(public formBuilder: FormBuilder, private userDataService: UserDataService, private authenticationService: AuthenticationService,
    private router: Router, private toastr: ToastrService) {
  }

  onTabChange(activeTab) {
    console.log('activeTab:..', activeTab);
    this.activeTab = activeTab.tab.textLabel;
    this.login = false;
    if (this.activeTab == "Email Login") {
      this.OTPRequired = false;
      this.focus1Touched = false;
      this.focus2Touched = false;
      this.loginEForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required]]
      });
    } else {
      this.focus1Touched = false;
      this.focus2Touched = false;
      this.focus3Touched = false;
      this.loginForm = this.formBuilder.group({
        country_code: ['', Validators.required],
        // country: ['', Validators.required],
        mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern('^-?[0-9]+$')]],
        otp: ['', [Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^-?[0-9]+$')]]
      });
    }
  }
  completed(eventData) {
    if (eventData.stop) {
      this.isResendOtp = true;
    } else {
      this.isResendOtp = false;
    }
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    this.userData = this.userDataService.getUserData();
    if (this.userData != null && this.userData != undefined) {
      this.router.navigate(['/dashboard']);
    }
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Country',
      classes: 'selectpicker btn-danger', // btn-danger
      lazyLoading: true,
      enableCheckAll: false,
      enableSearchFilter: true,
      maxHeight: 180
    }
    this.countries_array = Countries.Countries;
  }
  otpChange(event) {
    if (this.OTPRequiredError && this.loginForm.get('otp').value != event) {
      this.OTPRequiredError = '';
    }
  }
  showMessageError(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right"
      });
  }

  // Type form functions
  get loginF() {
    return this.loginForm.controls;
  }

  // Type form functions
  get loginEF() {
    return this.loginEForm.controls;
  }

  onSelectedChange = (event) => {
    if (event.id) {
      this.loginForm.controls['country_code'].setValue(event.id);
      this.countryError = '';
    }
  }
  onLogin(flag) {

    if (this.activeTab == "Email Login") {
      this.login = true;

      if (this.loginEForm.invalid) {
        return;
      }
      if (this.loginEForm.valid) {
        let responseObs = this.authenticationService.login(this.loginEForm.value);
        responseObs.subscribe(
          data => {

            let response: any = data;
              var index = response.data.roles[0].name == "Sub admin" ? 1 : -1;
              if (index == 1) {
                if (response.data.status == 6) {
                  this.showMessage('Sub admin deactivated, please contact administration.');
                  let responseObs = this.authenticationService.logout();
                  responseObs.subscribe(
                    data => {
                      let response: any = data;
                      if (response) {
                        this.router.navigate(['/login']);
                      }
                    },
                    err => {
                      this.userDataService.removeUserData();
                      console.log('error of logout:', err.error.message);
                    });
                }
                else if (response.data.status == 4) {
                  this.router.navigate(['/dashboard']);
                }
              }else{
                this.router.navigate(['/dashboard']);
              }

            },
            err => {
              this.showMessageError(err.error.message);
            });
      }
    }
    else {
      this.login = true;
      if (this.loginForm.invalid && this.loginForm.value.country_code == '') {
        this.loginForm.controls['country_code'].markAsTouched();
        this.loginForm.controls['country_code'].setErrors({ 'invalid': true });
        this.countryError = "please select country.";
      }
      else if (this.loginForm.invalid) {
        return;
      }

      if (flag == 3) {
        this.onSendOTP(flag);
        this.login = false;
      }

      if (this.loginForm.get('otp').value && this.OTPRequired && !this.loginForm.invalid && flag == 0) {
        this.onVerifyOTP();
      }
      else if (this.OTPRequired && this.loginForm.get('otp').value == null && !this.loginForm.invalid && flag == 0) {
        this.loginForm.controls['otp'].markAsTouched();
        this.loginForm.controls['otp'].setErrors({ 'invalid': true });
        this.login = false;
      }
      else if (!this.loginForm.invalid || flag == 1) {
        this.onSendOTP();
        this.login = false;
      }
    }
  }
  onVerifyOTP() {
    let responseObs = this.authenticationService.verifyOTP(this.loginForm.value);
    responseObs.subscribe(
      data => {
        let response: any = data;
        if (response) {
          switch (response.message) {
            case serverCodes['LOGIN_SUCCESS']: {
              this.router.navigate(['/dashboard']);
              break;
            }
            case serverCodes['NOT_VERIFYIED_OTP']: {
              this.loginForm.controls['otp'].markAsTouched();
              this.loginForm.controls['otp'].setErrors({ 'invalid': true });
              this.OTPRequiredError = response.message;
              break;
            }
          }
        }
      },
      err => {
        this.showMessageError(err.error.message);
      });
  }

  showMessage(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  onSendOTP(flag = 0) {
    // if (this.loginForm.controls['country'].value[0].hasOwnProperty('id')) {
    //   this.loginForm.controls['country_code'].setValue(this.loginForm.controls['country'].value[0].id);
    // }
    let responseObs = this.authenticationService.sendOTP(this.loginForm.value);
    responseObs.subscribe(
      (data) => {
        let response: any = data;
        console.log('response data:..', response);
        if (response) {
          if (flag == 3) {
            this.interval = 30;
            this.isResendOtp = false;
            this.showMessage(response.message);
          }
          this.OTPRequired = true;
        }
      },
      err => {
        this.showMessageError(err.error.message);
      });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }
}