from __future__ import print_function
from nltk.corpus import PlaintextCorpusReader
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize, regexp_tokenize
import nltk
import nltk.data
import random

# TODO: deal with names
# deal with grammar
# expand corpus

corpus_root = 'corpus/'
wordlists = PlaintextCorpusReader(corpus_root, '.*')
sent_detector = nltk.data.load('tokenizers/punkt/english.pickle')

def generate_model(cfdist, word, num=200):
  for i in range(num):
    print(word, end=" ")
    word = random.choice(list(cfdist[word]))
    # print("TEMP %s" % temp)
  print("\n\n")
    
text = wordlists.words()
text_as_string = " ".join(text)

print('\n-----\n'.join(sent_detector.tokenize(text_as_string.strip())))

s_tokenized = sent_detector.tokenize(text_as_string.strip())
words_tokenized = word_tokenize(" ".join(s_tokenized))
words = [w.lower() for w in text if w.isalpha()]
words1 = sent_tokenize(text_as_string)
bigrams = nltk.bigrams(words_tokenized)
cfd = nltk.ConditionalFreqDist(bigrams)

init_word = random.choice(list(words_tokenized))
print(init_word)
print("\n========\n")

generate_model(cfd, init_word)

