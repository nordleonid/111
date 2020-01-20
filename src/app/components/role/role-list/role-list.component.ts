import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../service/api.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})

export class RoleListComponent implements OnInit {
  
  Role:any = [];

  constructor(private apiService: ApiService) { 
    this.readRole();
  }

  ngOnInit() {}

  readRole(){
    this.apiService.getRoles().subscribe((data) => {
     this.Role = data;
    })    
  }

  removeRole(role, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteRole(role._id).subscribe((data) => {
          this.Role.splice(index, 1);
        }
      )    
    }
  }

}