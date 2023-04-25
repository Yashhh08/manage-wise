import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-wise-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
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
    this.userService.createUser(this.signupForm.value).subscribe((res) => {

      console.log(this.signupForm.value);

      this.toastMessage("success", "Success", "SignUp successfully");

      this.router.navigate([""])

      this.signupForm.reset();


    },
      (err) => {
        console.log(err);
        this.toastMessage("error", "Error", "SignUp Failed");
        this.signupForm.reset();
      }
    )
  }
}
