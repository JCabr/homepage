# Homepage

##  Sections

- [About](https://github.com/JCabr/homepage#about)
- [Installation](https://github.com/JCabr/homepage#installation)
- [Configuration](https://github.com/JCabr/homepage#configuration)
- [Modification](https://github.com/JCabr/homepage#modifcation)

## About

This is my custom browser homepage, made to run with the
[Sinatra](https://github.com/sinatra/sinatra)
Ruby library and featuring:
- A search bar
- A bookmark tree
- A code editor + runner
- A status bar that shows the current time/date and current code language
  for the editor.


To get an idea of what it looks like, here's an image:

![It allows for writing and running quick snippets of code in a variety
  of languages](homepage_pic.png)
*This is the page rendered with the Adapta Nokto theme.*
*You specify different themes in the `config.yaml` file and add or modify*
*themes by adding/changing css files in the `/public/styles/colors` folder.*

## Installation

1) Ensure you have at least the following dependencies:
    - Ruby 2.2
    - Sinatra itself (use `gem install sinatra` to get it)

2) Download the repository via either the `git clone` command or using
   GitHub's download button.

3) Run the `server.rb` file with Ruby

4) Open your browser to `localhost:PORT` where `PORT` is the number for the
   port hosting the local server Sinatra is using, to ensure the page is
   working.
    - Default port number is **9897**.

5) If you use this as a homepage, then you likely want to set your browser's
   homepage to the localhost link.

## Configuration

All of the page's general configuration is stored in file named `config.yaml`.

It allows you to list out important things for the generation of the website,
like:
  - What color schemes you want and which should be the default.
  - What bookmarks you want.
  - What code languages you want the editor to support
    - Including what kind of syntax highlighting to use, how to compile/run
      the code, etc.
  - Any JS/CSS files you need the page to load (either as local code you
    wrote yourself, or a separate category for locally stored dependencies).

For in-depth information on configuration options, look at
[the config wiki page](link_goes_here).

## Modification

For in-depth information on what to modify to change aspects of the page,
look at [the modification wiki page](link_goes_here).
