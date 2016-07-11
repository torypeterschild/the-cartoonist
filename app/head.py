import svgwrite
import path_utilities as pu
import noise
import random

class Head:
  def __init__(self, n, r, cx, cy):
    self.n = n
    self.r = r
    self.cx = cx
    self.cy = cy
    self.shape_id = random.choice([0,1,2,3])
    self.outline = pu.create_circ_points(n, r, cx, cy)
    if self.shape_id is 0:
      self.outline = pu.create_misshapen_head(n, r, cx, cy)
    elif self.shape_id is 1:
      self.outline = pu.create_misshapen_head_x(n, r, cx, cy)
    elif self.shape_id is 2:
      self.outline = pu.create_spiky_head(n, r, cx, cy)
    elif self.shape_id is 3:
      self.outline = pu.create_fuzzy_head(n, r, cx, cy)

  def translate(self, tx, ty=None):
    if ty is not None:
      self.outline.translate(tx, ty)
    else:
      self.outline.translate(tx)  

  def scale(self, sx, sy=None):
    if ty is not None:
      self.outline.scale(sx, sy)
    else:
      self.outline.scale(sx)  

  def __str__(self):
    title = "\n--- HEAD ---\n"
    num_points = "%d points.\n" % (self.n)
    radius = "Radius: %d\n" % (self.r)
    center = "cx is %d, cy is %d\n" % (self.cx, self.cy)
    shape = "Shape is type: \n%s" % (self.shape_id)
    return title + num_points + radius + center + shape