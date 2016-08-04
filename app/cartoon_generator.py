import random, sys, os, copy, math
import caption, eye, head, mouth, noise
import svgwrite
from svgwrite.text import TSpan
import path_utilities as pu
import filter_utils as f


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
        caption_elem = self.create_caption()
        self.paper.add(caption_elem)
        shape_filt = f.make_shape_filter(self.paper)
        outline_filter = self.paper.defs.add(shape_filt)
        feature_filt = f.make_feature_filter(self.paper)
        feature_filter = self.paper.defs.add(feature_filt)
        fractal_filt = f.make_fractal_filter(self.paper)
        fractal_filter = self.paper.defs.add(fractal_filt)
        gr_outline = self.paper.g(filter=outline_filter.get_funciri())
        gr_features = self.paper.g(filter=feature_filter.get_funciri())
        gr_fractal = self.paper.g(filter=fractal_filter.get_funciri())

        for elem in self.head.elements:
            if (elem is self.head.eyes.eyeballs[0].outline or 
                    elem is self.head.eyes.eyeballs[1].outline):
                gr_features.add(elem.stroke('dimgrey', width='1', 
                    opacity=1.0).fill('white', opacity=1.0))
            elif elem is self.head.outline:
                elem['filter'] = fractal_filter.get_funciri()
                gr_outline.add(elem.fill(opacity=0.5))
                nofill = copy.deepcopy(elem)
                nofill2 = copy.deepcopy(elem)
            else:   
                gr_features.add(elem.stroke('dimgrey', width='2'))

        self.paper.add(gr_fractal)
        self.paper.add(gr_outline)
        self.paper.add(gr_features)
        
        return self.paper.tostring()

