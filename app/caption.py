from textblob import TextBlob
import random, sys, os, math
import parser


LINE_MAX = 6
WORDS_MAX = 20
ERROR = "?#$*&! - that word is not in the corpus."


class Caption:
    def __init__(self, content):
        self.text = None
        self.content = content
        self.words = None
        self.word_count = None
        self.n_lines = None
        self.tilt = None
        self.lines = []

    def __str__(self):
        descr = "\n-- CAPTION INSTANCE --\nText is %s\nWord count is %s\n" % (self.text, self.word_count)
        line_count = "\nLine count is %d" % self.n_lines
        cap_tilt = "\nTilt is %s" % self.tilt
        lines = "\nLines are:"
        end = "\n-- END CAPTION INSTANCE --\n" 

        for i in range(len(self.lines)):
            lines = lines + "\n" + str(self.lines[i])
 
        return descr + line_count + lines + cap_tilt + end

    def get_text(self):
        """ NOTE: THIS SHOULD NOT REBUILD DICT EVERY TIME -- REFACTOR """
        blob = TextBlob(self.content.decode('utf-8'))
        words_ = blob.split()
        d = parser.build_ngram_dict(words_)
        s = parser.build_sentence(d)
        # TODO: add check for max text length
        self.text = s

    def set_words(self):
        if self.text:
            self.words = self.text.split()

    def count_words(self):
        if self.words:
            self.word_count = len(self.words)

    def set_n_lines(self):
        if self.word_count:
            self.n_lines = int(math.ceil(self.word_count / float(LINE_MAX)))

    # TODO: CLEAN THIS UP
    def split_into_lines(self):
        if self.n_lines > 1:
            line_ending = 0
            for i in range(self.n_lines):
                line_li = self.words[line_ending:line_ending+LINE_MAX]
                line = " ".join(line_li)
                line_en = line.encode('utf-8')
                line_ending = line_ending + LINE_MAX
                self.lines.append(line_en)
            last_line_li = self.words[line_ending:]
            last_line = " ".join(last_line_li)
            last_line_en = last_line.encode('utf-8')
            self.lines.append(last_line_en)
        elif self.n_lines <= 1:
            li = " ".join(self.words[:])
            li_en = li.encode('utf-8')
            self.lines.append(li_en)
        else:
            print("Error: No self.n_lines")

    def calculate_tilt(self):
        tiltAmts = [5, 4, 3, 2, 355, 356, 357, 358]
        self.tilt = random.choice(tiltAmts)

    def make(self):
        self.get_text()
        self.set_words()
        self.count_words()
        self.set_n_lines()
        self.split_into_lines()
        self.calculate_tilt()





