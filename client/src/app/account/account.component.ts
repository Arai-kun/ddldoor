import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import { user } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface displayData {
  email: string,
  admin: boolean
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: user = {
    email: '',
    password: '',
    admin: false
  }
  email: string = '';

  form!: FormGroup;
  emailControl = new FormControl(null, [
    Validators.required,
    Validators.email
  ]);
  adminControl = new FormControl(null);
  success: boolean = false;
  checked: boolean = false;

  displayedColumns: string[] = [
    'email',
    'admin',
    'action'
  ];
  dataSource = new MatTableDataSource<displayData>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dbService: DbService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUsers();
    this.form = this.fb.group({
      email: this.emailControl,
      admin: this.adminControl
    });
  }

  onResetPW(): void {
    this.dbService.resetPW()
    .subscribe(token => {
      this.authService.logout()
      .subscribe(() => {
        this.router.navigate([`/reset/${token}`]);
      });
    });
  }

  onGenAccount(): void {
    this.user.email = this.form.get('email')?.value; 
    this.authService.genPW()
    .subscribe(password => {
      if(password){
        this.user.password = password;
        this.dbService.exist('user', this.user.email)
        .subscribe(exist => {
          if(exist){
            this.snackBar.open('このアドレスは既に登録済みです', '閉じる', { duration: 7000 });
          }
          else{
            this.dbService.createUser(this.user)
            .subscribe(result => {
              if(!result){
                this.snackBar.open('アカウントを発行できませんでした', '閉じる', { duration: 7000 });
              }
              else{
                this.success = true;
                this.snackBar.open('アカウントを発行しました', '閉じる', { duration: 5000 });
              }
            });
          }
        });
      }
    });
  }

  onCopy(): void {
    this.clipboard.copy(this.user.password);
    this.snackBar.open('コピーしました', '閉じる', { duration: 4000 });
  }

  getUsers(): void {
    this.dbService.getAll<user>('users')
    .subscribe(users => {
      let displayUsers: displayData[] = [];
      users.forEach(user => {
        displayUsers.push({
          email: user.email,
          admin: user.admin
        });
      });
      this.dataSource.data = displayUsers;
    });
  }

  getUser(): void {
    this.dbService.getUser()
    .subscribe(user => this.email = user.email);
  }

  onDelete(email: string): void {
		let dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
		  width: '400px',
		  data: email
		});
		dialogRef.afterClosed().subscribe(() => {
		  this.ngOnInit();
		});
	}

}
