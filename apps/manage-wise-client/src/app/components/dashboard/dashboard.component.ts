/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from './../../services/department.service';
import { LeaveService } from './../../services/leave.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'manage-wise-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  totalEmployees = 20;

  employeeCount = 20;

  employees!: any;
  departments!: any;
  leaves!: any;
  pendingLeaves: any;

  currentUser!: any;

  basicData: any;

  basicOptions: any;

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private leaveService: LeaveService, private userService: UserService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getDepartments();
    this.getLeaves();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };


  }

  getEmployees() {
    this.employeeService.getAllEmployees(0, 0).subscribe((res) => {
      this.employees = res;
    })
  }

  getDepartments() {
    this.departmentService.getDepartments(0, 0).subscribe((res) => {
      this.departments = res;
    })
  }

  getLeaves() {
    this.leaveService.getLeaves().subscribe((res) => {
      this.leaves = res;
      // console.log(this.leaves);
      this.pendingLeaves = this.leaves.filter((leave: any) => {
        return leave.status === "pending";
      });
      // console.log(this.pendingLeaves); 
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe((res) => {
      this.currentUser = res;
      if (this.currentUser?.role === "admin") {
        this.getEmployees();
      }
    })
  }

}
