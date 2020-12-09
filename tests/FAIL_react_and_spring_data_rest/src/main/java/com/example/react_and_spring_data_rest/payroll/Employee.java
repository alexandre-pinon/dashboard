package com.example.react_and_spring_data_rest.payroll;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Employee {
    
    private @Id @GeneratedValue Long id;
    private String firstName;
    private String lastName;
    private String description;

    private Employee() {}

    public Employee(String firsName, String lastName, String description) {
        this.firstName = firsName;
        this.lastName = lastName;
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(firstName, employee.firstName) &&
                Objects.equals(lastName, employee.lastName) &&
                Objects.equals(description, employee.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, description);
    }

    public Long getId() {
        return this.id;
    }
    public String getFirstName() {
        return this.firstName;
    }
    public String getLastName() {
        return this.lastName;
    }
    public String getDescription() {
        return this.description;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName=" + firstName + '\'' +
                ", lastName=" + lastName + '\'' +
                ", description=" + description + '\'' +
                '}';
    }
}
