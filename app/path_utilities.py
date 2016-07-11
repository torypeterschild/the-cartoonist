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
  cy: y coordinate for center of circle 
"""
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


""" 
  PAC MAN SHAPE
  TODO: update to create path object instead of string
"""
def create_pacman_head(n, r, cx, cy):
  points = ['M']
  s = (2 * math.pi)/n
  for i in range(n):
    if i == n/2:
      dx = cx + r * .35
      dy = cy - r * math.sin(s)
      dp = (dx, dy)
      points.append(dp)
    a = s * i
    new_x = cx + r * math.cos(a)
    new_y = cy + r * math.sin(a) * noise.rN()
    p = (new_x, new_y)
    points.append(p)
  d = get_d_string(points)
  return d


""" 
  HEAD WITH LITTLE SPIKES 
"""
def create_spiky_head(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.3).stroke("grey",width="1")
  s = (2 * math.pi)/n
  rr = r
  for i in range(n):
    a = s * i
    # NOTE: use these numbers for home page, use -10,5 or -10,15 for real drawings
    rr = rr + noise.rI(-1,1)
    new_x = cx + rr * math.cos(a)
    new_y = cy + rr * noise.rN() * math.sin(a)
    p = (new_x, new_y)
    path.push('L %d,%d' % (new_x,new_y))
    path.push("S %d,%d %d,%d " % (new_x*noise.rN(),new_y*noise.rN(),new_x,new_y))
  return path

""" 
  MISSHAPEN HEAD WITH LITTLE SPIKES 
"""
def create_misshapen_head(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.3).stroke("grey",width="1")
  s = (2 * math.pi)/n
  rr = r
  for i in range(n):
    a = s * i
    # NOTE: use these numbers for home page, use -10,5 or -10,15 for real drawings
    rr = rr + noise.rI(-5,5)
    new_x = cx + rr * math.cos(a)
    new_y = cy + rr * noise.rN() * math.sin(a)
    if a > 0 and a < math.pi:
      new_y -= math.sin(a) * (r * 0.6)
    p = (new_x, new_y)
    path.push('L %d,%d' % (new_x,new_y))
    path.push("S %d,%d %d,%d " % (new_x*noise.rN(),new_y*noise.rN(),new_x,new_y))
  return path

""" 
  MISSHAPEN HEAD ON X AXIS WITH LITTLE SPIKES 
"""
def create_misshapen_head_x(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.3).stroke("grey",width="1")
  s = (2 * math.pi)/n
  rr = r
  for i in range(n):
    a = s * i
    # NOTE: use these numbers for home page, use -10,5 or -10,15 for real drawings
    rr = rr + noise.rI(-5,5)
    new_x = cx + r * math.cos(a)
    new_y = cy + r * noise.rN() * math.sin(a)
    if a > math.pi*noise.rN() and a < math.pi*2*noise.rN():
      new_x -= math.cos(a) * (r * 0.6)
    p = (new_x, new_y)
    # path.push('L %d,%d' % (new_x,new_y))
    path.push("S %d,%d %d,%d " % (new_x*noise.rN(),new_y*noise.rN(),new_x,new_y))
  return path

"""
  FUZZY CIRCLE
"""
def create_fuzzy_head(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.5).stroke("grey",width="3")
  s = (2 * math.pi)/n
  for i in range(n):
    a = s * i
    if i == n/2:
      dx = cx + r * math.cos(a)
      dy = cy - r * math.sin(a)
      path.push("S %d,%d %d,%d " % (dx,dy,dx*noise.rN(),dy*noise.rN()))
    new_x = cx + r * math.cos(a)
    new_y = cy + r * noise.rN() * math.sin(a)
    path.push("S %d,%d %d,%d " % (new_x*noise.rN(),new_y*noise.rN(),new_x,new_y))
  return path

