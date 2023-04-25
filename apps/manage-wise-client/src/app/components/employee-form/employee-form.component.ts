/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DepartmentService } from './../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'manage-wise-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {

  departments: any;

  selectedDepartment: any;

  employeeForm!: FormGroup;

  selectedEmployee: any;

  editMode = false;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private employeeService: EmployeeService, private messageService: MessageService, private dynamicDialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.selectedEmployee = this.dynamicDialogConfig.data;

    this.getDepartment();

    // console.log(this.departments)

    this.employeeForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      designation: new FormControl("", [Validators.required]),
      departmentId: new FormControl("", [Validators.required]),
      hireDate: new FormControl("", [Validators.required]),
      salary: new FormControl("", [Validators.required]),
      // document: new FormControl()
    })

    if (this.selectedEmployee) {

      this.editMode = true;

      this.employeeForm.patchValue({
        name: this.selectedEmployee.name,
        email: this.selectedEmployee.email,
        address: this.selectedEmployee.address,
        phone: this.selectedEmployee.phone,
        designation: this.selectedEmployee.designation,
        departmentId: this.selectedEmployee.departmentId,
        hireDate: this.selectedEmployee.hireDate,
        salary: this.selectedEmployee.salary
      });
    }

  }

  onSubmit() {
    // console.log(this.employeeForm.value);
    this.employeeService.addEmployee(this.employeeForm.value).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Added Successfully' });
      this.employeeForm.reset();
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })

  }

  updateEmployee() {
    // console.log(this.employeeForm.value);
    this.employeeService.editEmployee(this.selectedEmployee._id, this.employeeForm.value).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Updated Successfully' });
      this.employeeForm.reset();
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.employeeForm.get('document')?.setValue(file);
    }
  }

  getDepartment() {
    this.departmentService.getDepartments(0, 0).subscribe((res) => {
      // console.log(res);
      this.departments = res;
    }, (err) => {
      console.log(err);
    })
  }
}
