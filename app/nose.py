import svgwrite
import path_utilities as pu
import noise
import random, math

class Nose:
  def __init__(self, head):
    self.head = head
    self.fill = random.choice(['none', noise.rC()])
    self.types = [] 
    self.shape_type = noise.rI(0,2)
    # self.outline = self.types[self.shape_type]
    self.elements = []
    self.outline = self.nostrils()

  def nostrils(self):
    cx1 = self.head.cx-10
    cx2 = self.head.cx+10
    cy1 = self.head.cy+10
    cy2 = self.head.cy+10
    nr = mr = self.head.r / 50
    n1 = pu.create_circ_points(self.head.n, nr, cx1, cy1)
    n2 = pu.create_circ_points(self.head.n, nr, cx2, cy2)
    n1.fill('grey').stroke('grey', width='1')
    n2.fill('grey').stroke('grey', width='1')
    self.elements.append(n1)
    self.elements.append(n2)
    return n1, n2

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
    title = "\n--- NOSE ---\n"
    return title