from flask import render_template, flash, redirect
from app import app
from .forms import InputForm

@app.route("/")
@app.route("/index")
def index():
  return render_template("cartoon.html",
    header="Cartoonist!", 
    title="Cartoonist",
    svg="SVG will go here",
    caption="Test Caption")

@app.route("/input", methods=["GET", "POST"])
def input():
  form = InputForm()
  if form.validate_on_submit():
    flash("Keyword is '%s'" % (form.keyword.data))
    return redirect("/index")
  return render_template("input.html",
    title="Choose a keyword",
    form=form)

@app.errorhandler(404)
def not_found_error(error):
  return render_template("404.html"), 404