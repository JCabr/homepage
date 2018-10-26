
// TODO: Replace code_mirror_theme and current_code_lang with ERB variables
//       that will be substituted out with given values when a page is loaded.
var code_mirror_theme = 'TEST'
var current_code_lang = 'ruby'
var code_input_mirror = null;
var code_output_mirror = null;

function create_code_input_field() {
    
    let language_mode = current_code_lang;

    switch (current_code_lang) {
        case 'crystal':
            language_mode = 'ruby'
            break
        case 'coffeescript':
            language_mode = 'ruby'
            break
        case 'typescript':
            language_mode = 'javascript'
            break
        case 'c':
            language_mode = 'text/x-csrc'
            break
        case 'cpp':
            language_mode = 'text/x-c++src'
            break
        case 'csharp':
            language_mode = 'text/x-csharp'
            break
        case 'java':
            language_mode = 'text/x-java'
            break
        case 'kotlin':
        case 'kotlinscript':
        case 'scala':
        case 'scalascript':
            language_mode = 'text/x-scala'
            break
        default:
            break;
    }

    code_input_mirror = CodeMirror.fromTextArea(
        document.getElementById('code-input-field'), {
            theme:          code_mirror_theme,
            mode:           language_mode,
            scrollbarStyle: 'null',
            indentUnit:     4,
            tabSize:        4,
            indentWithTabs: true,
            lineNumbers:    true,
            lineWrapping:   true
        }
    )
    code_input_mirror.setValue('')
    return code_input_mirror
}

function create_code_output_field() {
    
    line_num_func = function(line_num) {
        return line_num == 0 ? '' : line_num
    }

    code_output_mirror = CodeMirror.fromTextArea(
        document.getElementById('code-output-field'), {
            theme:                  code_mirror_theme,
            mode:                   'null',
            scrollbarStyle:         'null',
            indentUnit:             4,
            lineNumbers:            false,
            lineWrapping:           true,
            readOnly:               true,
            lineNumberFormatter:    line_num_func,
            firstLineNumber:        0
        }
    )

    output_text = 'OUTPUT:'
    code_output_mirror.setValue(output_text)
    dom_code = $('.CodeMirror.cm-s-' + 'TEST' + '.CodeMirror-wrap', '#code-output')
    dom_code.css('height', '25vh')
    return code_output_mirror
}

function destroy_code_input_box() {
    $(`.CodeMirror.cm-s-TEST.CodeMirror-wrap`, '#code-input-box').remove()
}

function lang_src_to_name(src) {
    console.log(src.split('/').slice(-1)[0].split('_')[0])
    return src.split('/').slice(-1)[0].split('_')[0]
}

function reset_code() {
    let current_lang = lang_src_to_name($('#lang-selection').attr('src'))

    var default_content = ''

    switch (current_lang) {
        case 'c':
            default_content = (
                '#include <stdio.h>\n\n' +
                'int main()\n{\n    \n    return 0;\n}\n')
            break
        case 'cpp':
            default_content = (
                '#include <iostream>\n' +
                'using namespace std;\n\n' +
                'int main()\n{\n    \n    return 0;\n}\n')
            break
        case 'csharp':
            default_content = (
                'using System;\n\n' +
                'namespace Code\n{\n    ' +
                'class Code\n    {\n        ' +
                'static void Main()\n        {\n' +
                '            \n' +
                '        }\n    }\n}\n')
            break
        case 'java':
            default_content = (
                'public class Code\n{\n    ' +
                'public static void main(String[] args)\n    ' +
                '{\n        \n    }\n}\n')
            break
        case 'kotlin':
            default_content = (
                'fun main(args: Array<String>)\n' +
                '{\n    \n}\n')
            break
        case 'scala':
            default_content = (
                'object Code\n{\n    ' +
                'def main(args: Array[String]): Unit =\n    {\n' +
                '        \n    }\n}\n')
            break
        default:
            break
    }

    code_input_mirror.setValue(default_content)
}

function run_code() {
    code_output_mirror.setValue('OUTPUT:')

    $.ajax({
        // TODO: Replace port with variable port with ERB.
        url:        'http://localhost:9897/code_run',
        data:       {
            code:   code_input_mirror.getValue(),
            lang:   current_code_lang
        },
        type:       'POST',
        success:    function(response) {
            console.log(
                'SUCCESSFUL '+current_code_lang.toUpperCase()+' CODE RUN\n'+
                'RESULT:\n'+response
            )
            setTimeout(function() {
                code_output_mirror.setValue('OUTPUT:\n' + response)
            }, 100)
        },
        error:      function(error) {
            console.log(
                `${current_code_lang.toUpperCase()} CODE RUN ERROR\n${error}`
            )
            code_output_mirror.setValue(
                'OUTPUT:\n'+current_code_lang.charAt(0).toLocaleUpperCase()+
                current_code_lang.slice(1)+' Code Run Error\n\nCheck console'+
                ' log for more details'
            )
        }
    })
}

function clear_code() {
    code_input_mirror.setValue('')
}

function select_lang_option(lang) {
    $('.code-lang-option').hide()
    let new_src = lang.attr('src')
    $('#lang-selection').attr('src', new_src)

    current_code_lang = lang_src_to_name(new_src)

    destroy_code_input_box()
    create_code_input_field()
}
