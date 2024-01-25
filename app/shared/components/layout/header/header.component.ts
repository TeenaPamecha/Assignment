import { Component, OnInit } from '@angular/core';
import { Role, User } from '@app/core/models';
import { AuthenticationService } from '@app/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
  }
}
