import { Employee } from "./Employee";

export class Lead extends Employee {
  private reportsTo: string;
  private reportees: string[];

  constructor(id: string, name: string, dateOfBirth: string, reportsTo: string, reportees: string[]) {
    super(id, name, dateOfBirth, "Lead");
    this.reportsTo = reportsTo;
    this.reportees = reportees;
  }

   hasReportees(): boolean {
    return this.reportees.length > 0;
  }

  getReportsTo(): string {
  return this.reportsTo;
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