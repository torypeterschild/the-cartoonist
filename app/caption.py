from textblob import TextBlob
import random, sys, os

LINE_MAX = 6
WORDS_MAX = 24
ERROR = "?#$*&! - that word is not in the corpus."


class Caption:
  def __init__(self):
    self.text = None
    self.words = None
    self.word_count = None
    self.n_lines = None
    self.tilt = None
    self.lines = []

  def __str__(self):
    descr = "Text is %s\nWord count is %s\n" % (self.text, self.word_count)
    lines = "\nLines are:\n"
    line_count = "\nLine count is %d" % self.n_lines
    cap_tilt = "\nTilt is %s" % self.tilt
    for i in range(len(self.lines)):
      lines = lines + str(self.lines[i]) + "\n"
    return descr + line_count + lines + cap_tilt

  def get_text(self, content, keyword):
    blob = TextBlob(content.decode('utf-8'))
    sentence_list = list()
    if keyword:
      for sentence in blob.sentences:
        words = sentence.split()
        if keyword in words or keyword.lower() in words:
          if len(words) < WORDS_MAX:
            sentence_list.append(sentence.replace("\n", " "))    
    if not sentence_list:
      self.text = ERROR
    else:
      self.text = random.choice(sentence_list)

  def set_words(self):
    if self.text:
      self.words = self.text.split()

  def count_words(self):
    if self.words:
      self.word_count = len(self.words)

  def set_n_lines(self):
    if self.word_count:
      self.n_lines = self.word_count / LINE_MAX

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
      li = " ".join(self.words)
      li_en = li.encode('utf-8')
      self.lines.append(li_en)
    else:
      print("Error: No self.n_lines")

  def calculate_tilt(self):
    tiltAmts = [5, 4, 3, 2, 355, 356, 357, 358]
    self.tilt = random.choice(tiltAmts)

  def make(self):
    self.set_words()
    self.count_words()
    self.set_n_lines()
    self.split_into_lines()
    self.calculate_tilt()





