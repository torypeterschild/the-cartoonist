from textblob import TextBlob
import random
import sys, os
from flask import Flask, request, url_for, render_template
from cgi import parse_qs
app = Flask(__name__)


@app.route("/")
def main():
  return render_template("index.html")


@app.route("/caption", methods=['POST', 'GET'])
def read_file():
  infile = open("corpus/corpus000.txt", "r")
  content = infile.read()
  blob = TextBlob(content.decode('utf-8'))
  caption = " "
  # ngrams = blob.ngrams(n=3)

  if request.method == 'POST':
      keyword = request.form['keyword']
      print("Keyword is %s" % keyword)

  sentence_list = list()

  if keyword is not None:
    for sentence in blob.sentences:
      if keyword in sentence:
        sentence_list.append(sentence.replace("\n", " "))
      if keyword.lower() in sentence:
        sentence_list.append(sentence.replace("\n", " "))    
  
  if not sentence_list:
    caption = "Error!"
  else:    
    caption =  random.choice(sentence_list)
  print("Caption is %s" % caption)

  return render_template("index.html", message = caption)    
   


if __name__ == "__main__":
  app.run()