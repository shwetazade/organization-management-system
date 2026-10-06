import { Organization } from "./services/Organization";
import { CEO } from "./models/CEO";
import { Director } from "./models/Director";
import { Manager } from "./models/Manager";
import { Lead } from "./models/Lead";
import { Engineer } from "./models/Engineer";

const organization = new Organization();

// Adding CEO, Director, Manager, Lead and Engineer

const ceo = new CEO("C001", "Asha", "01/10/1980", []);
organization.addEmployee(ceo);

const director = new Director("D001", "Priya", "02/15/1985", "C001", []);
organization.addEmployee(director);

const manager = new Manager("M001", "Ananya", "03/20/1990", "D001", []);
organization.addEmployee(manager);

const lead = new Lead("L001", "Riya", "04/25/1995", "M001", []);
organization.addEmployee(lead);

const engineer = new Engineer("E001", "Neha", "05/30/2000", "L001");
organization.addEmployee(engineer);

// Printing all employees in the organization
console.log("\n========== ALL EMPLOYEES ==========");
console.log(organization.getAllEmployees());

// Retrieving an employee by ID
console.log("\n========== RETRIEVE EMPLOYEE BY ID ==========");
const employee = organization.getEmployeeById("E001");
console.log(employee);

// Updating an employee's details
console.log("\n========== UPDATE EMPLOYEE ==========");
console.log("Before:");
console.log(organization.getEmployeeById("E001"));

// Updating the employee's name and date of birth
organization.updateEmployee("E001", "Neha Sharma", "06/15/2000");
console.log("\nAfter:");
console.log(organization.getEmployeeById("E001"));

// Deleting an employee by ID
console.log("\n========== DELETE EMPLOYEE ==========");
console.log("Before:");
console.log(organization.getEmployeeById("E001"));

organization.deleteEmployeeById("E001");
console.log("\nAfter:");
try {
  organization.getEmployeeById("E001");
} catch (error) {
  console.log("Employee E001 was deleted successfully.");
}

// Test case to validate deletion of employee with reportees
console.log("\n========== DELETE EMPLOYEE WITH REPORTEES ==========");
const engineer2 = new Engineer("E002", "Rohit", "07/10/2001", "L001");
organization.addEmployee(engineer2);
try {
    organization.deleteEmployeeById("L001");
} catch (error) {
  console.log("Deletion rejected:");
  console.log((error as Error).message);
}

// Test case to validate duplicate employee ID
console.log("\n========== DUPLICATE EMPLOYEE ID ==========");
console.log("Trying to add another employee with ID: E002");
try {
    const engineer3 = new Engineer("E002", "Amit", "08/20/2002", "L001");
    organization.addEmployee(engineer3);
} catch (error) {
  console.log("Addition rejected:");
  console.log((error as Error).message);
}

// Test case to validate single CEO constraint
console.log("\n========== SINGLE CEO VALIDATION ==========");
console.log("Trying to add another CEO with ID: C002");
try {
    const ceo2 = new CEO("C002", "Shweta", "09/25/1975", []);
    organization.addEmployee(ceo2);
} catch (error) {
  console.log("Addition rejected:");
  console.log((error as Error).message);
}

// Test case to validate reporting hierarchy
console.log("\n========== REPORTING HIERARCHY VALIDATION ==========");
// The engineer is trying to report to CEO, which is invalid as per the hierarchy
try {
    const engineer4 = new Engineer("E003", "Karan", "10/30/2003", "C001");
    organization.addEmployee(engineer4);
} catch (error) {
  console.log("Addition rejected:");
  console.log((error as Error).message);
}

// Test case to validate reporting to a non-existent employee
console.log("\n========== REPORTING TO NON-EXISTENT EMPLOYEE VALIDATION ==========");
try {
    const engineer5 = new Engineer("E004", "Sanya", "11/15/2004", "X001");
    organization.addEmployee(engineer5);
} catch (error) {
  console.log("Addition rejected:");
  console.log((error as Error).message);
}   

// Test case to validate empty name and date of birth
console.log("\n========== EMPTY NAME VALIDATION ==========");
console.log("Trying to add an employee with empty name ");         
try {
    const engineer6 = new Engineer("E005", "", "11/15/2004", "L001");
    organization.addEmployee(engineer6);
} catch (error) {
  console.log("Addition rejected:");
  console.log((error as Error).message);
}

// Test invalid date of birth format
console.log("\n========== INVALID DATE OF BIRTH FORMAT VALIDATION ==========");
console.log("Trying to add an employee with invalid date of birth format ");
try {
    const engineer7 = new Engineer("E006", "Rohan", "15/11/2004", "L001");
    organization.addEmployee(engineer7);
} catch (error) {
  console.log("Addition rejected:");
  console.log((error as Error).message);
}