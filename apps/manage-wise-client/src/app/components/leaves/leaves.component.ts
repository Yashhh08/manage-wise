/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'manage-wise-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent implements OnInit {

  leaves!: any;

  filteredLeaves!: any;

  searchTerm = '';

  ref!: DynamicDialogRef;

  currentUser!: any;

  constructor(private leaveService: LeaveService, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService, private userService: UserService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getAllLeaves();
  }

  filterByName() {
    this.filteredLeaves = this.leaves.filter((leave: any) => {
      return leave.employeeId.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  addLeave() {
    this.ref = this.dialogService.open(LeaveFormComponent, {
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
      this.getAllLeaves();
    });

    this.ref.onMaximize.subscribe((value: any) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  getAllLeaves() {
    this.leaveService.getLeaves().subscribe((res) => {
      // console.log(res);
      this.leaves = res;
      this.filteredLeaves = this.leaves;
    }, (err) => {
      console.log(err);
    })
  }

  confirmUpdate(event: any, leave: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateleave(leave);
      },
      reject: () => {
      }
    });
  }

  confirmDelete(event: any, leave: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.leaveService.deleteLeave(leave._id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'leave deleted Successfully' });
          this.getAllLeaves();
        }, (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        })
      },
      reject: () => {
      }
    });
  }

  updateleave(leave: any) {
    this.ref = this.dialogService.open(LeaveFormComponent, {
      // header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: leave
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
      this.getAllLeaves();
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe((res) => {
      // console.log(res);
      this.currentUser = res;
    })
  }

  confirm(event: any, leave: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const value = { status: "approved" }

        this.leaveService.updateLeave(leave._id, value).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'leave approved Successfully' });
          this.getAllLeaves();
        }, (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        })
      },
      reject: () => {
      }
    });
  }

  reject(event: any, leave: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const value = { status: "rejected" }

        this.leaveService.updateLeave(leave._id, value).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'leave rejected Successfully' });
          this.getAllLeaves();
        }, (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        })
      },
      reject: () => {
      }
    });
  }

}
