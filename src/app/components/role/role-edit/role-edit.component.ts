import { Role } from './../../../model/Role';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})

export class RoleEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  roleData: Role[];
  RoleProfile: Role[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.updateRole();
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.getRole(id);
    // this.editForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   role: ['', [Validators.required]]
    // })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('role').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  // getRole(id) {
  //   this.apiService.getRole(id).subscribe(data => {
  //     this.editForm.setValue({
  //       name: data['name'],
  //       role: data['role']
  //     });
  //   });
  // }

  // updateRole() {
  //   this.editForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     role: ['', [Validators.required]]
  //   })
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   if (!this.editForm.valid) {
  //     return false;
  //   } else {
  //     if (window.confirm('Are you sure?')) {
  //       let id = this.actRoute.snapshot.paramMap.get('id');
  //       this.apiService.updateRole(id, this.editForm.value)
  //         .subscribe(res => {
  //           this.router.navigateByUrl('/roles-list');
  //           console.log('Content updated successfully!')
  //         }, (error) => {
  //           console.log(error)
  //         })
  //     }
  //   }
  // }

}