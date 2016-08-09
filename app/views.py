from flask import render_template, flash, redirect, request, url_for, Markup, make_response
from app import app
from .forms import InputForm, SaveForm
from textblob import TextBlob
import random, sys, os, json
import cartoon_generator as cg
import caption



@app.route("/")
@app.route("/index")
def index():

    with app.open_resource('static/corpus000.txt') as f:
        content = f.read()

    cap = caption.Caption(content)
    cap.make()
    cartoon = cg.Cartoon(cap)

    svg_cartoon = cartoon.assemble()
    drawing_markup = Markup(svg_cartoon)

    save_form = SaveForm(svg_data=drawing_markup)

    resp = make_response(render_template("index.html",
        home=True))
    return resp


@app.route('/screenshot/', methods=['POST'])
@app.route('/screenshot/<path:name>', methods=['POST'])
def screenshot(name=None):
    if request.method == "POST":
        svg = request.form['svg_data']
    return render_template('cartoon.html', svgwrite=Markup(svg), name=name)


@app.route('/display')
def display():

    with app.open_resource('static/corpus000.txt') as f:
        content = f.read()

    cap = caption.Caption(content)
    cap.make()
    cartoon = cg.Cartoon(cap)

    svg_cartoon = cartoon.assemble()
    drawing_markup = Markup(svg_cartoon)

    return render_template('display.html',
        drawn=True,
        svgwrite=drawing_markup)


@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404
