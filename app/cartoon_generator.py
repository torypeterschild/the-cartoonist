import random, sys, os
import svg_utils
import shapes, caption
import svgwrite
from svgwrite.text import TSpan
import copy

captionsplit = "And my feeling is, I don't know how religious she can be in that outfit. I mean, I tried to tell her, it's all about social capital. Like, it's ALL about political capital. If you can imagine"

class Cartoon:
  def __init__(self):
    self.head = random.choice(shapes.head_dict.keys())
    self.eyes = random.choice(shapes.eye_dict.keys())
    self.paths = [shapes.head_dict[self.head], shapes.eye_dict[self.eyes]]
    self.objs = []
    self.noisy_paths = []
    self.bounding_box = None
    self.cap = caption.Caption()
    self.cap.text = "And my feeling is, I don't know how religious she can be in that outfit. I mean, I tried to tell her, it's all about social capital."
    self.cap.make()
    self.svg = svgwrite.Drawing(size=('100%', '100%'))
    print("LINE TEST\n")
    print(self.cap.lines)

  def __str__(self):
    descr = "Head is %s. Eyes are %s" % (self.head, self.eyes)
    return descr

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

  def create_tspans(self):
    self.cap.make()
    for line in self.cap.lines:
      ts = self.svg.TSpan(line, style = "font-size:50px;")


  def create_svg(self):
    svg_doc = svgwrite.Drawing(size=('100%', '100%'))
    svg_doc.add(svg_doc.rect(insert=(20, 0), size=('100%', '100%'), fill='gray', style="opacity:0.2"))
    svg_doc.add(svg_doc.path(d=shapes.small_circle,fill='pink',stroke="blue",fill_rule="nonzero"))
    head = svg_doc.path(d=shapes.tall_w_noise,fill='none',stroke="blue")
    svg_doc.add(head)
    mask = svg_doc.mask(fill_rule="evenodd")
    mask.add(head).fill("yellow",opacity=0.7)
    eye = svg_doc.path(d=shapes.eye_dict[self.eyes],fill='none',stroke="red")
    svg_doc.add(eye)
    eye_r = copy.deepcopy(eye)
    eye.scale(.25,0.25)
    svg_doc.add(eye_r)
    eye_r.translate(25,0)
    i = 500

    print("HEIGHT")
    print(mask.tostring())
    caption = svg_doc.text("I bought myself a car because I think I deserve it.", insert=(0, 0), style = "font-size:50px;")
    for line in self.cap.lines:
      ts = TSpan(line, insert=(0, i), style = "font-size:40px;")
      caption.add(ts)
      i = i + 40
    caption.rotate(5)
    svg_doc.add(caption)
    svg_doc.defs.add(mask)
    return svg_doc.tostring()


