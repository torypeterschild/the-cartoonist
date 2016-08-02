from flask import render_template, flash, redirect, request, url_for, Markup
from app import app
from .forms import InputForm, SaveForm
from textblob import TextBlob
import random, sys, os
import cartoon_generator as cg
import caption


captionpersist = list()


# @app.route("/")
# @app.route("/index")
# def index():
#     save_form = SaveForm()
#     return render_template("cartoon.html",
#         header="cartoonist",
#         menu=True,
#         buttons=False,
#         save_form=save_form)

@app.route("/")
@app.route("/index")
def render():

    with app.open_resource('static/corpus000.txt') as f:
        content = f.read()

    cap = caption.Caption(content)
    cap.make()
    cartoon = cg.Cartoon(cap)
    # print(cartoon.__str__())

    svg_cartoon = cartoon.assemble()

    return render_template("cartoon.html",
        header="cartoonist",
        menu=True,
        save=True,
        svgwrite=Markup(svg_cartoon))


""" TODO: Render save-cartoon template like cartoon template
        in the same style as cartoon template """
@app.route("/save-cartoon", methods=['POST'])
def save_cartoon():
    global captionpersist
    real_caption = None
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