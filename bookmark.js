document.addEventListener('DOMContentLoaded', () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarksContainer = document.getElementById('bookmarks');
    const bookmarkForm = document.getElementById('bookmark-form');
    const nameInput = document.getElementById('name');
    const urlInput = document.getElementById('url');

    const renderBookmarks = () => {
        bookmarksContainer.innerHTML = '';
        bookmarks.forEach((bookmark, index) => {
            const bookmarkElement = document.createElement('div');
            bookmarkElement.className = 'bookmark';

            const link = document.createElement('a');
            link.href = bookmark.url;
            link.target = '_blank';

            const favicon = document.createElement('img');
            favicon.className = 'favicon';
            favicon.src = `https://www.google.com/s2/favicons?domain=${bookmark.url}`;
            favicon.alt = `${bookmark.name} favicon`;

            const label = document.createElement('div');
            label.className = 'label';
            label.textContent = bookmark.name;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '&times;';
            deleteButton.onclick = () => {
                bookmarks.splice(index, 1);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                renderBookmarks();
            };

            link.appendChild(favicon);
            bookmarkElement.appendChild(link);
            bookmarkElement.appendChild(label);
            bookmarkElement.appendChild(deleteButton);
            bookmarksContainer.appendChild(bookmarkElement);
        });
    };

    bookmarkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        if (name && url && !bookmarks.some(b => b.url === url)) {
            bookmarks.push({ name, url });
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            renderBookmarks();
            nameInput.value = '';
            urlInput.value = '';
        }
    });

    renderBookmarks();
});

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}
