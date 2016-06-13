from __future__ import print_function
from nltk.corpus import PlaintextCorpusReader
import nltk
import random


corpus_root = 'corpus/'
wordlists = PlaintextCorpusReader(corpus_root, '.*')

def generate_model(cfdist, word, num=45):
  for i in range(num):
    print(word, end=" ")
    # word = cfdist[word].max()
    word = random.choice(list(cfdist[word]))
    # print("TEMP %s" % temp)

text = wordlists.words()
bigrams = nltk.bigrams(text)
cfd = nltk.ConditionalFreqDist(bigrams)

generate_model(cfd, 'mean')

