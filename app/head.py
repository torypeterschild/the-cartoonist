import svgwrite
import path_utilities as pu
import noise
import random, math

class Head:
  def __init__(self, n, r, cx, cy):
    self.n = n
    self.r = r
    self.cx = cx
    self.cy = cy
    self.shape_id = random.choice([0,1,2])
    self.outline = pu.create_circ_points(n, r, cx, cy)
    if self.shape_id is 0:
      self.outline = pu.create_misshapen_head(n, r, cx, cy)
    elif self.shape_id is 1:
      self.outline = pu.create_misshapen_head_x(n, r, cx, cy)
    elif self.shape_id is 2:
      self.outline = pu.create_spiky_head(n, r, cx, cy)
    # elif self.shape_id is 3:
    #   self.outline = pu.create_fuzzy_head(n, r, cx, cy)

  def make_hair(self):
    path = svgwrite.path.Path()
    # path.fill('grey',opacity=0.7)
    s = (2 * math.pi)/self.n
    for i in range(self.n):
      a = s * i
      ad = math.degrees(a)
      xp = self.cx + self.r * math.cos(a)
      yp = self.cy + self.r * math.sin(a)
      # if a > math.pi*(7/4):
      if 240 < ad < 300:
        dx = xp
        dy = yp - 30 * noise.rI(1,8)
        path.push('M %d,%d' % (xp,yp))
        # path.push('L %d,%d' % (dx,dy))
        path.push('M %d,%d' % (xp-5,yp))
        # path.push('L %d,%d' % (dx-5,dy))
        path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
    # path.push('L %d,%d' % (cx+rx,cy))
    path.fill('blue',opacity=0.7).stroke('grey')
    return path

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