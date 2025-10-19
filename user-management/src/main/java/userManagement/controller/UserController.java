package userManagement.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import userManagement.model.User;
import userManagement.model.UserRole;
import userManagement.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/profile_pictures/";

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        System.out.println(userDetails.getProfilePic());
        if (userDetails.getProfilePic() != null) {
            user.setProfilePic(userDetails.getProfilePic());
        }

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }


    @PostMapping("/{id}/upload-picture")
    public ResponseEntity<?> uploadProfilePicture(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {

        User user = userRepository.findById(id).orElseThrow();
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(file.getInputStream(), uploadPath.resolve(fileName),
                StandardCopyOption.REPLACE_EXISTING);

        user.setProfilePic(fileName);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/profile-picture/{filename}")
    public ResponseEntity<Resource> getProfilePicture(@PathVariable String filename) throws IOException {
        Path path = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        Resource resource = (Resource) new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User userDetails) {
        if (userDetails.getUserRole() == null) {
        }

        if (userRepository.findByEmail(userDetails.getEmail()).isPresent()) {
            return new ResponseEntity("Email already in use", HttpStatus.CONFLICT);
        }

        User newUser = userRepository.save(userDetails);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity<User> createUserWithImage(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("userRole") String userRole,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) {

        if (userRepository.findByEmail(email).isPresent()) {
            return new ResponseEntity("Email already in use", HttpStatus.CONFLICT);
        }

        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setUserRole(UserRole.EMPLOYEE);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Files.copy(imageFile.getInputStream(), uploadPath.resolve(fileName),
                        StandardCopyOption.REPLACE_EXISTING);

                newUser.setProfilePic(fileName);
            } catch (IOException e) {
                return new ResponseEntity("Greška pri snimanju slike: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        User savedUser = userRepository.save(newUser);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

}
