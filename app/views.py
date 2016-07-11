from flask import render_template, flash, redirect, request, url_for, Markup
from app import app
from .forms import InputForm, SaveForm
from textblob import TextBlob
import random, sys, os, json
import svg_utils, shapes
import cartoon_generator as cg
import caption

captionpersist = list()

@app.route("/")
@app.route("/index")
def index():
  save_form = SaveForm()
  return render_template("cartoon.html",
    header="cartoonist",
    menu=True,
    buttons=False,
    svg=" ",
    save_form=save_form)


@app.route("/input", methods=['GET', 'POST'])
def input():
  keyword_form = InputForm()
  if keyword_form.validate_on_submit():
    flash("Keyword is '%s'" % (keyword_form.keyword.data))

  with app.open_resource('static/corpus000.txt') as f:
    content = f.read()

  if keyword_form.keyword.data is not None:
    keyword = keyword_form.keyword.data 
    cap = caption.Caption(content,keyword)
    cap.make()
    print(cap.__str__())
    cartoon = cg.Cartoon(cap)
    print(cartoon.__str__())
  else:
    return render_template("input.html",
      header="cartoonist",
      menu=True,
      keyword_form=keyword_form)

  print("\nTEST CAP LINES")
  for i in cap.lines:
    print(i)

  svg_cartoon = cartoon.assemble()

  return render_template("cartoon.html",
    header="cartoonist",
    menu=True,
    save=True,
    svgwrite=Markup(svg_cartoon),
    keyword_form=keyword_form)


""" TODO: Render save-cartoon template like cartoon template
    in the same style as cartoon template """
@app.route("/save-cartoon", methods=['POST'])
def save_cartoon():
  global captionpersist
  real_caption = None
  # if request.method == 'POST':
  data = request.get_data()
  print("DATA IS %s" % data)
  print(type(data))
  captionpersist.append(data.strip('"\''))
  for elem in captionpersist:
    if elem is not '':
      real_caption = elem
  print("Captionpersist is %s" % captionpersist)
  print("real cap is %s" % real_caption)
 
  return render_template("save-cartoon.html",
    captionsave=real_caption)


@app.errorhandler(404)
def not_found_error(error):
  return render_template("404.html"), 404