import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'manage-wise-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  toastMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((res) => {

      console.log(this.loginForm.value);

      localStorage.setItem("token", res.token);

      this.toastMessage("success", "Success", "Login successfully");

      this.loginForm.reset();

    },
      (err) => {
        console.log(err);
        this.toastMessage("error", "Error", "Login Failed");
        this.loginForm.reset();
      }
    )
  }

}
