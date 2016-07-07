import random, sys, os
import svg_utils
import shapes

class Cartoon:
  def __init__(self):
    self.head = random.choice(shapes.head_dict.keys())
    self.eyes = random.choice(shapes.eye_dict.keys())
    self.paths = [shapes.head_dict[self.head], shapes.eye_dict[self.eyes]]
    self.objs = []
    self.noisy_paths = []

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