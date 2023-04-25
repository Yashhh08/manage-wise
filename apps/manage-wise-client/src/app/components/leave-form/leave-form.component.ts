import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LeaveService } from './../../services/leave.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'manage-wise-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss'],
})
export class LeaveFormComponent {

  leaveForm!: FormGroup;

  selectedLeave: any;

  editMode = false;

  currentUser!: any;

  leaveTypes = [
    { name: "Casual Leave" },
    { name: "Sick Leave" },
    { name: "Maternity Leave" },
    { name: "Marriage Leave" },
    { name: "Paternity Leave" },
    { name: "Others" },
  ]

  leaveStatus = [
    { name: "pending" },
    { name: "approved" },
  ]

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private messageService: MessageService, private dynamicDialogConfig: DynamicDialogConfig, private userService: UserService) { }

  ngOnInit(): void {

    this.getProfile();

    this.selectedLeave = this.dynamicDialogConfig.data;

    this.leaveForm = this.fb.group({
      leaveType: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      status: new FormControl("pending"),
    })

    if (this.selectedLeave) {

      this.editMode = true;

      if (this.currentUser?.role !== "admin") {
        this.leaveForm.patchValue({
          leaveType: this.selectedLeave.leaveType,
          description: this.selectedLeave.description,
          startDate: this.selectedLeave.startDate,
          endDate: this.selectedLeave.endDate,
        });
      }
    }

  }

  onSubmit() {
    console.log(this.leaveForm.value);
    this.leaveService.addLeave(this.leaveForm.value).subscribe((res) => {
      this.leaveForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave added Successfully' });
    }, (err) => {
      console.log(err)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }

  updateLeave() {
    console.log(this.selectedLeave);
    this.leaveService.updateLeave(this.selectedLeave._id, this.leaveForm.value).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave Updated Successfully' });
    }, (err) => {
      console.log(err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }

  getProfile() {
    this.userService.getProfile().subscribe((res) => {
      this.currentUser = res;
    })
  }

}
