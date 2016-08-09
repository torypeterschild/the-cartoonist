Cartoonist
==========

**Note**: Cartoonist is a work in progress.

Cartoonist is a program that generates an original cartoon and a caption. It creates a combination of SVG paths to form a face and builds a caption using Markov chaining.

The eventual goal is to use sentiment analysis on the generated caption to decide how certain features will be drawn — i.e., the angle and direction of eyebrow slant, shape of mouth, etc.

##How it works

Cartoonist uses `svgwrite` to generate the outline of the head as well as the facial features. Certain features are added sometimes but not always, and most features have several different styles that are displayed randomly.

Captions are generated using a Python implementation of a [Markov Text Generator](https://en.wikipedia.org/wiki/Markov_chain#Markov_text_generators) using [`TextBlob`](https://textblob.readthedocs.io/en/dev/index.html), a Python (2 and 3) library for processing textual data.

Markov Text Generators generate original, superficially real-looking sentences based on a given source text. Each word is selected based on how often it follows the previous word, and the results are chained together to form a sentence.

The following was generated with this program using George Saunder's Pastoralia as source text:

> Around two there is no goat, just killed, sits in our shoes, you always
> said good, good fishing, son, and when you say it, I’m already deep into
> the cave was real and all, and you even come into my workplace and
> started swearing.” “Like you ever worked.” “Like jewelry making wasn’t
> work,” he says.


##How to use it

You can play with a live (beta) version of Cartoonist at [torypeterschild.io](http://torypeterschild.io/).

## Requires ##
* [TextBlob](http://textblob.readthedocs.io/en/dev/index.html) for Markov chaining
* [svgwrite](https://pypi.python.org/pypi/svgwrite/) for creating and rendering SVG paths

##Status

###What works
- Caption generation using Markov chains
- Cartoon drawing generation using `svgwrite`

###What doesn't work YET
- Saving the cartoon (working on this)
- Database

## Examples

<img src="https://github.com/torypeterschild/the-cartoonist/blob/master/app/static/screencaps/screencap1.png" width="500">

<img src="https://github.com/torypeterschild/the-cartoonist/blob/master/app/static/screencaps/screencap2.png" width="500">

<img src="https://github.com/torypeterschild/the-cartoonist/blob/master/app/static/screencaps/screencap3.png" width="500">


##License

Cartoonist is licensed under the MIT License. See LICENSE for more information.