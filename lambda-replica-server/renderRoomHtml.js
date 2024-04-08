function renderRoomHtml(roomData) {

    const { roomId, name, description, maxParticipants, teams } = roomData;

    // Create an HTML string for the room
    const roomHtml = `
        <div id="${roomId}" class="room-container">
            <h2>Room Details</h2>
            <p><strong>Room ID:</strong> ${roomId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Max Participants:</strong> ${maxParticipants}</p>

            <h3>Teams</h3>
            <div class="teams-container">
                <div class="team" id="team1">
                    <h4>Team 1</h4>
                    ${renderUsersHtml(teams.team1.users)}
                </div>

                <div class="team" id="team2">
                    <h4>Team 2</h4>
                    ${renderUsersHtml(teams.team2.users)}
                </div>
            </div>
        </div>
    `;

    return roomHtml;
}

function renderUsersHtml(users) {
    // Iterate over users and create HTML for each users
    const usersHtml = Object.values(users).map(user => `
        <div class="users">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>User ID:</strong> ${user.userId}</p>
            <p><strong>Another ID:</strong> ${user.anotherId}</p>
            <!-- Add more user properties as needed -->
        </div>
    `).join('');

    return usersHtml;
}

module.exports = { renderRoomHtml };
