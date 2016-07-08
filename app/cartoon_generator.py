import random, sys, os
import svg_utils
import shapes, caption
import svgwrite
from svgwrite.text import TSpan
import copy


def get_noisy_path_str(pure_ps):
  obj = svg_utils.svgObject(pure_ps)
  noisy_ps = obj.make_noisy_path_str()
  return noisy_ps


class Cartoon:
  def __init__(self, caption):
    self.paper = svgwrite.Drawing(size=('100%', '100%'))
    self.head = random.choice(shapes.head_dict.keys())
    self.eyes = random.choice(shapes.eye_dict.keys())
    self.paths = [shapes.head_dict[self.head], shapes.eye_dict[self.eyes]]
    self.objs = []
    self.noisy_paths = []
    self.bounding_box = None
    self.caption = caption
    self.captext = "And my feeling is, I don't know how religious she can be in that outfit. I mean, I tried to tell her, it's all about social capital."
    self.svg = svgwrite.Drawing(size=('100%', '100%'))

  def __str__(self):
    descr = "\n-- CARTOON INSTANCE --\nHead is %s. Eyes are %s" % (self.head, self.eyes)
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
    head = self.paper.path(d=noisy_head,fill="pink",stroke="blue",fill_rule="evenodd")
    return head

  def create_eyes(self):
    noisy_eyes = get_noisy_path_str(shapes.eye_dict[self.eyes])
    l_eye = self.paper.path(d=noisy_eyes,fill="blue",opacity=0.5,stroke="red")
    r_eye = copy.deepcopy(l_eye)
    r_eye.translate(125,0)
    return (l_eye, r_eye)

  def create_caption(self):
    i = 500
    caption_elem = self.paper.text("", insert=(0, 0))
    for line in self.caption.lines:
      ts = TSpan(line, insert=(0, i), style = "font-size:40px;")
      caption_elem.add(ts)
      i = i + 40
    caption_elem.rotate(self.caption.tilt)
    return caption_elem

  def assemble(self):
    head = self.create_head()
    l_eye, r_eye = self.create_eyes()
    self.paper.add(head)
    self.paper.add(l_eye)
    self.paper.add(r_eye)
    mask = self.paper.mask(fill_rule="evenodd")
    mask.add(head).fill("yellow",opacity=0.7)
    caption_elem = self.create_caption()
    self.paper.add(caption_elem)
    self.paper.add(mask)
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


