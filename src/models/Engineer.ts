import { Employee } from "./Employee";

export class Engineer extends Employee {
  private reportsTo: string;

  constructor(id: string, name: string, dateOfBirth: string,reportsTo: string) {
    super(id, name, dateOfBirth, "Engineer");
    this.reportsTo = reportsTo;
  }

  getReportsTo(): string {
  return this.reportsTo;
}
}