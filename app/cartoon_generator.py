import random, sys, os, copy, math
import caption, eye, head, mouth, noise
import svgwrite
from svgwrite.text import TSpan
import path_utilities as pu


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

""" CAPTION """
CAPTION_X = CX - R
CAPTION_Y = CY + (R * 1.3)


class Cartoon:
  def __init__(self, caption):
    self.paper = svgwrite.Drawing(size=(widthmm, heightmm),debug=True)
    self.paper.viewbox(width=WIDTH,height=HEIGHT)
    self.head = head.Head(100, R, CX, CY)
    self.caption = caption
    self.svg = svgwrite.Drawing(size=(1000, 1000))

  def __str__(self):
    descr = "\n-- CARTOON INSTANCE --\n%s." % (self.head)
    caption = self.caption.__str__()
    end = "\n-- END CARTOON INSTANCE --"
    return descr + caption + end

  def create_caption(self):
    i = CAPTION_Y
    if self.head.shape_type == 0:
      i += (self.head.r * .15)
    elif self.head.shape_type == 1:
      i -= (self.head.r * .5)
    elif self.head.shape_type == 3 or self.head.shape_type == 2:
      i += (self.head.r * .1)
    caption_elem = self.paper.text("", insert=(CAPTION_X, 0))
    for line in self.caption.lines:
      ts = TSpan(line, insert=(CAPTION_X, i), style = "font-size:50px;")
      caption_elem.add(ts)
      i = i + 50
    caption_elem.rotate(self.caption.tilt)
    return caption_elem

  def assemble(self):
    # self.paper.add(self.paper.rect(insert=(0, 0), size=('100%', '100%'), fill='white'))
    caption_elem = self.create_caption()
    self.paper.add(caption_elem)
    filter_t = self.paper.defs.add(self.paper.filter(id="FN", start=(0, 0), size=('100%', '100%'),
               filterUnits="userSpaceOnUse", color_interpolation_filters="sRGB"))
    filter_t.feGaussianBlur(stdDeviation="1", result="BLUR")
    filter_t.feTurbulence(x='0%', y='0%', width='100%',
                height='100%', baseFrequency=.03, numOctaves=4, seed=47,
                stitchTiles='stitch', type='fractalNoise', result="NOISE")
    filter_t.feDisplacementMap(in_="SourceGraphic", xChannelSelector="A", yChannelSelector="A", scale="23.5", result="DISPL")

    filter_t.feComponentTransfer(in_="DISPL", result="OPAQ").feFuncA(type_="linear", slope=".9")

    filter_t.feMerge(["OPAQ"])

    filter_x = self.paper.defs.add(self.paper.filter(id="Fx", start=(0, 0), size=('100%', '100%'),
               filterUnits="userSpaceOnUse", color_interpolation_filters="sRGB"))
    filter_x.feTurbulence(x='0%', y='0%', width='100%',
                height='100%', baseFrequency=.04, numOctaves=4, seed=47,
                stitchTiles='stitch', type='fractalNoise')
    filter_x.feDisplacementMap(in_="SourceGraphic", xChannelSelector="A", yChannelSelector="A", scale="13.5", result="DISPL2")
    g_f = self.paper.g(filter=filter_t.get_funciri())
    g_x = self.paper.g(filter=filter_x.get_funciri())
    for elem in self.head.elements:
      # self.paper.add(elem)
      g_f.add(elem.stroke('grey', width='1'))
      if elem is self.head.outline:
        nofill = copy.deepcopy(elem)
        g_x.add(nofill.fill('none').stroke('grey'))
        # self.paper.add(nofill)
  
    self.paper.add(g_f)
    self.paper.add(g_x)



    return self.paper.tostring()

