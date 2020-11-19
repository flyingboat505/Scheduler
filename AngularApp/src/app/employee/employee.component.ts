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

  constructor(private employeeService: EmployeeService) { }
  
  GET_query_object = [];

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
      id: null,
      date: "",
      time: ""
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
      //this.JSON_object = this.employeeService.employees;
      this.GET_query_by_date(this.sel_date)
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

  closetab(){
    document.getElementById("tab_result").style.display = "none";
  }

  //========================================================== 
  //      C A L E N D E R   F U N C T I O N A L I T Y
  //==========================================================

  sel_date = ""
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

//==========================================================
//            Q u e r y     L o g i c s
//==========================================================

GET_query_object_date_storage = [];

GET_query_by_date(DATE){
  if(DATE == ""){
    return;
  }
  let result_count = 0;
  this.GET_query_object = [];
  for(let INDEX = 0; INDEX < Object.keys(this.employeeService.employees).length; INDEX++){
      if(this.employeeService.employees[INDEX]["date"] == DATE){
        result_count++;
        this.GET_query_object.push(this.employeeService.employees[INDEX]);
      }
  }
  this.GET_query_object_date_storage = this.GET_query_object.slice()
  this.GET_query_by_name = this.GET_query_object_date_storage.slice();
  this.GET_query_by_position = this.GET_query_object_date_storage.slice();

  document.getElementById("Result").style.display = "none";
  document.getElementById("tab_result").style.display = "block";
  if(result_count == 0){
    document.getElementById("Result").style.display = "block";

  }
  let print_DATE_pretty = DATE.split("/");
  const cur_date = new Date(
    print_DATE_pretty[2],
    print_DATE_pretty[0]-1,
    print_DATE_pretty[1]
  );
  document.getElementById("date_display").innerHTML = "Date: " + cur_date.toDateString();
  //alert("DATE: " + DATE + "\nResult: " + result_count + "\n ====================== \n" + display);
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
  const cur_day = get_div_day.match(/\d+/g);
  const cur_month_year = document.querySelector(".date h1").innerHTML.split(" ");
 
  
  const DATE = ((this.months[cur_month_year[0]]+1) + '/' + cur_day + '/' + cur_month_year[1]).toString();
  this.sel_date = DATE
  //alert(DATE);
  this.GET_query_by_date(DATE);

}

GET_query_by_name = [];
GET_query_by_position = [];

GET_query_by_name_text(event : any){
  let name_input =  event.target.value; 

  if(name_input.length < 2){
    this.GET_query_by_name = this.GET_query_object_date_storage.slice();  
  }
  else{
    this.GET_query_by_name = [];
    for(let INDEX = 0; INDEX < this.GET_query_object_date_storage.length; INDEX++){
      if(this.GET_query_object_date_storage[INDEX]['name'].toLowerCase().includes(name_input.toLowerCase())){
        this.GET_query_by_name.push(this.GET_query_object_date_storage[INDEX])
      }
    }
  }
  //document.getElementById("testp").innerHTML = JSON.stringify(this.GET_query_by_name,null,2);
  this.GET_query_by_join_position_name();
}
GET_query_by_position_text(event : any){
  let position_input =  event.target.value; 

  if(position_input.length < 2){
    this.GET_query_by_position = this.GET_query_object_date_storage.slice();  
  }
  else {
    this.GET_query_by_position = [];
    for(let INDEX = 0; INDEX < this.GET_query_object_date_storage.length; INDEX++){
      if(this.GET_query_object_date_storage[INDEX]['position'].toLowerCase().includes(position_input.toLowerCase())){
        this.GET_query_by_position.push(this.GET_query_object_date_storage[INDEX])
      }
    }
  }
  //document.getElementById("testp").innerHTML = JSON.stringify(this.GET_query_by_position,null,2);
  this.GET_query_by_join_position_name();
}

GET_query_by_join_position_name(){
  let result_count = 0;
  let is_name_table_size_less = (this.GET_query_by_name.length < this.GET_query_by_position.length)
  let length = is_name_table_size_less ? this.GET_query_by_name.length : this.GET_query_by_position.length;
  this.GET_query_object = [];
  for(let INDEX = 0; INDEX < length; INDEX++){
    if(is_name_table_size_less){
      for(let INDEX_j = 0; INDEX_j < this.GET_query_by_position.length; INDEX_j++){
        if(this.GET_query_by_name[INDEX]["_id"] == this.GET_query_by_position[INDEX_j]["_id"]){
          this.GET_query_object.push(this.GET_query_by_name[INDEX])
          result_count++;
          break;
        }
      }
    } 
    else{
      for(let INDEX_j = 0; INDEX_j < this.GET_query_by_name.length; INDEX_j++){
        if(this.GET_query_by_position[INDEX]["_id"] == this.GET_query_by_name[INDEX_j]["_id"]){
          this.GET_query_object.push(this.GET_query_by_position[INDEX])
          result_count++;
          break;
        }
      }
    }
  }
  document.getElementById("Result").style.display = "none";
  if(result_count == 0){
    document.getElementById("Result").style.display = "block";
  }
}
}
