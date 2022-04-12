import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NfcComponent } from './nfc/nfc.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { AuthGuard } from './auth.guard';
import { LogComponent } from './log/log.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { AccountComponent } from './account/account.component';
import { ResetComponent } from './reset/reset.component';
//import { WorkHoursComponent } from './work-hours/work-hours.component';
import { WorkHoursChartComponent } from './work-hours-chart/work-hours-chart.component';
import { AdminGuard } from './admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "reset/:token", component: ResetComponent },
  { path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children:[
      { path: 'dashboard', component: DashboardComponent},
      { path: 'member', component: MemberComponent },
      //{ path: 'statusList', component: StatusListComponent },
      { path: 'log', component: LogComponent },
      { path: 'nfc', component: NfcComponent },
      { path: 'deviceList', component: DeviceListComponent },
      { path: 'workHours', component: WorkHoursChartComponent },
      { path: 'maintenance', component: AccountComponent, canActivate: [AdminGuard] },
      { path: 'help', component: HelpComponent }
    ]
  },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
