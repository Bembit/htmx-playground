function renderPreviewHTML(posts) {

    const { _id, postId, name } = posts;

    // Create an HTML string for the post
    const postHtml = `
        <a id="${_id}" hx-get="http://localhost:8001/posts/${_id}" hx-target="#preview-container" class="post-container">
            <h2>${name} Post</h2>
            <p><strong>Post ( generated ) ID:</strong> ${postId}</p>
            <div class="side-note">sidenote</div>
        </a>
    `;
    return postHtml;
}

module.exports = { renderPreviewHTML };
