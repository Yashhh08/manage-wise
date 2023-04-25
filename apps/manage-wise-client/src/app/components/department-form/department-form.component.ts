/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from './../../services/department.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'manage-wise-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent implements OnInit {

  departmentForm!: FormGroup;

  selectedDepartment: any;

  editMode = false;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private messageService: MessageService, private dynamicDialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.selectedDepartment = this.dynamicDialogConfig.data;

    this.departmentForm = this.fb.group({
      name: new FormControl("", Validators.required),
      head: new FormControl("", Validators.required)
    })

    if (this.selectedDepartment) {

      this.editMode = true;

      this.departmentForm.patchValue({
        name: this.selectedDepartment.name,
        head: this.selectedDepartment.head,
      });
    }

  }

  onSubmit() {
    // console.log(this.departmentForm.value);
    this.departmentService.addDepartment(this.departmentForm.value).subscribe((res) => {
      this.departmentForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department added Successfully' });
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }

  updateDepartment() {
    // console.log(this.selectedDepartment)
    this.departmentService.updateDepartment(this.selectedDepartment._id, this.departmentForm.value).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department Updated Successfully' });
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }

}
