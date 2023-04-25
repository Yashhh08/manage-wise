import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { LeaveFormComponent } from './components/leave-form/leave-form.component';
import { LeavesComponent } from './components/leaves/leaves.component';

export const appRoutes: Route[] = [
    {
        path: "", component: LoginComponent
    },
    {
        path: "signup", component: SignupComponent
    },
    {
        path: "home", component: LayoutComponent, children: [
            {
                path: "employeeForm", component: EmployeeFormComponent
            },
            {
                path: "employees", component: EmployeesComponent
            },
            {
                path: "attendanceForm", component: AttendanceFormComponent
            },
            {
                path: "attendances", component: AttendancesComponent
            },
            {
                path: "departmentForm", component: DepartmentFormComponent
            },
            {
                path: "departments", component: DepartmentsComponent
            },
            {
                path: "leaveForm", component: LeaveFormComponent
            },
            {
                path: "leaves", component: LeavesComponent
            }
        ]
    }
];