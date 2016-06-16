from textblob import TextBlob
import random
import sys, os
from flask import Flask, request, url_for, render_template
from cgi import parse_qs
app = Flask(__name__)


# @app.route("/caption", methods=['GET', 'POST'])
@app.route("/")
def main():
  return render_template('index.html')


# @app.route("/", methods=['POST'])
# def get_keyword():
#   keyword = parse_qs(os.environ['keyword'])
#   # text = request.form['keyword']
#   return keyword


@app.route("/caption", methods=['POST', 'GET'])
def read_file():
  infile = open("corpus/corpus000.txt", "r")
  content = infile.read()
  blob = TextBlob(content.decode('utf-8'))
  caption = " "
  # ngrams = blob.ngrams(n=3)

  if request.method == 'POST':
      caption = request.form

  sentence_list = list()

  if keyword is not None:
    for sentence in blob.sentences:
      if keyword in sentence:
        sentence_list.append(sentence.replace("\n", " "))
  else:
    for sentence in blob.sentences:
      if len(sentence.words) >= 6:
        sentence_list.append(sentence.replace("\n", " "))  

  for item in random.sample(sentence_list, 1):
    print(item)
    item = item.split()
    sen = []
    for w in item:
      sen.append(w)
    caption = " ".join(sen) 

  return render_template("index.html", value = caption)    
   


if __name__ == "__main__":
  f = "corpus/corpus000.txt"
  app.run()