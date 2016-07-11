import svgwrite
import path_utilities as pu
import noise


class Head:
  def __init__(self, n, r, cx, cy):
    self.n = n
    self.r = r
    self.cx = cx
    self.cy = cy
    self.shape_id = noise.rI(0,5)
    self.outline = pu.create_circ_points(n, r, cx, cy)

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
    return title + num_points + radius + center + pupil