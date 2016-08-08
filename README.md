Cartoonist
==========

**Note**: Cartoonist is a work in progress.

Cartoonist is a program that generates an original cartoon and a caption. It creates a combination of SVG paths to form a face and builds a caption using Markov chaining.

The eventual goal is to use sentiment analysis on the generated caption to decide how certain features will be drawn — i.e., the angle and direction of eyebrow slant, shape of mouth, etc.

##How it works

Cartoonist uses `svgwrite` to generate the outline of the head as well as the facial features. Certain features are added sometimes but not always, and most features have several different styles that are displayed randomly.

##How to use it

You can play with a working version of Cartoonist at [torypeterschild.io](http://torypeterschild.io/).

##Install

You can also clone to use locally:

    $ git clone https://github.com/torypeterschild/the-cartoonist.git
    $ cd the-cartoonist
    $ ./run.py
      ...
    # Navigate to http://localhost:5000/ and click "enter keyword"

##Status

###What works
- Caption generation using Markov chains
- Cartoon drawing generation using `svgwrite`

###What doesn't work
- Saving the cartoon (working on this)
- Everything else


##License

Cartoonist is licensed under the MIT License. See LICENSE for more information.