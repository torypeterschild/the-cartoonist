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
    # print(cartoon.__str__())

    svg_cartoon = cartoon.assemble()
    drawing_markup = Markup(svg_cartoon)

    save_form = SaveForm(svg_data=drawing_markup)

    resp = make_response(render_template("cartoon.html",
        header="cartoonist",
        menu=True,
        save=True,
        save_form=save_form,
        svgwrite=drawing_markup))
    return resp


@app.route('/screenshot', methods=['POST'])
def screenshot():
    if request.method == "POST":
        svg = request.form['svg_data']
        print(request)
    return render_template('savecartoon.html', svgwrite=Markup(svg))


@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404