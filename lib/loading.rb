require 'sinatra'

def get_site_config
    YAML.load_file("#{__dir__}/../config.yaml")
end

def load_index_page(with_scheme:, config: nil)
    # Allow config as option to allow for reuse of already existing config
    # data by the time this function is called.
    config = get_site_config() if config.nil?

    haml :index, locals: {
        color_scheme:   with_scheme,
        code_languages: config['code languages'],
        bookmark_tree:  config['bookmark tree'],
        local_styles:   config['local']['styles'],
        local_scripts:  config['local']['scripts'],
        dependencies:   config['dependencies'],
        config:         config
    }
end

def color_scheme_names
    color_schemes = get_site_config['color schemes']

    %r<(#{
        (color_schemes.map { |name| '/' + name.gsub(' ', '%20') }).join('|')
    })>
end

