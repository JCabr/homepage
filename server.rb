require 'sinatra'
require 'sinatra/reloader'
require 'yaml'
require_relative 'lib/loading.rb'
require_relative 'lib/code_running.rb'

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
