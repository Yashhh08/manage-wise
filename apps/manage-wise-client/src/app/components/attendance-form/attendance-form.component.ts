/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './../../services/employee.service';
import { AttendanceService } from './../../services/attendance.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'manage-wise-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss'],
})
export class AttendanceFormComponent implements OnInit {

  attendanceForm!: FormGroup;

  cities!: any[];

  employees!: any;

  selectedAttendance: any;

  editMode = false;

  statusOptions = [
    { label: 'Present', value: 'Present' },
    { label: 'Absent', value: 'Absent' },
    { label: 'Late', value: 'Late' }
  ];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private attendanceService: AttendanceService, private messageService: MessageService, private dynamicDialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.selectedAttendance = this.dynamicDialogConfig.data;

    // console.log("sa", this.selectedAttendance);

    this.getAllEmployees();

    this.attendanceForm = this.fb.group({
      employeeId: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      inTime: new FormControl("", Validators.required),
      outTime: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    })

    if (this.selectedAttendance) {

      this.editMode = true;

      this.attendanceForm.patchValue({
        employeeId: this.selectedAttendance.employeeId._id,
        date: this.selectedAttendance.date,
        inTime: this.selectedAttendance.inTime,
        outTime: this.selectedAttendance.outTime,
        status: this.selectedAttendance.status
      });
    }

  }

  onSubmit() {
    // console.log(this.attendanceForm.value);

    this.attendanceService.addAttendance(this.attendanceForm.value).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record submitted` });
    }, (err) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Something went wrong` });
    })

  }

  updateAttendance() {
    this.attendanceService.updateAttendance(this.selectedAttendance._id, this.attendanceForm.value).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record updated` });
    }, (err) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Something went wrong` });
    })
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees(0, 0).subscribe((res) => {
      // console.log(res);
      this.employees = res;
    }, (err) => {
      console.log(err);
    })
  }

}
