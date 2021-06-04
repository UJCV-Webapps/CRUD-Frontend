import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { UserInfinite, User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tempUser: User[] = Array(10).fill({ name: 'Angel', title: 'Title' });

  users: UserInfinite;

  offset: number = 10;

  pageSize = 10;

  constructor( private _searchService: NbSearchService ) {
  }

  ngOnInit(): void {
    this._searchService.onSearchSubmit().subscribe( term => {
      console.log(term);
    });
    this.users = { loading: false, users: this.tempUser, page: 1 };
  }

  loadNext() {
    if (this.users.loading) { return }

    this.users.loading = true;

    setTimeout(() => {
      this.users.users = [...this.users.users, ...Array(10).fill({ name: 'Angel', title: 'Title' })];
      this.users.loading = false;
      this.users.page++;
    }, 1500);
    //TODO: Paginated service to get data

  }

}
