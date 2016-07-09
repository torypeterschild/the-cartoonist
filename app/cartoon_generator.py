import random, sys, os
import svg_utils
import shapes, caption
import svgwrite
from svgwrite.text import TSpan
import copy

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
Q0_X = (X_MIN + X_MAX)/2
Q0_Y = Y_MIN
Q1_X = X_MAX
Q1_Y = (Y_MIN + Y_MAX)/2
Q2_X = (X_MIN + X_MAX)/2
Q2_Y = Y_MAX
Q3_X = X_MIN
Q3_Y = (Y_MIN + Y_MAX)/2

""" CAPTION """
CAPTION_X = (X_MIN + X_MAX)/6
CAPTION_Y = Y_MAX + (HEIGHT*.1)


def get_noisy_path_str(pure_ps):
  obj = svg_utils.svgObject(pure_ps)
  noisy_ps = obj.make_noisy_path_str()
  return noisy_ps

def rN():
  return random.uniform(0.95,1.05)


class Cartoon:
  def __init__(self, caption):
    self.paper = svgwrite.Drawing(size=(widthmm, heightmm),debug=True)
    self.paper.viewbox(width=WIDTH,height=HEIGHT)
    self.head = random.choice(shapes.head_dict.keys())
    self.eyes = random.choice(shapes.eye_dict.keys())
    self.mouth = random.choice(shapes.mouth_dict.keys())
    self.paths = [shapes.head_dict[self.head], shapes.eye_dict[self.eyes]]
    self.objs = []
    self.noisy_paths = []
    self.bounding_box = None
    self.caption = caption
    self.svg = svgwrite.Drawing(size=(1000, 1000))
    #dwg.viewbox(width=args.width,height=args.height)

  def __str__(self):
    descr = "\n-- CARTOON INSTANCE --\nHead is %s.\nEyes are %s.\nMouth is %s." % (self.head, self.eyes, self.mouth)
    caption = self.caption.__str__()
    end = "\n-- END CARTOON INSTANCE --"
    return descr + caption + end

  # NOTE: PROBABLY DON'T NEED POST-SVGWRITE
  def create_objs(self):
    for p in self.paths:
      o = svg_utils.svgObject(p)
      self.objs.append(o)

  def add_noise_to_objs(self):
    for o in self.objs:
      noisy_ps = o.make_noisy_path_str()
      self.noisy_paths.append(noisy_ps)    
      
  def bundle_paths(self):
    p_str = svg_utils.combine_mult_paths(self.paths)
    svg_html = svg_utils.inject_path_tags(p_str)
    return svg_html

  def bundle_noisy_paths(self):
    self.create_objs()
    self.add_noise_to_objs()
    p_str = svg_utils.combine_mult_paths(self.noisy_paths)
    svg_html = svg_utils.inject_path_tags(p_str)
    return svg_html

  def create_head(self):
    noisy_head = get_noisy_path_str(shapes.head_dict[self.head])
    head = self.paper.path(d=noisy_head,fill="blue",stroke="blue",fill_rule="evenodd")
    head.translate(50,50)
    return head

  def create_eyes(self):
    noisy_eyes = get_noisy_path_str(shapes.eye_dict[self.eyes])
    l_eye = self.paper.path(d=noisy_eyes,fill="pink",opacity=0.5,stroke="red")
    r_eye = copy.deepcopy(l_eye)
    r_eye.translate(250,100)
    l_eye.translate(100,100)
    return (l_eye, r_eye)

  def create_mouth(self):
    mouth = self.paper.path(d=shapes.mouth_dict[self.mouth],fill="purple",opacity=0.3,stroke="red")
    mouth.translate(175,300)
    if self.mouth is "circle" or self.mouth is "w_ellipse":
      mouth.scale(.35)
    return mouth

  def create_caption(self):
    i = CAPTION_Y
    caption_elem = self.paper.text("", insert=(CAPTION_X, 0))
    for line in self.caption.lines:
      ts = TSpan(line, insert=(CAPTION_X, i), style = "font-size:50px;")
      caption_elem.add(ts)
      i = i + 50
    caption_elem.rotate(self.caption.tilt)
    return caption_elem

  def create_path(self):
    d = ('M', Q0_X, Q0_Y)
    path = self.paper.path(d=d, fill='blue', opacity=0.3, stroke='orange', stroke_width='3')
    path.push("S%d,%d %d,%d" % (X_MAX,Y_MIN,Q1_X,Q1_Y))
    path.push("C%d,%d %d,%d %d,%d" % (X_MAX*rN(),Y_MAX*rN(),X_MAX*rN(),Y_MAX*rN(),Q2_X*rN(),Q2_Y*rN()))
    path.push("C%d,%d %d,%d %d,%d" % (X_MIN*rN(),Y_MAX*rN(),X_MIN*rN(),Y_MAX*rN(),Q3_X*rN(),Q3_Y*rN()))
    path.push("C%d,%d %d,%d %d,%d" % (X_MIN*rN(),Y_MIN*rN(),X_MIN*rN(),Y_MIN*rN(),Q0_X,Q0_Y))
    print("\nCOMMANDS\n")
    print(path.commands)
    return path

  def create_eye_path(self):
    eye1 = self.paper.circle(center=(Q0_X*.75, Q0_Y*1.5), r=25, fill='pink', opacity=0.4, stroke='red', stroke_width='2')
    eye2 = copy.deepcopy(eye1)
    # eye1.translate(Q0_X)
    eye2.translate(Q0_X*.25)
    pupil1 = self.paper.circle(center=(eye1['cx']*rN(), eye1['cy']*rN()), r=(eye1['r']/5), fill='grey', stroke='blue', stroke_width='2')
    pupil2 = copy.deepcopy(pupil1)
    pupil2.translate(Q0_X*.25)
    return (eye1, eye2, pupil1, pupil2)


  def assemble(self):
    head = self.create_head()
    l_eye, r_eye = self.create_eyes()
    eye1, eye2, pupil1, pupil2 = self.create_eye_path()
    # self.paper.add(head)
    # self.paper.add(l_eye)
    # self.paper.add(r_eye)
    mask = self.paper.mask(fill_rule="evenodd")
    # mask.add(head).fill("yellow",opacity=0.7)
    # mask.add(l_eye).fill("orange",opacity=0.7)
    caption_elem = self.create_caption()
    mouth = self.create_mouth()
    # self.paper.add(mouth)
    self.paper.add(caption_elem)
    # self.paper.add(mask)
    path = self.create_path()
    self.paper.add(path)
    self.paper.add(eye1)
    self.paper.add(eye2)
    self.paper.add(pupil1)
    self.paper.add(pupil2)
    print("\n=====EYE1 INFO======\N")
    print(eye1.tostring())
    print(eye1['cx'])
    return self.paper.tostring()



    # svg_doc = svgwrite.Drawing(size=('100%', '100%'))
    # svg_doc.add(svg_doc.path(d=shapes.small_circle,fill='pink',stroke="blue",fill_rule="nonzero"))
    # head = svg_doc.path(d=shapes.tall_w_noise,fill='none',stroke="blue")
    # svg_doc.add(head)
    # mask = svg_doc.mask(fill_rule="evenodd")
    # mask.add(head).fill("yellow",opacity=0.7)
    # eye = svg_doc.path(d=shapes.eye_dict[self.eyes],fill='none',stroke="red")
    # svg_doc.add(eye)
    # eye_r = copy.deepcopy(eye)
    # eye.scale(.25,0.25)
    # svg_doc.add(eye_r)
    # eye_r.translate(25,0)
    # i = 500
    # caption = svg_doc.text("", insert=(0, 0))
    # for line in self.caption.lines:
    #   ts = TSpan(line, insert=(0, i), style = "font-size:40px;")
    #   caption.add(ts)
    #   i = i + 40
    # caption.rotate(5)
    # svg_doc.add(caption)
    # svg_doc.defs.add(mask)
    # return svg_doc.tostring()


