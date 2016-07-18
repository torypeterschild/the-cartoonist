Cartoonist
==========

**Note**: Cartoonist is a work in progress.

Cartoonist will eventually be a program that generates a cartoon and a caption based on a single word of user input. Currently, input is treated as a keyword and the caption is a randomly selected sentence containing the keyword that exists in the working corpus.

The goal is to use Markov chains for text generation, and to then use sentiment analysis on the generated caption to decide how certain features will be drawn — i.e., the angle and direction of eyebrow slant, shape of mouth, etc.

##How it works

Cartoonist uses `svgwrite` to generate the outline of the head as well as the facial features. Certain features are added sometimes but not always, and most features have several different styles that are displayed randomly.

##How to use it

Once the main features have been added, the Flask app will be deployed for all to use... Stay tuned!

##Install

Before deployment, you can clone to use locally:

    $ git clone https://github.com/torypeterschild/the-cartoonist.git
    $ cd the-cartoonist
    $ ./run.py
      ...
    # Navigate to http://localhost:5000/ and click "enter keyword"

##Status

###What works
- Caption generation using keyword
- Cartoon drawing generation using `svgwrite`

###What doesn't work
- Saving the cartoon (working on this)
- Original text generation (next up)
- Everything else


##License

Cartoonist is licensed under the MIT License. See LICENSE for more information.