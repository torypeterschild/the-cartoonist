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

""" Define non-alphanumeric characters """
SENTENCE_TERMINATORS = ['!', '?', '.']
CLAUSE_TERMINATORS = [',', ';']
VALID_SYMBOLS = SENTENCE_TERMINATORS + CLAUSE_TERMINATORS


""" Caption Generator Object """
class CaptionGenerator():
  def __init__(self, *args):
    corpus_root = 'corpus/'
    wordlists = PlaintextCorpusReader(corpus_root, '.*')
    text = " ".join(wordlists.words())
    words = nltk.word_tokenize(text)
    sents = nltk.sent_tokenize(text)
    bigrams = nltk.bigrams([w.lower() for w in words])
    self.cdf = nltk.ConditionalFreqDist(bigrams)
    self.case_cdf = nltk.ConditionalFreqDist([(w.lower(), w) for w in words])
    self.avg_sent_len = int(len(words)/len(sents))

  def __call__(self, word):
    word = word.lower()
    if " " in word:
      print("space in word")
      ret = nltk.word_tokenize(word)
      word = ret[-1]
    else:
      print("space not in word")
      ret = [word]

    while word not in SENTENCE_TERMINATORS:
      if ret[-1] in CLAUSE_TERMINATORS:
        print("in clause terminators")
        prev_word = ret[-1]
      else:
        print("not in clause terminators")
        prev_word = ret[-1]
      for new_word in self.cdf[word]:
        # Avoid duplicates
        if new_word == word:
          continue
        # Avoid symbols  
        if not (new_word.isalpha() or new_word.isdigit()) and not new_word in VALID_SYMBOLS:
          continue
        if new_word in SENTENCE_TERMINATORS and len(ret) < self.avg_sent_len/2:
          continue
        if not new_word in ret[-len(ret)/2:]:
          prev_phrase = [prev_word, new_word]
          if not " ".join(prev_phrase) in " ".join(ret):
            if not (len(new_word) < 4 and (len(prev_word) < 4) and not random.randint(0,6)):
              word = new_word
              if not random.randint(0,2):
                break

      if word == ret[-1]:
        ret.append('...')
        break
      ret.append(word)  

    for x, w in enumerate(ret[:]):
      d = self.case_cdf[w]
      if d:
        ret[x] = d.max()

    ret = " ".join(ret)
    
    ret = ret[0].upper() + ret[1:]

    for symbol in VALID_SYMBOLS:
      ret = ret.replace(" %s" % symbol, symbol)
    return ret                     

    
def main():
  g = CaptionGenerator()
  print(g)
  print(g.avg_sent_len)
  caption = g.__call__("i")
  print(caption)


if __name__ == "__main__":
  main()

# corpus_root = 'corpus/'
# wordlists = PlaintextCorpusReader(corpus_root, '.*')
# sent_detector = nltk.data.load('tokenizers/punkt/english.pickle')

# def generate_model(cfdist, word, num=200):
#   for i in range(num):
#     print(word, end=" ")
#     word = random.choice(list(cfdist[word]))
#     # print("TEMP %s" % temp)
#   print("\n\n")
    
# text = wordlists.words()
# text_as_string = " ".join(text)

# print('\n-----\n'.join(sent_detector.tokenize(text_as_string.strip())))

# s_tokenized = sent_detector.tokenize(text_as_string.strip())
# words_tokenized = word_tokenize(" ".join(s_tokenized))
# words = [w.lower() for w in text if w.isalpha()]
# words1 = sent_tokenize(text_as_string)
# bigrams = nltk.bigrams(words_tokenized)
# cfd = nltk.ConditionalFreqDist(bigrams)

# init_word = random.choice(list(words_tokenized))
# print(init_word)
# print("\n========\n")

# generate_model(cfd, init_word)

