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
  z = cg.Cartoon()
  print(z.__str__())
  zz = z.bundle_noisy_paths()
  return render_template("cartoon.html",
    header="cartoonist",
    menu=True,
    buttons=False,
    svg=Markup(zz),
    save_form=save_form)


@app.route("/input", methods=['GET', 'POST'])
def input():
  keyword_form = InputForm()
  if keyword_form.validate_on_submit():
    flash("Keyword is '%s'" % (keyword_form.keyword.data))

  with app.open_resource('static/corpus000.txt') as f:
    content = f.read()

  cartoon = cg.Cartoon()
  print(cartoon.__str__())
  noisy_cartoon = cartoon.bundle_noisy_paths() 

  if keyword_form.keyword.data is not None:
    keyword = keyword_form.keyword.data 
    test_cap = caption.Caption()
    test_cap.get_text(content, keyword)
    test_cap.make()
    print(test_cap.__str__())
  else:
    return render_template("input.html",
      header="cartoonist",
      menu=True,
      keyword_form=keyword_form)
  # sentence_list = list()
  print("\nTEST CAP LINES")
  for i in test_cap.lines:
    print(i)

  return render_template("cartoon.html",
    header="cartoonist",
    caption=test_cap.text,
    menu=True,
    svg=Markup(noisy_cartoon),
    lines=test_cap.lines,
    tilt=test_cap.tilt,
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