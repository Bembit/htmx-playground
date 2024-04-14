function renderPostHtml(postData) {

    const { postId, name, description, tags } = postData;

    // Create an HTML string for the post
    const postHtml = `
        <div id="swap-container-test" class="post-container">
            <h2>${name} Post</h2>
            <p><strong>Tags:</strong> ${tags}</p>
            <p><strong>Post ID:</strong> ${postId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Description:</strong> ${description}</p>
            
            <div class="warning-note">There is no delete from DOM in HTMX.</div>
            <button onclick="removePostPreview()">Remove from DOM</button>
        </div>
    `;
    return postHtml;
}
//<div id="${postId}" class="post-container">

module.exports = { renderPostHtml };
