import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../_Services/alert.service';
import { CustomvalidationService } from '../_Services/customvalidation.service';
import { SignupService } from '../_Services/signup.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  focus2;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  message: any;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private customValidator:CustomvalidationService,
    private signupService:SignupService,
    private alertService: AlertService) { }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      fullName:    ['', [Validators.required, Validators.minLength(4)]],
      phone:    ['', [Validators.required, Validators.minLength(8)]],
      companyEmployeesNumber:    ['', [Validators.required, Validators.minLength(1)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.customValidator.getEmailPattern())])],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
  },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  );
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  this.loading=true;
  this.signupService.Register(this.f.email.value,this.f.password.value,this.f.fullName.value,this.f.phone.value,this.f.companyEmployeesNumber.value)
  .pipe(first())
  .subscribe(
      data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
}
}
