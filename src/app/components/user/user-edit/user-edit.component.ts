import { User } from '../../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  Role: any = [];
  User: any = [];
  selectedRole: any = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.getCreate();
  }

  getCreate() {
    this.apiService.getRoles().subscribe((data) => {
      this.Role = data;
      // console.log("get create data", this.Role);
    });
  }

  ngOnInit() {
    this.updateUser();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      role: [this.selectedRole]
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getUser(id) {
    console.log('get user', id);
    this.apiService.getUser(id).subscribe(data => {
      this.User = data[0];
      // console.log('data get user', this.User);
      this.editForm.setValue({
        name: this.User['name'],
        id: this.User['id'],
        role: this.User['role']
      });
    });
  }

  updateUser() {
    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      role: [this.selectedRole]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      // if (window.confirm('Are you sure?')) {
        const id = this.actRoute.snapshot.paramMap.get('id');
        console.log('form data before send', this.editForm.value);
        this.apiService.updateUser(id, this.editForm.value).subscribe(res => {
          console.log('form data after send', this.editForm.value);
          this.router.navigateByUrl('/users-list');
          }, (error) => {
            console.log(error);
          });
      // }
    }
  }
}
