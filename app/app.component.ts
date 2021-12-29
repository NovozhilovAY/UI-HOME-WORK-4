import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI-HOME-WORK4';
  students : Array<Student>;
  foundStudents : Array<Student>;
  filteredStudents: Array<Student>;
  sortBy: string = "firstName";
  selectedPanel: string = "find";
  selectedFilter: string = "averageMark";
  newStudent: Student = new Student("", "", "", "",0);
  updatedStudent: Student = new Student("", "", "", "",0);
  isUpdate: boolean = false;

  constructor(private dialogRef: MatDialog) {
    this.students = new Array<Student>();
    this.foundStudents = new Array<Student>();
    this.filteredStudents = this.students;
    this.students.push(new Student("Денис", "Алексеев", "Петрович", "1998-05-27", 4.5));
    this.students.push(new Student("Петр", "Петров", "Петрович", "2001-05-27", 3.5));
    this.students.push(new Student("Сидр", "Сидоров", "Сидорович", "1999-05-27", 4.5));
    this.students.push(new Student("Александр", "Александров", "Александрович", "1998-05-27", 2.4));
    this.students.push(new Student("Сергей", "Сергеевич", "Сергеев", "1998-05-27", 2.4));
    this.students.push(new Student("Александр", "Новожилов", "Юрьевич", "1999-05-02", 5.0));
  }

  public openDeleteDialog(student:Student){
    let dialogRef = this.dialogRef.open(PopUpComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == "true"){
        this.deleteStudent(student);
      }
    });
  }
  public filterByMark(value1 : number, value2 : number):void{
    let result: Array<Student> = new Array<Student>();
    for(let i = 0; i<this.students.length; i++){
      if(this.students[i].averageMark >= value1 && this.students[i].averageMark <= value2){
        result.push(this.students[i]);
      }
    }
    this.filteredStudents = result;
  }

  public filterByDate(value1: string, value2: string):void{
    let date1 = new Date(value1);
    let date2 = new Date(value2);
    let result: Array<Student> = new Array<Student>();
    for(let i = 0; i<this.students.length; i++){
      if(new Date(this.students[i].dateOfBirth) >= date1 && new Date(this.students[i].dateOfBirth) <= date2){
        result.push(this.students[i]);
      }
    }
    this.filteredStudents = result;
  }

  public setSelectedPanel(name: string){
    this.selectedPanel = name;
    this.foundStudents = new Array<Student>();
    this.filteredStudents = this.students;
  }

  public findStudents(firstName : string, lastName: string){
    if(firstName !== "" && lastName !== ""){
      this.foundStudents = this.findByFirstNameAndLastName(firstName, lastName);
    }else if(firstName !== ""){
      this.foundStudents = this.findByName(firstName);
    }else if(lastName !== ""){
      this.foundStudents = this.findByLName(lastName);
    }else {
      this.foundStudents = new Array<Student>();
    }
  }

  private findByName(name: string):Array<Student> {
    let result: Array<Student> = new Array<Student>();
    for(let i = 0; i<this.students.length; i++){
      if(name === this.students[i].firstName){
        result.push(this.students[i]);
      }
    }
    return result;
  }

  private findByLName(lastName: string):Array<Student> {
    let result: Array<Student> = new Array<Student>();
    for(let i = 0; i<this.students.length; i++){
      if(lastName === this.students[i].lastName){
        result.push(this.students[i]);
      }
    }
    return result;
  }

  private findByFirstNameAndLastName(firstName : string, lastName: string) : Array<Student>{
    let result: Array<Student> = new Array<Student>();
    for(let i = 0; i<this.students.length; i++){
      if(firstName === this.students[i].firstName && lastName === this.students[i].lastName){
        result.push(this.students[i]);
      }
    }
    return result;
  }

  public sort() : void {
    switch (this.sortBy){
      case "firstName":
        this.sortByFName();
        break;
      case "lastName":
        this.sortByLName();
        break;
      case "middleName":
        this.sortByMName();
        break;
      case "dateOfBirth":
        this.sortByDate();
        break;
      case "averageMark":
        this.sortByMark();
        break;
    }
  }

  private sortByFName():void{
    this.students = this.students.sort((a, b) => {
      if(a.firstName > b.firstName){
        return 1;
      }
      if(a.firstName < b.firstName){
        return -1;
      }
      return 0;
    });
  }

  private sortByLName():void {
    this.students = this.students.sort((a, b) => {
      if(a.lastName > b.lastName){
        return 1;
      }
      if(a.lastName < b.lastName){
        return -1;
      }
      return 0;
    });
  }

  private sortByMName():void {
    this.students = this.students.sort((a, b) => {
      if(a.middleName > b.middleName){
        return 1;
      }
      if(a.middleName < b.middleName){
        return -1;
      }
      return 0;
    });
  }

  private sortByDate():void {
    this.students = this.students.sort((a, b) => {
      if(a.dateOfBirth > b.dateOfBirth){
        return 1;
      }
      if(a.dateOfBirth < b.dateOfBirth){
        return -1;
      }
      return 0;
    });
  }

  private sortByMark() {
    this.students = this.students.sort((a, b) => {
      return a.averageMark - b.averageMark;
    });
  }

  public deleteStudent(student : Student) : void {
      this.students.splice(this.students.indexOf(student), 1);
      this.filteredStudents.splice(this.filteredStudents.indexOf(student), 1);
  }

  public addStudent():void{
    this.students.push(this.newStudent);
    this.newStudent = new Student("", "", "", "",0);
    this.isUpdate = false;
  }

  public updateStudent() {
    this.updatedStudent.firstName = this.newStudent.firstName;
    this.updatedStudent.lastName = this.newStudent.lastName;
    this.updatedStudent.middleName = this.newStudent.middleName;
    this.updatedStudent.dateOfBirth = this.newStudent.dateOfBirth;
    this.updatedStudent.averageMark = this.newStudent.averageMark;
    this.isUpdate = false;
    this.updatedStudent = new Student("", "", "", "",0);
    this.newStudent = new Student("", "", "", "",0);
  }


  public setUpdatedStudent(student: Student) : void {
    this.setSelectedPanel("add");
    this.isUpdate=true;
    this.updatedStudent = student;
    this.newStudent = student.getCopy();
    console.log(this.isUpdate);
    console.log(this.updatedStudent);
    console.log(this.newStudent);
  }
}

class Student {
  firstName : string;
  lastName : string;
  middleName : string;
  dateOfBirth : string;
  averageMark : number;


  constructor(firstName: string, lastName: string, middleName: string, dateOfBirth: string, averageMark: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.dateOfBirth = dateOfBirth;
    this.averageMark = averageMark;
  }

  public getCopy():Student{
    return new Student(this.firstName,this.lastName,this.middleName,this.dateOfBirth,this.averageMark);
  }


}
