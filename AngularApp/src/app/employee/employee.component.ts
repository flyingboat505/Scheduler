import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { jsonpFactory } from '@angular/http/src/http_module';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {



  
  static getJSON_object() {
    throw new Error('Method not implemented.');
  }

  constructor(private employeeService: EmployeeService) { }
  
  JSON_object = {};

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
    this.calendar_init();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      location: "",
      student_id: null,
      dateAndTime: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
      this.JSON_object = this.employeeService.employees;
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    M.toast({ html: 'Edited successfully!', classes: 'rounded' });
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }


  //========================CALENDER FUNCTIONALITY================================= 

  months = {
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

  calendar_init(){
    
    const today = new Date();
    const cur_month = this.months[today.getMonth()];
    let cur_year = today.getFullYear();
    document.querySelector(".date p").innerHTML = today.toDateString();
    //const monthDays = document.querySelector(".days");
    const monthDays = document.getElementsByClassName("days");
    const day = new Date(
        cur_year,
        this.months[cur_month],
        0
    );
    const next_day = new Date(
      cur_year,
      this.months[cur_month]+1,
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
    const cur_month_year = document.querySelector(".date h1").innerHTML.split(" ");
    const cur_month = this.months[cur_month_year[0]];
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
    document.querySelector(".date h1").innerHTML = this.months[_day.getMonth()] + " " + cur_year;
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
  const cur_month_year = document.querySelector(".date h1").innerHTML.split(" ");
  const cur_month = this.months[cur_month_year[0]];
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
  document.querySelector(".date h1").innerHTML = this.months[next_day.getMonth()] + " " + cur_year;
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
 
GET_query_by_date(DATE){
  let display = "";
  let result_count = 0;
  for(let INDEX = 0; INDEX < Object.keys(this.JSON_object).length; INDEX++){
    //alert(INDEX + ")  " +this.JSON_object[INDEX]["dateAndTime"]);
      if(this.JSON_object[INDEX]["dateAndTime"] == DATE){
        result_count++;
        display += (result_count).toString();
        display += "| Name: " + this.JSON_object[INDEX]['name'] 
        display += " STUDENT ID: " + this.JSON_object[INDEX]['student_id'] 
        display += " DATE: " + this.JSON_object[INDEX]['dateAndTime'];
        display += "\n";
      }
  }
  if(result_count == 0){
    display += "No Result"
  }
  alert("DATE: " + DATE + "\nResult: " + result_count + "\n ====================== \n" + display);
}

GET_input_query(INDEX){
  const get_div_day = document.getElementsByClassName("days")[INDEX].innerHTML;
  if(get_div_day.includes("next-date")){
    M.toast({ html: "Please go to next month", classes: 'rounded', displayLength: 500 })
    return
  }
  else if(get_div_day.includes("prev-date")){
    M.toast({ html: "Please go to previous month", classes: 'rounded',  displayLength: 500 })
    return
  }
  //Extract Number From String: Reference: https://www.geeksforgeeks.org/extract-a-number-from-a-string-using-javascript/ 
  let cur_day = get_div_day.match(/\d+/g);
  const cur_month_year = document.querySelector(".date h1").innerHTML.split(" ");
 
  
  const DATE = ((this.months[cur_month_year[0]]+1) + '/' + cur_day + '/' + cur_month_year[1]).toString();
  //alert(DATE);
  this.GET_query_by_date(DATE);

}

onAddPost(){
  alert('ENTER EVENT NAME AND TIME: ')
}
}
