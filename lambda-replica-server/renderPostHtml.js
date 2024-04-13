function renderPostHtml(postData) {

    // const { roomId, name, description, maxParticipants, teams } = roomData;
    const { postId, name, description, tags } = postData;

    // Create an HTML string for the room
    const postHtml = `
        <div id="swap-container-test" class="room-container">
            <h2>${name} Room</h2>
            <p><strong>Tags:</strong> ${tags}</p>
            <p><strong>Room ID:</strong> ${postId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Description:</strong> ${description}</p>
            
            <div class="side-note">There is no delete from DOM in HTMX.</div>
            <button onclick="removePostPreview()">Remove from DOM</button>
        </div>
    `;
    return postHtml;
}
//<div id="${postId}" class="room-container">

module.exports = { renderPostHtml };
