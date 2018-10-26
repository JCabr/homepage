
function get_time() {
    let date = dateFormat(new Date(), 'h:i:s A')
    document.getElementById('status-bar-time').innerHTML = date

    setTimeout('get_time()', 300)       // Get time every 300 milliseconds
}

function get_date() {
    let current_date = new Date()
    let date = dateFormat(current_date, 'm/d/y')
    let day = dateFormat(current_date, 'D').slice(0, 2).toUpperCase()
    document.getElementById('status-bar-date').innerHTML = date + ' ' + day

    setTimeout('get_date()', 3600000)   // 3,600,000 milliseconds in an hour
}

function toggle_time_date() {
    $('#status-bar-time-label, #status-bar-date-label').toggle()
    $('#status-bar-time, #status-bar-date').toggle()
}

function toggle_lang_options() {
    $('.code-lang-option').toggle()
}
