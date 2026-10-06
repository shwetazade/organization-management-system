import { Employee } from "../models/Employee";

export class Organization {
  private employees: Employee[] = [];

// Adds a new employee to the organization
addEmployee(employee: Employee): void {
  const existingEmployee = this.employees.find(
    (existing) => existing.id === employee.id
  );

  if (existingEmployee) {
    throw new Error("Employee ID already exists");
  }
  this.validateEmployee(employee);

  if (employee.designation === "CEO") {
    const existingCEO = this.employees.find(
      (existing) => existing.designation === "CEO"
    );

    if (existingCEO) {
      throw new Error("Organization can have only one CEO");
    }
  }

  if (!this.isValidReportingManager(employee)) {
    throw new Error("Invalid reporting hierarchy");
  }

  this.employees.push(employee);
  this.updateReportees(employee);
}

// Retrieves all employees
getAllEmployees(): Employee[] {
  return this.employees;
}

// Retrieves an employee using their ID
getEmployeeById(id: string): Employee {
  const employee = this.employees.find(
    (employee) => employee.id === id
  );

  if (!employee) {
    throw new Error("Employee not found");
  }

  return employee;
}

// Deletes an employee using their ID
deleteEmployeeById(id: string): void {
  const employee = this.getEmployeeById(id);

  if (employee.hasReportees()) {
    throw new Error("Cannot delete an employee with reportees");
  }

  if (employee.designation !== "CEO") {
    const manager = this.getEmployeeById(employee.getReportsTo());
    manager.removeReportee(employee.id);
  }

  const index = this.employees.findIndex(
    (employee) => employee.id === id
  );

  this.employees.splice(index, 1);
}

// Updates an employee's details using their ID
updateEmployee(id: string, name: string, dateOfBirth: string): void {
  const employee = this.getEmployeeById(id);

  if (!name || !dateOfBirth) {
    throw new Error("Required employee fields cannot be empty");
  }

  this.validateDateOfBirth(dateOfBirth);

  employee.name = name;
  employee.dateOfBirth = dateOfBirth;
}

// Validates if the reporting manager is appropriate for the employee's designation
private isValidReportingManager(employee: Employee): boolean {
  if (employee.designation === "Engineer") {
    const manager = this.getEmployeeById(employee.getReportsTo());
    return manager.designation === "Lead";
  }

  if (employee.designation === "Lead") {
    const manager = this.getEmployeeById(employee.getReportsTo());
    return manager.designation === "Manager";
  }

  if (employee.designation === "Manager") {
    const manager = this.getEmployeeById(employee.getReportsTo());
    return manager.designation === "Director";
  }

  if (employee.designation === "Director") {
    const manager = this.getEmployeeById(employee.getReportsTo());
    return manager.designation === "CEO";
  }

  return true;
}

// Validates if the employee has all required fields
private validateEmployee(employee: Employee): void {
  if (!employee.id || !employee.name || !employee.dateOfBirth) {
    throw new Error("Required employee fields cannot be empty");
  }
  this.validateDateOfBirth(employee.dateOfBirth);
}

// Validates if the date of birth is in the correct format (MM/DD/YYYY)
private validateDateOfBirth(dateOfBirth: string): void {
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

  if (!datePattern.test(dateOfBirth)) {
    throw new Error("Date of birth must be in MM/DD/YYYY format");
  }
}

// Updates the reportees of the reporting manager when a new employee is added
private updateReportees(employee: Employee): void {
  if (employee.designation === "CEO") {
    return;
  }
  const manager = this.getEmployeeById(employee.getReportsTo());
  manager.addReportee(employee.id);
}
}