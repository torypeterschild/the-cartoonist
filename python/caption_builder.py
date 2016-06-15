from textblob import TextBlob
import random
import sys, os
from flask import Flask, request, url_for, render_template
app = Flask(__name__)


# def hello():
#   return "hello world"

# text = sys.stdin.read().decode('ascii', errors="replace")
@app.route("/")
def read_file():
  infile = open("corpus/corpus000.txt", "r")
  content = infile.read()
  blob = TextBlob(content.decode('utf-8'))
  print(type(blob))
  # ngrams = blob.ngrams(n=3)
 
  sentence_list = list()
  for sentence in blob.sentences:
    if len(sentence.words) >= 6:
      sentence_list.append(sentence.replace("\n", " "))  

  # return " ".join(random.sample(sentences, 1))
  for item in random.sample(sentence_list, 1):
    item = item.split()
    sen = []
    for w in item:
      sen.append(w)
    return " ".join(sen)


if __name__ == "__main__":
  f = "corpus/corpus000.txt"
  # port = int(os.environ.get('PORT', 5000))
  # app.run(host='0.0.0.0', port=port)
  app.run()