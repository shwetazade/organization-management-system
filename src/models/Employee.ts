export type Designation = | "Engineer" | "Lead" | "Manager" | "Director" | "CEO";

// Base class for all employees
export abstract class Employee {
  public id: string;
  public name: string;
  public dateOfBirth: string;
  public designation: Designation;

  constructor( id: string, name: string, dateOfBirth: string, designation: Designation) {
  this.id = id;
  this.name = name;
  this.dateOfBirth = dateOfBirth;
  this.designation = designation;
}

hasReportees(): boolean {
  return false;
}

getReportsTo(): string {
  throw new Error("This employee does not have a reporting manager");
}

addReportee(employeeId: string): void {
  throw new Error("This employee cannot have reportees");
}

removeReportee(employeeId: string): void {
  throw new Error("This employee cannot have reportees");
}

}