import svgwrite
import path_utilities as pu
import noise


class Eye:
  def __init__(self, n, r, cx, cy):
    self.n = n
    self.r = r
    self.cx = cx
    self.cy = cy
    self.outline = pu.create_circ_points(n, r, cx, cy)
    self.pupil = svgwrite.shapes.Circle(center=(cx*noise.rN(),cy*noise.rN()), 
      r=(noise.rN()*r/5), fill=noise.rC(), opacity=0.7, stroke=noise.rC(), stroke_width=noise.rI(1,3))

  def translate(self, tx, ty=None):
    if ty is not None:
      self.outline.translate(tx, ty)
      self.pupil.translate(tx, ty)
    else:
      self.outline.translate(tx)  
      self.pupil.translate(tx)

  def scale(self, sx, sy=None):
    if ty is not None:
      self.outline.scale(sx, sy)
      self.pupil.scale(sx, sy)
    else:
      self.outline.scale(sx)  
      self.pupil.scale(sx)

  def __str__(self):
    title = "\n--- EYE ---\n"
    num_points = "%d points.\n" % (self.n)
    radius = "Radius: %d\n" % (self.r)
    center = "cx is %d, cy is %d\n" % (self.cx, self.cy)
    pupil = "Pupil attributes are: \n%s" % (self.pupil.tostring())
    return title + num_points + radius + center + pupil

