import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  form: FormGroup;
  projectStatus = ['Stable','Critical','Finished'];

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.form = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectName.bind(this)], this.forbiddenProjectNameAsync),/* , [this.forbiddenProjectNameAsync] */
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }

  submit(){
    console.log(this.form.value);
  }

  getError(control: string){
    return this.form.get(control).errors;
  }

  forbiddenProjectName(control: FormControl): {[s: string]: boolean}{
    /* console.log(this.projectNames.indexOf(control.value)); */
    if (control.value === 'Test'){
      return {'projectIsForbidden': true};
    }
    return null;
  }

  forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'projectIsForbidden': false});
        } else {
          resolve(null);
        }
      }, 1000);


    });

    return promise;
  }




}
