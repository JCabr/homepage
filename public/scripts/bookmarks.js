
function toggle_bookmark_tree_folder(folder) {

    var bookmarks_visible = true;

    if ($(folder).children().not('.bookmark-tree-folder-label')
        .filter(':visible').length === 0) {
        bookmarks_visible = false;
    }

    $(folder).children().not('.bookmark-tree-folder-label').fadeToggle(500);

    if (bookmarks_visible) {
        setTimeout(function () {
            $(folder).children('.bookmark-tree-folder-label')
                .css('padding-bottom', '15px');
        }, 500);
    }
    else {
        $(folder).children('.bookmark-tree-folder-label')
            .css('padding-bottom', '0px');
    }
}
