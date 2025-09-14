package userManagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "managers")
@PrimaryKeyJoinColumn(name = "id")
public class Manager extends User {

    @OneToMany(mappedBy = "manager")
    private List<Employee> teamMembers = new ArrayList<>();

    public Manager() {
        super();
    }

    public Manager(Long id, String firstName, String lastName, String email, String password, String profilePic) {
        super(id, firstName, lastName, email, password, UserRole.MANAGER, profilePic);
    }

    public List<Employee> getTeamMembers() { return teamMembers; }

    public void addTeamMember(Employee employee) {
        this.teamMembers.add(employee);
        employee.setManager(this);
    }
    public void removeTeamMember(Employee employee) {
        this.teamMembers.remove(employee);
        employee.setManager(null);
    }
}