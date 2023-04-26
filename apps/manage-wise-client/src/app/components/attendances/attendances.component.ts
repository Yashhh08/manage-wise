/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './../../services/attendance.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttendanceFormComponent } from '../attendance-form/attendance-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'manage-wise-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.scss'],
})
export class AttendancesComponent implements OnInit {

  attendances!: any;

  filteredAttendance!: any;

  searchTerm = '';

  ref!: DynamicDialogRef;

  currentUser!: any;

  constructor(private attendanceService: AttendanceService, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService, private userService: UserService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getAllAttendaces();
  }

  filterByName() {
    this.filteredAttendance = this.attendances.filter((attendance: any) => {
      return attendance.employeeId.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  addAttendance() {
    this.ref = this.dialogService.open(AttendanceFormComponent, {
      // header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
      this.getAllAttendaces();
    });

    this.ref.onMaximize.subscribe((value: any) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  getAllAttendaces() {
    this.attendanceService.getAttendances(0, 0).subscribe((res) => {
      // console.log(res);

      this.attendances = res;
      this.filteredAttendance = this.attendances;
    }, (err) => {
      console.log(err);
    })
  }

  confirmUpdate(event: any, attendance: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateAttendance(attendance);
      },
      reject: () => {
      }
    });
  }

  confirmDelete(event: any, attendance: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendanceService.deleteAttendance(attendance._id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted Successfully' });
          this.getAllAttendaces();
        }, (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        })
      },
      reject: () => {
      }
    });
  }

  updateAttendance(attendance: any) {
    this.ref = this.dialogService.open(AttendanceFormComponent, {
      // header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: attendance
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
      this.getAllAttendaces();
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe((res) => {
      this.currentUser = res;
    })
  }

}
