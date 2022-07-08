import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multerClient';
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
    
  constructor(private http: HttpClient) { }
      
  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
     
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value);

    console.log('formData----',formData);

    // this.http.get('http://localhost:3000/ping').subscribe(res=>{
    //   console.log('res',res);
    // });
   
    this.http.post('http://localhost:3000/uploadFile', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}
