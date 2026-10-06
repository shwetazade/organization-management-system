import { Employee } from "./Employee";

export class CEO extends Employee {
  private reportees: string[];

  constructor(id: string, name: string, dateOfBirth: string, reportees: string[]) {
    super(id, name, dateOfBirth, "CEO");
    this.reportees = reportees;
  }

   hasReportees(): boolean {
    return this.reportees.length > 0;
  }

  addReportee(employeeId: string): void {
  this.reportees.push(employeeId);
}

removeReportee(employeeId: string): void {
  this.reportees = this.reportees.filter(
    (id) => id !== employeeId
  );
}
}