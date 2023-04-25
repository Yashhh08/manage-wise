/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-wise-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  sidebarVisible = false;

  currentUser: any;

  employeeTab!: MenuItem[];
  attendanceTab!: MenuItem[];
  departmentTab!: MenuItem[];
  leaveTab!: MenuItem[];
  performanceTab!: MenuItem[];

  userTab!: MenuItem[];

  constructor(private userService: UserService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.getProfile();

    this.currentUser

    this.userTab = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => { this.confirm(event) }
      }
    ]

  }

  intitateSideBar(role: string) {
    this.employeeTab = [
      {
        label: 'Add Employee',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/home/employeeForm'],
        visible: role === "admin"
      },
      {
        label: 'Manage Employee',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/home/employees'],
        visible: role === "admin"
      }
    ];

    this.attendanceTab = [
      {
        label: 'Add Attendance',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/home/attendanceForm'],
        visible: role === "admin"

      },
      {
        label: 'Manage Attendance',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/home/attendances']
      }
    ];

    this.departmentTab = [
      {
        label: 'Add Department',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/home/departmentForm'],
        visible: role === "admin"
      },
      {
        label: 'Manage Department',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/home/departments']
      }
    ];

    this.leaveTab = [
      {
        label: 'Add Leave',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/home/leaveForm'],
        visible: role === "employee"
      },
      {
        label: 'Manage Leave',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/home/leaves']
      }
    ];

    this.performanceTab = [
      {
        label: 'Add Performance',
        icon: 'pi pi-fw pi-plus',
        routerLink: []
      },
      {
        label: 'Manage Performance',
        icon: 'pi pi-fw pi-list',
        routerLink: []
      }
    ];
  }

  dashboard() {
    this.router.navigate(["/home"]);
  }

  confirm(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to logout?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this.onLogout();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  onToggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onLogout() {
    this.userService.logout().subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout Successful' });
      localStorage.setItem("token", "");
      this.router.navigate([''])

    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }

  async getProfile() {
    this.userService.getProfile().subscribe(async (res) => {
      this.currentUser = await res;
      this.intitateSideBar(this.currentUser.role);
    }, (err) => {
      console.log(err);
    })
  }
}
