from flask import render_template, flash, redirect, request, url_for
from app import app
from .forms import InputForm, SaveForm
from textblob import TextBlob
import random, sys, os, json

captionpersist = list()

@app.route("/")
@app.route("/index")
def index():
  save_form = SaveForm()
  return render_template("cartoon.html",
    header="cartoonist",
    menu=True,
    save_form=save_form)


@app.route("/input", methods=['GET', 'POST'])
def input():
  keyword_form = InputForm()
  if keyword_form.validate_on_submit():
    flash("Keyword is '%s'" % (keyword_form.keyword.data))

  with app.open_resource('static/corpus000.txt') as f:
    content = f.read()

  blob = TextBlob(content.decode('utf-8'))
  caption = " "  

  sentence_list = list()

  if keyword_form.keyword.data is not None:
    for sentence in blob.sentences:
      words = sentence.split()
      if keyword_form.keyword.data in words or keyword_form.keyword.data.lower() in words:
        sentence_list.append(sentence.replace("\n", " "))
  else:
    return render_template("input.html",
      header="cartoonist",
      menu=True,
      keyword_form=keyword_form)        
  
  if not sentence_list:
    caption = "?#$*&! - that word is not in the corpus."
  else:
    caption = random.choice(sentence_list)

  return render_template("cartoon.html",
    header="Cartoonist",
    caption=caption,
    menu=True,
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