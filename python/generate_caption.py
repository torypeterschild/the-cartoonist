from __future__ import print_function
from nltk.corpus import PlaintextCorpusReader
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
import nltk
import nltk.data
import random

# TODO: deal with names
# deal with grammar
# expand corpus

corpus_root = 'corpus/'
wordlists = PlaintextCorpusReader(corpus_root, '.*')
sent_detector = nltk.data.load('tokenizers/punkt/english.pickle')

def generate_model(cfdist, word, num=25):
  for i in range(num):
    print(word, end=" ")
    # word = cfdist[word].max()
    word = random.choice(list(cfdist[word]))
    # print("TEMP %s" % temp)

text = wordlists.words()
text_as_string = " ".join(text)

print('\n-----\n'.join(sent_detector.tokenize(text_as_string.strip())))

s_tokenized = sent_detector.tokenize(text_as_string.strip())
words_tokenized = word_tokenize(" ".join(s_tokenized))
words = [w.lower() for w in text if w.isalpha()]
words1 = sent_tokenize(text_as_string)
bigrams = nltk.bigrams(words_tokenized)
cfd = nltk.ConditionalFreqDist(bigrams)

generate_model(cfd, 'I')

