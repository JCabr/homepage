require 'open3'
require 'active_support/all'

def run_and_report(command)
    return Open3.capture3(command)
end

def replace_filenames(text, old_name, new_name)
    return text.include?(old_name) ? text.gsub(old_name, new_name) : text
end

def add_extension_to_code_filename(code_dir, code_file, extension)
    %x<mv \"#{code_file}\" \"#{code_dir}/CODE#{extension}\">
end

def revert_code_filename(code_dir, code_file, extension)
    %<mv \"#{code_dir}/CODE#{extension}\" \"#{code_file}\">
end

def run_code(code, language, dir, code_dir, code_file)
    File.write(code_file, code)

    out, err, status = '', '', ''

    case language
    when 'ruby'
        out, err, status = run_and_report "ruby \"#{code_file}\""
        err = replace_filenames(err, code_file, 'CODE')
    when 'crystal'
        out, err, status = run_and_report "crystal run \"#{code_file}\""
        err = replace_filenames(err, code_file, 'CODE')
    when 'python'
        out, err, status = run_and_report "python \"#{code_file}\""
        err = replace_filenames(err, code_file, 'CODE')
    when 'javascript'
        out, err, status = run_and_report "node \"#{code_file}\""
        err = replace_filenames(err, code_file, 'CODE')
    when 'coffeescript'
        out, err, status = run_and_report("coffee \"#{code_file}\"")

        # Evaluating CoffeeScript leaves an extra newline at the end, so
        # we need to chomp it off to have the output look the same as
        # other languages' output.
        out.chomp!
        err = replace_filenames(err, code_file, 'CODE')
    when 'typescript'
        add_extension_to_code_filename(code_dir, code_file, '.ts')

        tsc = %x<
            tsc --strict --outFile \"#{code_dir}/COMPILED\" \"#{code_file}.ts\"
        >
        revert_code_filename(code_dir, code_file, '.ts')

        if tsc.include? 'error'
            error_report_file = "#{dir.split('/').last}/.code_run/CODE"
            puts error_report_file
            err = replace_filenames(tsc, error_report_file, 'CODE')
        else
            out, err, status = run_and_report "node \"#{code_dir}/COMPILED\""
        end
    when 'c'
        add_extension_to_code_filename(code_dir, code_file, '.c')

        out, err, status = run_and_report("
            gcc -std=c11 -o \"#{code_dir}/COMPILED\" \"#{code_file}.c\"
        ")
        revert_code_filename(code_dir, code_file, '.c')

        compile_err = replace_filenames(err, code_file, 'CODE')
        err = ''

        unless compile_err.include? 'error'
            out, err, status = run_and_report "#{code_dir}/COMPILED"
        end

        err = "#{compile_err}\n#{err}"
    when 'cpp'
        add_extension_to_code_filename(code_dir, code_file, '.cpp')
        out, err, status = run_and_report("
            g++ -std=c++17 -o \"#{code_dir}/COMPILED\" \"#{code_file}.cpp\"
        ")
        revert_code_filename(code_dir, code_file, '.c')

        compile_err = replace_filenames(err, code_file, 'CODE')
        err = ''

        unless compile_err.include? 'error'
            out, err, status = run_and_report "#{code_dir}/COMPILED"
        end

        err = "#{compile_err}\n#{err}"
    when 'csharp'
        out, err, status = run_and_report("
            csc \"#{code_file}\" -out:\"#{code_dir}/COMPILED\"
        ")

        compile_err = replace_filenames(err, code_file, 'CODE')
        err = ''

        unless compile_err.include? 'error'
            out, err, status = run_and_report "mono #{code_dir}/COMPILED"
        end

        err = "#{compile_err}\n#{err}"
    when 'java'
        File.write("#{code_dir}/Code.java", code)

        out, err, status = run_and_report("
            javac \"#{code_dir}/Code.java\"
        ")

        compile_err = replace_filenames(err, "#{code_dir}/Code.java", 'CODE')
        err = ''

        unless compile_err.include? 'error'
            out, err, status = run_and_report "java -cp \"#{code_dir}\" Code"
        end

        err = "#{compile_err}\n#{err}"
    when 'shell'
        out, err, status = run_and_report code
    end

    result = out + (err.blank? ? '' : "\nERROR:\n#{err}")
    return result
end
