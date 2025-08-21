package userManagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastname;

    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    private UserRole userRole;

    public User() {
    }

    public User(Long id, String firstName, String lastname, String email, String password, UserRole userRole) {
        this.id = id;
        this.firstName = firstName;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }
}
