import { User } from '../../../model/User';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Role } from '../../../model/Role';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {NgModule, ViewChild} from '@angular/core';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
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
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      role: [this.selectedRole]
    })
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  // getUser(id) {
  //   console.log(id)
  //   this.apiService.getUser(id).subscribe(data => {
  //     this.editForm.setValue({
  //       name: data['name'],
  //       role: data['role']
  //     });
  //   });
  // }


  onSubmit(id) {
    console.log("id on submit", id);
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      this.apiService.updateUser(id, this.editForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}