package userManagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
@PrimaryKeyJoinColumn(name = "id")
public class Employee extends User {

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

    public Employee() {
        super();
    }

    public Employee(Long id, String firstName, String lastName, String email, String password, String profilePic) {
        super(id, firstName, lastName, email, password, UserRole.EMPLOYEE, profilePic);
    }

    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }
}