import random, sys, os
import svg_utils
import shapes, caption
import svgwrite
from svgwrite.text import TSpan
import copy
import math
import noise


""" 
  Create circle path without noise
  n: number of points
  r: radius
  cx: x coordinate for center of circle
  cy: y coordinate for center of circle """
def create_circ_points(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.4).stroke(noise.rC(),width="3")
  s = (2 * math.pi)/n
  for i in range(n):
    a = s * i
    new_x = cx + r * math.cos(a)
    new_y = cy + r * math.sin(a)
    path.push(" %d,%d" % (new_x, new_y))
  return path