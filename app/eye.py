import svgwrite
import path_utilities as pu
import noise
import math


class Eye:
  def __init__(self, n, r, cx, cy):
    self.n = n
    self.r = r
    self.cx = cx
    self.cy = cy
    self.rx = r*noise.rN(0.7,1.1)
    self.ry = r*noise.rN(0.7,1.3)
    self.outline = pu.create_circ_points(n, r, cx, cy)
    self.outline_e = svgwrite.shapes.Ellipse(center=(cx*noise.rN(),cy*noise.rN()),
      r=(self.rx, self.ry), fill=noise.rC(), opacity=0.7, 
      stroke=noise.rC(), stroke_width=noise.rI(1,3))
    self.pupil = svgwrite.shapes.Circle(center=(cx+noise.rN(-.5,.5)*self.rx,cy+noise.rN(.1,.5)*self.ry), 
      r=(noise.rN()*self.rx/5), fill=noise.rC(), opacity=0.7, stroke=noise.rC(), 
      stroke_width=noise.rI(1,3))

  def make_wild_lashes(self):
    cx = self.outline_e['cx']
    cy = self.outline_e['cy']
    rx = self.outline_e['rx']
    ry = self.outline_e['ry']
    lash_path = svgwrite.path.Path('M %d,%d' % (cx-rx,cy))
    lash_path.fill('none',opacity=0.7).stroke("grey",width="1")
    s = (2 * math.pi)/self.n
    for i in range(self.n):
      a = s * i
      xp = cx + rx * math.cos(a)
      yp = cy + ry * math.sin(a)
      if a > math.pi*(5/4):
        dx = xp
        dy = yp - noise.rI(1,15)
        lash_path.push('M %d,%d' % (xp,yp))
        lash_path.push('L %d,%d' % (dx,dy))
    return lash_path

  def make_lids_only(self):
    cx = self.outline_e['cx']
    cy = self.outline_e['cy']
    rx = self.outline_e['rx']
    ry = self.outline_e['ry']
    # path = svgwrite.path.Path('M %d,%d' % (cx+rx,cy))
    path = svgwrite.path.Path('M')
    # path.fill('grey',opacity=0.7)
    s = (2 * math.pi)/self.n
    for i in range(self.n):
      a = s * i
      xp = cx + rx * math.cos(a)
      yp = cy + ry * math.sin(a)
      if a > math.pi*(7/4):
        path.push('%d,%d' % (xp,yp))
        path.push('L %d,%d' % (xp,yp))
    # path.push('L %d,%d' % (cx+rx,cy))
    path.fill('grey',opacity=0.7)
    return path

  def make_straight_lashes(self):
    cx = self.outline_e['cx']
    cy = self.outline_e['cy']
    rx = self.outline_e['rx']
    ry = self.outline_e['ry']
    path = svgwrite.path.Path('M %d,%d' % (cx+rx,cy))
    path.fill('grey')
    lash_path = svgwrite.path.Path('M %d,%d' % (cx-rx,cy))
    lash_path.fill('none',opacity=0.4).stroke("grey",width="1")
    s = (2 * math.pi)/self.n
    for i in range(self.n):
      a = s * i
      xp = cx + rx * math.cos(a)
      yp = cy + ry * math.sin(a)
      path.push('L %d,%d' % (xp,yp))
      if a > math.pi*(5/4):
        dx = xp
        dy = yp - 10
        lash_path.push('M %d,%d' % (xp,yp))
        lash_path.push('L %d,%d' % (dx,dy))
    path.push('L %d,%d' % (cx+rx,cy))
    return lash_path

  def make_lids_and_lashes(self):
    cx = self.outline_e['cx']
    cy = self.outline_e['cy']
    rx = self.outline_e['rx']
    ry = self.outline_e['ry']
    path = svgwrite.path.Path('M %d,%d' % (cx+rx,cy))
    path.fill('grey')
    lash_path = svgwrite.path.Path('M %d,%d' % (cx-rx,cy))
    lash_path.fill('none',opacity=0.4).stroke("grey",width="1")
    s = (2 * math.pi)/self.n
    for i in range(self.n):
      a = s * i
      xp = cx + rx * math.cos(a)
      yp = cy + ry * math.sin(a)
      path.push('L %d,%d' % (xp,yp))
      if a > math.pi*(5/4):
        dx = xp
        dy = yp - 10
        lash_path.push('L %d,%d' % (xp,yp))
        lash_path.push('L %d,%d' % (dx,dy))
    path.push('L %d,%d' % (cx+rx,cy))
    return lash_path

  def translate(self, tx, ty=None):
    if ty is not None:
      self.outline.translate(tx, ty)
      self.outline_e.translate(tx, ty)
      self.pupil.translate(tx, ty)
    else:
      self.outline.translate(tx)
      self.outline_e.translate(tx) 
      self.pupil.translate(tx)

  def scale(self, sx, sy=None):
    if ty is not None:
      self.outline.scale(sx, sy)
      self.outline_e.scale(sx, sy)
      self.pupil.scale(sx, sy)
    else:
      self.outline.scale(sx)
      self.outline_e.scale(sx) 
      self.pupil.scale(sx)

  def __str__(self):
    title = "\n--- EYE ---\n"
    num_points = "%d points.\n" % (self.n)
    radius = "Radius: %d\n" % (self.r)
    center = "cx is %d, cy is %d\n" % (self.cx, self.cy)
    pupil = "Pupil attributes are: \n%s" % (self.pupil.tostring())
    return title + num_points + radius + center + pupil

