function renderPreviewHTML(posts) {

    const { _id, postId, name, tags } = posts;

    // Create an HTML string for the post
    const postHtml = `
        <a id="${_id}" hx-get="http://localhost:8001/posts/${_id}" hx-target="#preview-container" class="preview-container">
            <h2>Title: ${name}</h2>
            <p>UUID Generated ID: ${postId}</p>
            <hr>
        </a>
    `;
    return postHtml;
}

module.exports = { renderPreviewHTML };
