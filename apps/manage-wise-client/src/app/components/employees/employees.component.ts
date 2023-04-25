/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'manage-wise-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [DialogService, DynamicDialogConfig]
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees: any;

  searchTerm = '';

  filteredEmployees: any;

  ref!: DynamicDialogRef;

  constructor(private employeeService: EmployeeService, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees(0, 0).subscribe((res) => {
      // console.log(res);
      this.employees = res;
      this.filteredEmployees = this.employees;
    }, (err) => {
      console.log(err);
    })
  }

  filterByName() {
    this.filteredEmployees = this.employees.filter((employee: any) => {
      return employee.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  confirmUpdate(event: any, employee: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // console.log(employee);
        this.updateEmployee(employee);
      },
      reject: () => {
      }
    });
  }

  confirmDelete(event: any, employee: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // console.log(employee);
        this.employeeService.deleteEmployee(employee._id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Employee ${employee.name} removed successfully` });
          this.getAllEmployees();
        }, (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong` });
        })

      },
      reject: () => {
      }
    });
  }


  addEmployee() {
    this.ref = this.dialogService.open(EmployeeFormComponent, {
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
      this.getAllEmployees();
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  updateEmployee(employee: any) {
    this.ref = this.dialogService.open(EmployeeFormComponent, {
      // header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: employee
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
      this.getAllEmployees();
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}

