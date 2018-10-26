var app_status = 'maximized'

function close_app() {
    if (app_status != 'closed') {
        $('.app-title-bar').addClass('no-bottom-border')
    }

    $('.app-window').children().not('.app-title-bar').hide()

    app_status = 'closed'
}

function minimize_app() {
    if (app_status == 'closed') {
        maximize_app()
    }

    $('.app-bottom-box, .app-bottom-bar').hide()

    app_status = 'minimized'
}

function maximize_app() {
    $('.app-window').children().show()

    if (app_status == 'closed') {
        $('.app-title-bar').removeClass('no-bottom-border')
    }

    app_status = 'maximized'
}
