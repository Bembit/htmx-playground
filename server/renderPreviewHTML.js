function renderPreviewHTML(postData) {

    const { postId, name } = postData;

    // Create an HTML string for the post
    const postHtml = `
        <a id="${postId}" class="post-container">
            <h2>${name} Post</h2>
            <p><strong>Post ID:</strong> ${postId}</p>
            <div class="side-note">sidenote</div>
        </a>
    `;
    return postHtml;
}

module.exports = { renderPreviewHTML };
