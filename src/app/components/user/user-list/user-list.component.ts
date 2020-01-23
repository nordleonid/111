import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  
  User:any = [];

  constructor(private apiService: ApiService) { 
    this.readUser();
  }

  ngOnInit() {
    
  }

  readUser(){
    this.apiService.getUsers().subscribe((data) => {
     this.User = data;
    })    
  }

  removeUser(user, index) {
    console.log("delete", user.id);
    if(window.confirm('Are you sure?')) {

      let idToDelete = user.id;
    this.User.forEach((el, i) => {
      if (el.id == idToDelete) this.User.splice(i, 1)
    })
      this.apiService.deleteUser(user.id).subscribe((data) => {
        this.User.splice(index, 1);
      })
    }
  }
}