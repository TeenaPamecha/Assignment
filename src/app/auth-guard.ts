import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserDataService } from './services/user-data.service';
import { AuthenticationService } from './services/authentication.service';

export const ROUTES_ALL: any[] = [
  {
    "Manage Category": [{
      path: "/category-list",
      title: "Category"
    }]
  },

  {
    "Manage Dish Type": [{
      path: "/dishtype-list",
      title: "Dish Type"
    }]
  },

  {
    "Manage Cuisine": [{
      path: "/cuisine-list",
      title: "Cuisine"
    },
    {
      path: '/cuisine-add',
      title: "Cuisine"
    }]
  },
  {
    "Manage Diet": [{
      path: "/diet-list",
      title: "Diet"
    },
    {
      path: '/diet-add',
      title: "Diet"
    }]
  },
  {
    "Manage Chef": [{
      path: "/chef-list",
      title: "Chef"
    },
    {
      path: '/chef-add',
      title: "Chef",
    },
    {
      path: '/menu-list',
      title: "Chef",
    },
    {
      path: '/dish-add',
      title: "Chef",
    },
    {
      path: '/combo-add',
      title: "Chef",
    },
    {
      path: '/reservation-add',
      title: "Chef",
    },
    {
      path: '/promo-add',
      title: "Chef"
    }]
  },
  {
    "Manage Driver": [{
      path: "/driver-list",
      title: "Driver"
    },
    {
      path: '/driver-add',
      title: "Driver",
    }]
  },
  {
    "Manage Customer": [{
      path: "/customer-list",
      title: "Customer"
    },
    {
      path: '/customer-add',
      title: "Customer",
    },]
  },
  {
    "Manage Order": [
      {
        path: "/order-list",
        title: "Order"
      },
      {
        path: '/order-list',
        title: "Order",
      },
      {
        path: '/order-details',
        title: "Order",
      },
      {
        path: '/tracking-driver',
        title: "Order",
      }]
  }
];

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  userData: any = [];

  constructor(private userDataService: UserDataService, private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    console.log('entry point:...');
    return this.authenticationService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          var size = router.url.split('/').length > 2 ? 1 : 0; // for url list and add difference
          var titlee = size == 1 ? router.url.substring(0, router.url.indexOf('/', 1)) : router.url;
          this.userData = this.userDataService.getUserData();
          var index = this.userData.roles[0].name == "Sub admin" ? 1 : -1;
          if (index == -1 || router.url == '/profile' || router.url == '/dashboard') {
            return true;
          }
          else {
            if (this.userData != null && this.userData != undefined) {
              if (this.userData.hasOwnProperty('permissions')) {
                var flag = '';
                var flag1 = 0;
                ROUTES_ALL.filter((data1, k) => {
                  data1[Object.keys(data1)[0]].filter((d, j) => {
                    if (d.path == titlee) {
                      flag = Object.keys(data1)[0];
                    }
                  });
                });

                if (this.userData.permissions.length > 0 && index > -1) {

                  this.userData.permissions.forEach((permission, i) => {
                    if (permission.title == flag) {
                      flag1 = 1;
                    }
                  })
                  if (flag1 == 1) {
                    return true;
                  }
                  else {
                    return false;
                  }
                }
                else {
                  return false;
                }
              }
              else {
                return true;
              }
            }
          }
        }
        return this.router.createUrlTree(['/login']);
      })
    )
  }
}
