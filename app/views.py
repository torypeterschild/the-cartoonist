from flask import render_template, flash, redirect, request
from app import app
from .forms import InputForm
from textblob import TextBlob
import random, sys, os

@app.route("/")
@app.route("/index")
def index():
  return render_template("cartoon.html",
    header="Cartoonist", 
    title="Cartoonist")

@app.route("/input", methods=['GET', 'POST'])
def input():
  form = InputForm()
  if form.validate_on_submit():
    flash("Keyword is '%s'" % (form.keyword.data))

  with app.open_resource('static/corpus000.txt') as f:
    content = f.read()

  blob = TextBlob(content.decode('utf-8'))
  caption = " "  

  sentence_list = list()

  """ TODO: generate error message when keyword is not in corpus """
  if form.keyword.data is not None:
    for sentence in blob.sentences:
      words = sentence.split()
      if form.keyword.data in words or form.keyword.data.lower() in words:
        sentence_list.append(sentence.replace("\n", " "))
  else:
    return render_template("input.html",
      header="Cartoonist",
      form=form)        
  
  if not sentence_list:
    caption = "Error!"
  else:
    caption = random.choice(sentence_list)

  return render_template("cartoon.html",
    header="Cartoonist",
    caption=caption,
    form=form)

@app.errorhandler(404)
def not_found_error(error):
  return render_template("404.html"), 404