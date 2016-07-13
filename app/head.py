import svgwrite
import path_utilities as pu
import noise, mouth, nose, eye
import random, math

class Head:
  def __init__(self, n, r, cx, cy):
    self.n = n
    self.r = r
    self.cx = cx
    self.cy = cy
    self.shape_id = random.choice([0,1,2])
    self.hair = random.random() > 0.5
    self.mouth = random.random() > 0.5
    self.nose = random.random() > 0.5
    self.eyes = eye.Eyes(self)
    self.eyes.create()
    self.types = [pu.create_asym_blob(n, r, cx, cy), 
      pu.create_misshapen_head(n, r, cx, cy),
      pu.create_misshapen_head_x(n, r, cx, cy), 
      pu.create_spiky_head(n, r, cx, cy)]
    self.shape_type = noise.rI(0,3)
    self.outline = self.types[self.shape_type]
    self.elements = [self.outline]
    if self.hair:
      h = self.make_hair()
      self.elements.append(h)
    if self.mouth:
      m = mouth.Mouth(self)
      self.elements.append(m.outline)
    if self.nose:
      no = nose.Nose(self)
      for e in no.elements:
        e.translate(20)
        self.elements.append(e)
    for elem in self.eyes.elements:
      self.elements.append(elem)

  def make_hair(self):
    path = svgwrite.path.Path()
    s = (2 * math.pi)/self.n
    for i in range(self.n):
      a = s * i
      ad = math.degrees(a)
      xp = self.cx + self.r * math.cos(a)
      xp1 = self.cx + self.r
      yp = self.cy + self.r * math.sin(a)
      hair_width = noise.rI(10,30)
      if (270-hair_width) < ad < (270+hair_width):
        dx = xp
        dy = yp - 20 * noise.rI(1,5)
        path.push('M %d,%d' % (xp,yp))
        path.push('L %d,%d' % (dx,dy))
        path.push('M %d,%d' % (xp-5,yp))
        path.push('L %d,%d' % (dx-5,dy))
        path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
        path.push('M %d,%d' % (xp,yp))
        path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
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
    shape = "Shape is type %s: %s" % (self.shape_type, self.types[self.shape_type].__class__.__name__)
    eyes = self.eyes.__str__()
    return title + num_points + radius + center + shape + eyes