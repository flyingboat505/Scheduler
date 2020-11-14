import { Component } from '@angular/core';
import { OnInitCal } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInitCal{
  title = 'app';

  //Initialize Page When Open
  ngOnInit() {
    const months = {
      "January" : 0,
      "February" : 1,
      "March" : 2,
      "April" : 3,
      "May" : 4,
      "June" : 5,
      "July" : 6,
      "August" : 7,
      "September" : 8,
      "October" : 9,
      "November" : 10,
      "December" : 11,
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November" ,
      11: "December"
    };
    const today = new Date();
    const cur_month = months[today.getMonth()];
    let cur_year = today.getFullYear();
    document.querySelector(".date p").innerHTML = today.toDateString();
    //const monthDays = document.querySelector(".days");
    const monthDays = document.getElementsByClassName("days");
    const day = new Date(
        cur_year,
        months[cur_month],
        0
    );
    const next_day = new Date(
      cur_year,
      months[cur_month]+1,
      0
  );
    document.querySelector(".date h1").innerHTML = cur_month + " " + cur_year;
    const cur_last_date = day.getDate(), cur_last_day = day.getDay();
    const next_num_of_dates = next_day.getDate(), next_last_day = next_day.getDay();

    //alert(cur_last_date + " " + cur_last_day + " " + next_last_day); 
    let remain = false;
    for(let index = 0; index < 42; index++){
      let day = "";
      if(remain == true){
        //alert('Enters this');
        for(let index_j = next_last_day + 1; index < 42; index_j++, index++){
          day = "";
          day += `<div class="next-date">${index_j - next_last_day}</div>`; 
          monthDays[index].innerHTML = day;
          //alert(index);
        }
      }
      else if(index <= cur_last_day && cur_last_day != 6){
        day += `<div class="prev-date">${cur_last_date - cur_last_day + index}</div>`;
        monthDays[index].innerHTML = day;
      }
      else {
        for(let index_j = 1; index_j <= next_num_of_dates; index_j++, index++){
          day = "";
          if(index_j == today.getDate()){
            day += `<div class = "today">${index_j}</div>`; 
          } else {
            day += `<div>${index_j}</div>`; 
          }
          monthDays[index].innerHTML = day;
        }
        index--;
        remain = true;
      }

    }
      
  }
 
  prev_month(){
      const today = new Date();
      const months = {
        "January" : 0,
        "February" : 1,
        "March" : 2,
        "April" : 3,
        "May" : 4,
        "June" : 5,
        "July" : 6,
        "August" : 7,
        "September" : 8,
        "October" : 9,
        "November" : 10,
        "December" : 11,
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November" ,
        11: "December"
      };
      const cur_month_year = document.querySelector(".date h1").innerHTML.split(" ");
      const cur_month = months[cur_month_year[0]];
      let cur_year = parseInt(cur_month_year[1]);
      //const monthDays = document.querySelector(".days");
      const monthDays = document.getElementsByClassName("days");
      const _day = new Date(
          cur_year,
          cur_month,
          0
      );
      const prev_day = new Date(
        cur_year,
        cur_month-1,
        0
    );
      if(cur_month == 0){
        cur_year--;
      }
      document.querySelector(".date h1").innerHTML = months[_day.getMonth()] + " " + cur_year;
      const cur_last_date = _day.getDate(), cur_last_day = _day.getDay();
      const prev_num_of_dates = prev_day.getDate(), prev_last_day = prev_day.getDay();
  
      //alert(cur_last_date + " " + cur_last_day + " " + prev_last_day); 
  

      let remain = false;
    for(let index = 0; index < 42; index++){
      let day = "";
      if(remain == true){
        //alert('Enters this');
        for(let index_j = cur_last_day + 1; index < 42; index_j++, index++){
          day = "";
          day += `<div class="next-date">${index_j - cur_last_day}</div>`; 
          monthDays[index].innerHTML = day;
          //alert(index);
        }
      }
      else if(index <= prev_last_day && prev_last_day != 6){
        day += `<div class="prev-date">${prev_num_of_dates - prev_last_day + index}</div>`;
        monthDays[index].innerHTML = day;
      }
      else {
        for(let index_j = 1; index_j <= cur_last_date; index_j++, index++){
          day = "";
          if(_day.getMonth() == today.getMonth() && index_j == today.getDate() && cur_year == today.getFullYear()){
            day += `<div class = "today">${index_j}</div>`; 
          } else {
            day += `<div>${index_j}</div>`; 
          }
          monthDays[index].innerHTML = day;
        }
        index--;
        remain = true;
      }

    }
  }
  next_month(){
    const today = new Date();
    const months = {
      "January" : 0,
      "February" : 1,
      "March" : 2,
      "April" : 3,
      "May" : 4,
      "June" : 5,
      "July" : 6,
      "August" : 7,
      "September" : 8,
      "October" : 9,
      "November" : 10,
      "December" : 11,
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November" ,
      11: "December"
    };
    const cur_month_year = document.querySelector(".date h1").innerHTML.split(" ");
    const cur_month = months[cur_month_year[0]];
    let cur_year = parseInt(cur_month_year[1]);
    //const monthDays = document.querySelector(".days");
    const monthDays = document.getElementsByClassName("days");
    const _day = new Date(
        cur_year,
        cur_month+1,
        0
    );
    const next_day = new Date(
      cur_year,
      cur_month+2,
      0
  );
    if(cur_month == 11){
      cur_year++;
    }
    document.querySelector(".date h1").innerHTML = months[next_day.getMonth()] + " " + cur_year;
    const cur_last_date = _day.getDate(), cur_last_day = _day.getDay();
    const next_num_of_dates = next_day.getDate(), next_last_day = next_day.getDay();

    //alert(cur_last_date + " " + cur_last_day + " " + next_last_day); 
    let remain = false;
    for(let index = 0; index < 42; index++){
      let day = "";
      if(remain == true){
        //alert('Enters this');
        for(let index_j = next_last_day + 1; index < 42; index_j++, index++){
          day = "";
          day += `<div class="next-date">${index_j - next_last_day}</div>`; 
          monthDays[index].innerHTML = day;
          //alert(index);
        }
      }
      else if(index <= cur_last_day && cur_last_day != 6){
        day += `<div class="prev-date">${cur_last_date - cur_last_day + index}</div>`;
        monthDays[index].innerHTML = day;
      }
      else {
        for(let index_j = 1; index_j <= next_num_of_dates; index_j++, index++){
          day = "";
          if(next_day.getMonth() == today.getMonth() && index_j == today.getDate() && cur_year == today.getFullYear()){
            day += `<div class = "today">${index_j}</div>`; 
          } else {
            day += `<div>${index_j}</div>`; 
          } 
          monthDays[index].innerHTML = day;
        }
        index--;
        remain = true;
      }

    }
  }



  onAddPost(){
    alert('ENTER EVENT NAME AND TIME: ')
  }

  onAddPost2(){
    alert('ENTER EVENT FOR THE UPCOMING MONTH: ')
  }

  onAddPost3(){
   
  }
  initial(){
    document.querySelector(".date p").innerHTML = "HI";
    alert('Starting ');
    
  }
}
