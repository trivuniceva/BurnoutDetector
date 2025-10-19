package userManagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import userManagement.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);

    Optional<Object> findByEmail(String email);
}
