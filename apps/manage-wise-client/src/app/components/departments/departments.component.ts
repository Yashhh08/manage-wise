/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentService } from '../../services/department.service';
import { DepartmentFormComponent } from '../department-form/department-form.component';

@Component({
  selector: 'manage-wise-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {

  departments!: any;

  filteredDepartments!: any;

  searchTerm = '';

  ref!: DynamicDialogRef;

  constructor(private departmentService: DepartmentService, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  filterByName() {
    this.filteredDepartments = this.departments.filter((department: any) => {
      return department.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  addDepartment() {
    this.ref = this.dialogService.open(DepartmentFormComponent, {
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
      this.getAllDepartments();
    });

    this.ref.onMaximize.subscribe((value: any) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  getAllDepartments() {
    this.departmentService.getDepartments(0, 0).subscribe((res) => {
      // console.log(res);
      this.departments = res;
      this.filteredDepartments = this.departments;
    }, (err) => {
      console.log(err);
    })
  }

  confirmUpdate(event: any, department: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updatedepartment(department);
      },
      reject: () => {
      }
    });
  }

  confirmDelete(event: any, department: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.departmentService.deleteDepartment(department._id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department deleted Successfully' });
          this.getAllDepartments();
        }, (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        })
      },
      reject: () => {
      }
    });
  }

  updatedepartment(department: any) {
    this.ref = this.dialogService.open(DepartmentFormComponent, {
      // header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: department
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
      this.getAllDepartments();
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }


}
