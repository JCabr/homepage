
$(window).on('load', function() {
})

$(document).ready(function() {

    $('.bookmark-tree-folder-label').click(function() {
        toggle_bookmark_tree_folder($(this).parent())
    })

    $(`#status-bar-time-label, #status-bar-time,
       #status-bar-date-label, #status-bar-date`).click(function() {
        toggle_time_date()
    })

    $('#app-close-button').click(close_app)
    $('#app-min-button').click(minimize_app)
    $('#app-max-button').click(maximize_app)

    $('#status-bar-lang, #lang-selection').click(function () {
        toggle_lang_options()
    })

    $('#code-clear-button').click(function () {
        clear_code();
    });

    $('#code-reset-button').click(function () {
        reset_code();
    });

    $('#code-run-button').click(function () {
        run_code();
    });

    $('.code-lang-option').click(function () {
        select_lang_option($(this).children('.lang-icon'))
    })

    create_code_input_field()
    create_code_output_field()
    get_time()
    get_date()
})
