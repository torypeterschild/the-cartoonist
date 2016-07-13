import random, sys, os
import shapes, caption
import svgwrite
from svgwrite.text import TSpan
import copy
import math
import eye, head
import path_utilities as pu
import noise

""" SIZE OF DRAWING """
WIDTH = 1000
HEIGHT = 1000
widthmm = "%fmm" % WIDTH
heightmm = "%fmm" % HEIGHT

""" SIZE OF HEAD OUTLINE """
X_MIN = WIDTH * .25
X_MAX = WIDTH * .75
Y_MIN = HEIGHT * .2
Y_MAX = HEIGHT * .6
CX = (X_MIN + X_MAX)/2
CY = (Y_MIN + Y_MAX)/2
R = WIDTH/4
Q0_X = CX
Q0_Y = Y_MIN
Q1_X = X_MAX
Q1_Y = CY
Q2_X = CX
Q2_Y = Y_MAX
Q3_X = X_MIN
Q3_Y = CY

""" CAPTION """
CAPTION_X = CX - R
CAPTION_Y = CY + (R * 1.3)


class Cartoon:
  def __init__(self, caption):
    self.paper = svgwrite.Drawing(size=(widthmm, heightmm),debug=True)
    self.paper.viewbox(width=WIDTH,height=HEIGHT)
    self.head = head.Head(100, R, CX, CY)
    self.eyes = eye.Eyes(40, 20*noise.rN(2.0,3.0), self.head.cx - .25*self.head.r, self.head.cy-.25*self.head.r)
    self.caption = caption
    self.svg = svgwrite.Drawing(size=(1000, 1000))

  def __str__(self):
    descr = "\n-- CARTOON INSTANCE --\nHead is %s." % (self.head)
    caption = self.caption.__str__()
    end = "\n-- END CARTOON INSTANCE --"
    return descr + caption + end

  def create_eyes(self, head):
    eye1 = eye.Eyes(40, 20*noise.rN(2.0,3.0), head.cx - .25*head.r, head.cy-.25*head.r)
    eye2 = copy.deepcopy(eye1)
    eye2.translate(head.r*.5)
    return eye1, eye2

  def create_caption(self):
    i = CAPTION_Y
    caption_elem = self.paper.text("", insert=(CAPTION_X, 0))
    for line in self.caption.lines:
      ts = TSpan(line, insert=(CAPTION_X, i), style = "font-size:50px;")
      caption_elem.add(ts)
      i = i + 50
    caption_elem.rotate(self.caption.tilt)
    return caption_elem

  def assemble(self):
    # eye1, eye2 = self.create_eyes(self.head)
    caption_elem = self.create_caption()
    self.paper.add(caption_elem)
    # self.paper.add(self.head.outline)
    for elem in self.head.elements:
      self.paper.add(elem)
    # self.paper.add(eye1.outline_e)
    # hair = self.head.make_hair()
    # self.paper.add(hair)
    # self.paper.add(eye1.left.outline)
    # self.paper.add(eye1.right.outline)
    # self.paper.add(eye1.left.pupil)
    # self.paper.add(eye1.right.pupil)
    self.eyes.create()
    for obj in self.eyes.eyeballs:
      self.paper.add(obj.outline)
      self.paper.add(obj.pupil)
    for elem in self.eyes.elements:
        self.paper.add(elem)
    print(self.eyes.__str__())
    print(self.head.__str__())
    return self.paper.tostring()


