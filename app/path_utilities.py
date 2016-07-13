import random, sys, os, copy, math
import caption, noise
import svgwrite
from svgwrite.text import TSpan


""" 
  Create circle path without noise
  n: number of points
  r: radius
  cx: x coordinate for center of circle
  cy: y coordinate for center of circle 
"""
def create_circ_points(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.4).stroke(noise.rC(),width=noise.rI(0,3))
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
  path.fill(noise.rC(),opacity=0.2).stroke("grey",width="1")
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
  path.fill(noise.rC(),opacity=0.2).stroke("grey",width="1")
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
  path.fill(noise.rC(),opacity=0.2).stroke("grey",width="1")
  s = (2 * math.pi)/n
  rr = r
  for i in range(n):
    a = s * i
    # NOTE: use these numbers for home page, use -10,5 or -10,15 for real drawings
    rr = rr + noise.rI(-5,5)
    new_x = cx + r * math.cos(a)
    new_y = cy + r * noise.rN() * math.sin(a)
    if a > math.pi*noise.rN() and a < math.pi*2*noise.rN():
      new_x -= math.cos(a) * (r * 0.2)
      new_y -= math.sin(a) * (r * 0.3)
    p = (new_x, new_y)
    path.push('L %d,%d' % (new_x,new_y))
    path.push("S %d,%d %d,%d " % (new_x*noise.rN(),new_y*noise.rN(),new_x,new_y))
  return path

"""
  FUZZY CIRCLE
"""
def create_fuzzy_head(n, r, cx, cy):
  path = svgwrite.path.Path('M %d,%d' % (cx+r,cy))
  path.fill(noise.rC(),opacity=0.2).stroke("grey",width="1")
  s = (2 * math.pi)/n
  for i in range(n):
    a = s * i
    if math.pi*(3/2) < a:
      print("\nTRUEEEEE")
      dx = cx + .4*noise.rN()*a*r * math.cos(a)
      dy = cy - .3*noise.rN()*a*r - math.sin(a)
      path.push('L %d,%d' % (dx,dy))
      # path.push("S %d,%d %d,%d " % (dx,dy,dx*noise.rN(),dy*noise.rN()))
    print("IN FUZZY HEAD")
    new_x = cx + r*.7 * math.cos(a)
    new_y = cy + r*.8 * math.sin(a)
    path.push('L %d,%d' % (new_x,new_y))
    # path.push("S %d,%d %d,%d " % (new_x*noise.rN(),new_y*noise.rN(),new_x,new_y))
  return path


"""
  TOAST PATH
"""
# def create_path():
#   d = ('M', Q0_X, Q0_Y)
#   path = self.paper.path(d=d, fill=rC(), opacity=0.3, stroke='orange', stroke_width='3')
#   path.push("S%d,%d %d,%d" % (X_MAX,Y_MIN,Q1_X,Q1_Y))
#   path.push("C%d,%d %d,%d %d,%d" % (X_MAX*rN(),Y_MAX*rN(),X_MAX*rN(),Y_MAX*rN(),Q2_X*rN(),Q2_Y*rN()))
#   path.push("C%d,%d %d,%d %d,%d" % (X_MIN*rN(),Y_MAX*rN(),X_MIN*rN(),Y_MAX*rN(),Q3_X*rN(),Q3_Y*rN()))
#   path.push("C%d,%d %d,%d %d,%d" % (X_MIN*rN(),Y_MIN*rN(),X_MIN*rN(),Y_MIN*rN(),Q0_X,Q0_Y))
#   print("\nCOMMANDS\n")
#   print(path.commands)
#   return path
