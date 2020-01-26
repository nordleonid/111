import { Role } from './../../../model/Role';
import {Component, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})

export class RoleEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  Role: any = [];


  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  getRole(id) {
    console.log('get role', id);
    this.apiService.getRole(id).subscribe(data => {
      this.Role = data[0];
      console.log('data get role', this.Role);
      this.editForm.setValue({
        name: this.Role['name'],
        id: this.Role['id']
      });
    });
  }

  ngOnInit() {
    this.updateRole();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getRole(id);
    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('role').setValue(e, {
      onlySelf: true
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }



  updateRole() {
    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]]
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
        this.apiService.updateRole(id, this.editForm.value).subscribe(res => {
          console.log('form data after send', this.editForm.value);
          this.router.navigateByUrl('/roles-list');
        }, (error) => {
          console.log(error);
        });
      // }
    }
  }
}
