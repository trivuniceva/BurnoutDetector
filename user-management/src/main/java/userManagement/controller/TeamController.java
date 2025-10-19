package userManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import userManagement.model.Team;
import userManagement.service.TeamService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    public ResponseEntity<Team> createTeam(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam Long managerId
    ) {
        Team teamDetails = new Team(name, description, null);

        Team newTeam = teamService.createTeamWithImage(teamDetails, managerId, imageFile);

        return new ResponseEntity<>(newTeam, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        Team team = teamService.getTeamById(id);
        return ResponseEntity.ok(team);
    }

    @PutMapping("/{teamId}/members")
    public ResponseEntity<Team> addMember(@PathVariable Long teamId, @RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        if (userId == null) {
            return ResponseEntity.badRequest().build();
        }
        Team updatedTeam = teamService.addMemberToTeam(teamId, userId);
        return ResponseEntity.ok(updatedTeam);
    }


}
