from textblob import TextBlob
import random
import sys

text = sys.stdin.read().decode('ascii', errors="replace")
blob = TextBlob(text)
ngrams = blob.ngrams(n=3)

short_sentences = list()
for sentence in blob.sentences:
  if len(sentence.words) >= 6:
    short_sentences.append(sentence.replace("\n", " "))

for item in random.sample(short_sentences, 10):
  print item    