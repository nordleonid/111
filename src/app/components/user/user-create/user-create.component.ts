import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Role } from '../../../model/Role';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {NgModule, ViewChild} from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {  
  submitted = false;
  userForm: FormGroup;
  Role:any = [];

  selectedRole: any;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
    this.getCreate();
  };

  ngOnInit() {}

  // get role table from server 
  getCreate(){
    this.apiService.getRoles().subscribe((data) => {
      this.Role = data;
    })    
  }

  mainForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      role: [this.selectedRole]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.userForm.controls;
    //console.log(this.userForm);
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      this.apiService.createUser(this.userForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
