from flask import render_template, flash, redirect, request, url_for, Markup, session, make_response
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
def index():
    save_form = SaveForm()

    with app.open_resource('static/corpus000.txt') as f:
        content = f.read()

    cap = caption.Caption(content)
    cap.make()
    cartoon = cg.Cartoon(cap)
    # print(cartoon.__str__())

    svg_cartoon = cartoon.assemble()
    drawing_markup = Markup(svg_cartoon)

    resp = make_response(render_template("cartoon.html",
        header="cartoonist",
        menu=True,
        save=True,
        save_form=save_form,
        svgwrite=drawing_markup))
    resp.set_cookie('your_drawing', drawing_markup)

    # return render_template("cartoon.html",
    #     header="cartoonist",
    #     menu=True,
    #     save=True,
    #     svgwrite=Markup(svg_cartoon))
    return resp


""" TODO: Render save-cartoon template like cartoon template
        in the same style as cartoon template """
@app.route("/savecartoon", methods=['GET','POST'])
def savecartoon():
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

    svg_cartoon = request.cookies.get('your_drawing')
    print("\n====== STORED COOKIES=====\n")
    print(svg_cartoon)
 
    return render_template("savecartoon.html",
        svgwrite=svg_cartoon,
        captionsave=" ")


@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404