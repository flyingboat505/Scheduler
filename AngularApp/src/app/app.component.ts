import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  onAddPost(){
    alert('ENTER EVENT NAME AND TIME: ')
  }

  onAddPost2(){
    alert('ENTER EVENT FOR THE UPCOMING MONTH: ')
  }

  onAddPost3(){
    this.newPost = 'The user\'s post';
  }
}

