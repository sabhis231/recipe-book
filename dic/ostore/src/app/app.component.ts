import { map } from 'rxjs/operators';
import { AuthService } from 'shared/service/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ostore';

  constructor(
    private authService: AuthService,
    private routes: ActivatedRoute,
    router: Router
  ) {
    this.authService.userObh$.subscribe(userData=>{
      if(userData) {
        authService.doSaveUpdateUser(userData);
        this.authService.fetchUserFromDB(userData.uid)
        let returnUrl = this.routes.snapshot.queryParamMap.get('returnUrl');
        if(returnUrl) {
        router.navigateByUrl(returnUrl);
        }else {
          router.navigateByUrl("/");
        }
      }
    });
  }
}
