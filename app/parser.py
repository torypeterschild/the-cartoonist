from textblob import TextBlob, Word
import random, sys
from pprint import pprint


EOS = ['.', '?', '!']


def build_ngram_dict(words):
    """
    Key: ngram (currently 2-word tuples)
    Values: A list of words that follow the ngram
    """
    ngram_dict = {}
    for i, word in enumerate(words):
        try:
            first, second, third = words[i], words[i+1], words[i+2]
        except IndexError:
            break
        key = (first, second)

        # if this tuple isn't already a key, add it
        if key not in ngram_dict:
            ngram_dict[key] = []

        # append the third word to the list of values
        ngram_dict[key].append(third)

    return ngram_dict


def build_sentence(d):
    # Make a list of all possible starts and then select randomly
    starts = [key for key in d.keys() if key[0][0].isupper() and key[0][-1] not in EOS]
    key = random.choice(starts)

    sent = []
    first, second = key

    sent.append(first)
    sent.append(second)

    while True:
        try:
            third = random.choice(d[key])
        except KeyError:
            break
        sent.append(third)

        # if the last character in third is a EOS char,
        # break.
        if third[-1] in EOS:
            print("THIRD[-1]: %s" % third[-1])
            break
        key = (second, third)
        first, second = key

    sentence = " ".join(sent)

    if ":" in sentence:
        clauses = sentence.split(":")
        sentence = clauses[1]
        
    return sentence


# def main():
#     filename = sys.argv[1]

#     with open(filename) as f:
#         content = f.read()

#     blob = TextBlob(content.decode('utf-8'))

#     words = blob.split()
#     d = build_ngram_dict(words)
#     pprint(d)
#     print()
#     s = build_sentence(d)
#     print(s)
    # if s in content.decode('utf-8'):
    #     print("\nBummer! This sentence is just a copy of one in the corpus.")
