package userManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import userManagement.model.Team;
import userManagement.model.User;
import userManagement.repository.TeamRepository;
import userManagement.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/team_images/";

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Team createTeamWithImage(Team teamDetails, Long managerId, MultipartFile imageFile) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found with id " + managerId));

        String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        Path uploadPath = Paths.get(UPLOAD_DIR);
        Path filePath = Paths.get(UPLOAD_DIR, uniqueFileName);

        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.write(filePath, imageFile.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Greška pri snimanju datoteke slike: " + e.getMessage());
        }

        teamDetails.setImageUrl("/" + UPLOAD_DIR + uniqueFileName);
        teamDetails.setManager(manager);

        return teamRepository.save(teamDetails);
    }

    @Transactional
    public Team addMemberToTeam(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found with id " + teamId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        team.addMember(user);
        return teamRepository.save(team);
    }

    @Transactional
    public Team removeMemberFromTeam(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found with id " + teamId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        team.removeMember(user);
        return teamRepository.save(team);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found with id " + id));
    }
}