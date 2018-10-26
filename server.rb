#! /usr/bin/ruby
require 'sinatra'
require 'sinatra/reloader'
require 'yaml'
require_relative 'lib/loading.rb'
require_relative 'lib/code_running.rb'

# TODO: Change highlight color in editor to match background color.

# TODO: Add option in config to denote syntax highlighting for each language,
#       that way adding languages would be much easier (assuming there's a
#       syntax highlighting scheme close enough), as then there would just
#       be some dynamic JS code generation using the config.

# TODO: Do the same idea as the above, but also with what the process should
#       be to run and report the output from the code, as that would ensure
#       that essentially no code would have to be manually written to add 
#       support for a new language.
#
#       This is probably much more complex than the above TODO, but can likely
#       be done easily enough by having an option under the language code run
#       config on details like if the code is going to be compiled, and how
#       compilation/interpretation and running the code should be handled.

configure do
    set :port, 9897
end

get '/' do
    site_config = get_site_config
    default_scheme = site_config['default color scheme']

    load_index_page with_scheme: default_scheme, config: site_config
end

get color_scheme_names do
    color_scheme = params['captures'].first[1..-1]

    load_index_page with_scheme: color_scheme
end

# TODO: Finish writing code-running commands for rest of languages.
post '/code_run' do
    code_dir = "#{__dir__}/.code_run"
    code_file = "#{code_dir}/CODE"

    output = run_code(params['code'], params['lang'],
                      __dir__, code_dir, code_file)

    return output
end
