import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MessagingService } from '../services/messaging.service';
import { UserDataService } from '../services/user-data.service';

var misc: any = {
  sidebar_mini_active: true
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  message;
  userData: any = [];
  constructor(private userDataService: UserDataService, private messagingService: MessagingService, private authenticationService: AuthenticationService) {
    this.userData = this.userDataService.getUserData();
    if (this.userData.notification_token == undefined || this.userData.notification_token == null) {
      setTimeout(() => {
        this.messagingService.requestPermission();
      }, 2000)

    }
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage;

  }
  minimizeSidebar() {
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("sidebar-mini")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("sidebar-mini");
      misc.sidebar_mini_active = false;
      // this.showSidebarMessage("Sidebar mini deactivated...");
    } else {
      body.classList.add("sidebar-mini");
      // this.showSidebarMessage("Sidebar mini activated...");
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  ngOnInit() {
    this.authenticationService.autoLogin();
    var sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.setAttribute("data", 'primary');
    var mainPanel = document.getElementsByClassName("main-panel")[0];
    mainPanel.setAttribute("data", 'primary');
  }

}
