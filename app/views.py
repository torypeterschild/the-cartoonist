from flask import render_template, flash, redirect, request
from app import app
from .forms import InputForm
from textblob import TextBlob
import random, sys, os

@app.route("/")
@app.route("/index")
def index():
  return render_template("cartoon.html",
    header="Cartoonist!", 
    title="Cartoonist",
    svg="SVG will go here",
    caption="Test Caption")

@app.route("/input", methods=['GET', 'POST'])
def input():
  form = InputForm()
  if form.validate_on_submit():
    flash("Keyword is '%s'" % (form.keyword.data))

  with app.open_resource('corpus000.txt') as f:
    content = f.read()

  blob = TextBlob(content.decode('utf-8'))
  caption = " "  

  sentence_list = list()
  print(sentence_list)

  if form.keyword.data is not None:
    for sentence in blob.sentences:
      if form.keyword.data in sentence:
        sentence_list.append(sentence.replace("\n", " "))
      elif form.keyword.data.lower() in sentence:
        sentence_list.append(sentence.replace("\n", " "))
  else:
    return render_template("input.html",
      title="choose a keyword",
      form=form)        
  
  if not sentence_list:
    caption = "Error!"
  else:
    caption = random.choice(sentence_list)

  return render_template("cartoon.html",
    title="Choose a keyword",
    caption=caption,
    form=form)

@app.errorhandler(404)
def not_found_error(error):
  return render_template("404.html"), 404