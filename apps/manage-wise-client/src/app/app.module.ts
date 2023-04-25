import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LayoutComponent } from './components/layout/layout.component';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeesComponent } from './components/employees/employees.component';
import { TableModule } from 'primeng/table';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { TimeFormatPipe } from './timeFormatPipe.pipe';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { LeaveFormComponent } from './components/leave-form/leave-form.component';
import { LeavesComponent } from './components/leaves/leaves.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SignupComponent,
    EmployeeFormComponent,
    EmployeesComponent,
    AttendanceFormComponent,
    AttendancesComponent,
    TimeFormatPipe,
    DepartmentFormComponent,
    DepartmentsComponent,
    LeaveFormComponent,
    LeavesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    RippleModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyPrimeNGModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    SidebarModule,
    ToolbarModule,
    AccordionModule,
    ListboxModule,
    MenuModule,
    ConfirmPopupModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    DynamicDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    ConfirmationService,
    DialogService,
    DynamicDialogConfig,
  ],
  bootstrap: [AppComponent],
  exports: [
    LoginComponent,
    LayoutComponent,
    SignupComponent,
    EmployeeFormComponent,
    EmployeesComponent,
    AttendanceFormComponent,
    AttendancesComponent,
    DepartmentFormComponent,
    DepartmentsComponent,
    LeaveFormComponent,
    LeavesComponent,
  ],
})
export class AppModule {}
