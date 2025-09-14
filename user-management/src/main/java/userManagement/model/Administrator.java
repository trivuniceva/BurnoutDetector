package userManagement.model;


import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrators")
@PrimaryKeyJoinColumn(name = "id")
public class Administrator extends User{

    public Administrator(){
        super();
    }

    public Administrator(
            Long id,
            String firstName,
            String lastName,
            String email,
            String password,
            String profilePic
    ) {
        super(id, firstName, lastName, email, password, UserRole.ADMINISTRATOR, profilePic);
    }
}
