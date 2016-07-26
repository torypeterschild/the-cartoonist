import svgwrite
import path_utilities as pu
import noise
import math, random, copy


class Eyeball:
    def __init__(self, n=None, r=None, cx=None, cy=None, R=False, left=None):
        if R is False:
            self.n = n
            self.cx = cx
            self.cy = cy
            self.rx = r*noise.rN(0.7,1.1)
            self.ry = r*noise.rN(0.7,1.3)
            self.a_min = noise.rI(180, 270)
            self.a_max = noise.rI(270, 360)
            self.length = self.a_max - self.a_min
            self.outline = svgwrite.shapes.Ellipse(
                center=(self.cx,self.cy),
                r=(self.rx, self.ry), fill='white', 
                opacity=0.4, stroke=noise.rC(), 
                stroke_width=noise.rI(1,3))
            self.pupil = svgwrite.shapes.Circle(
                center=(
                    self.cx+noise.rN(-.5,.5)*self.rx,
                    self.cy+noise.rN(.1,.5)*self.ry), r=(noise.rN()*self.rx/5), 
                fill=noise.rC(), opacity=0.4, 
                stroke=noise.rC(), 
                stroke_width=noise.rI(1,3))
            self.side = "L"
        elif R is True:
            self.side = "R"
            self.n = left.n
            self.outline = copy.deepcopy(left.outline)
            self.a_max = 360 - (left.a_min - 180)
            self.a_min = self.a_max - left.length
            self.pupil = copy.deepcopy(left.pupil)
            self.cx = left.outline['cx']
            self.cy = left.outline['cy']
            self.rx = left.outline['rx']
            self.ry = left.outline['ry']

    def make_triangle_lashes(self):
        lash_path = svgwrite.path.Path('M')
        lash_path.fill('none',opacity=0.4).stroke("grey",width="1")
        s = (2 * math.pi)/self.n
        for i in range(self.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.cx + self.rx * math.cos(a)
            yp = self.cy + self.ry * math.sin(a)
            if self.a_min < ad < self.a_max:
                dx = xp
                dy = yp - 10
                lash_path.push('%d,%d' % (xp,yp))
                lash_path.push('L %d,%d' % (xp,yp))
                lash_path.push('L %d,%d' % (dx,dy))
        return lash_path

    def make_wild_lashes(self):
        lash_path = svgwrite.path.Path('M %d,%d' % (self.cx-self.rx,self.cy))
        lash_path.fill('none',opacity=0.7).stroke("grey",width="1")
        s = (2 * math.pi)/self.n
        for i in range(self.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.cx + self.rx * math.cos(a)
            yp = self.cy + self.ry * math.sin(a)
            if self.a_min < ad < self.a_max:
                dx = xp + noise.rI(3,10)
                dy = yp - noise.rI(3,15)
                if self.side is "L":
                    dx = xp - noise.rI(3,10)
                lash_path.push('M %d,%d' % (xp,yp))
                lash_path.push('L %d,%d' % (dx,dy))
        return lash_path

    def make_straight_lashes(self):
        lash_path = svgwrite.path.Path('M %d,%d' % (self.cx-self.rx,self.cy))
        lash_path.fill('none',opacity=0.4).stroke("grey",width="1")
        s = (2 * math.pi)/self.n
        for i in range(self.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.cx + self.rx * math.cos(a)
            yp = self.cy + self.ry * math.sin(a)
            if self.a_min < ad < self.a_max:
                dx = xp
                dy = yp - 10
                lash_path.push('M %d,%d' % (xp,yp))
                lash_path.push('L %d,%d' % (dx,dy))
        return lash_path

    def make_lids_only(self, color):
        f = noise.rC()
        path = svgwrite.path.Path('M')
        s = (2 * math.pi)/self.n
        for i in range(self.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.cx + self.rx * math.cos(a)
            yp = self.cy + self.ry * math.sin(a)
            if self.a_min < ad < self.a_max:
                path.push('%d,%d' % (xp,yp))
                path.push('L %d,%d' % (xp,yp))
        path.fill(color,opacity=0.7)
        return path

    def translate(self, tx, ty=None):
        if ty is not None:
            self.outline.translate(tx, ty)
            self.pupil.translate(tx, ty)
        else:
            self.outline.translate(tx)
            self.pupil.translate(tx)

    def scale(self, sx, sy=None):
        if sy is not None:
            self.outline.scale(sx, sy)
            self.pupil.scale(sx, sy)
        else:
            self.outline.scale(sx)
            self.pupil.scale(sx)

    def __str__(self):
        title = "\n--- %s EYEBALL ---\n" % self.side
        side = "Side: %s\n" % self.side
        numbers = "cx is %d.\ncy is %d.\nrx is %d.\nry is %d\n." % (self.cx, 
            self.cy, self.rx, self.ry)
        return title + side + numbers


class Eyes:
    def __init__(self, head):
        self.head = head
        self.eye_radius = 20*noise.rN(2.0,3.0)
        self.cx = self.head.cx - .25*self.head.r
        self.cy = self.head.cy - .25*self.head.r
        self.left = Eyeball(self.head.n/2, self.eye_radius, 
            self.cx, self.cy)
        self.right = Eyeball(R=True,left=self.left)
        self.right.translate(0.5*self.head.r)
        self.lashes = random.random() > 0.3
        self.lash_type = noise.rI(0,2)
        self.lids = random.random() > 0.3
        self.elements = [self.left.outline, self.left.pupil, self.right.outline,
            self.right.pupil]
        self.eyeballs = [self.left, self.right]
        self.lid_color = noise.rC()

    def create(self):
        for e in self.eyeballs:
            lash_funcs = [e.make_straight_lashes(),e.make_wild_lashes(),e.make_triangle_lashes()]
            if self.lashes:
                lash = lash_funcs[self.lash_type]
                if e.side is "R":
                    lash.translate(0.5*self.head.r)
                self.elements.append(lash)
            if self.lids:
                lid = e.make_lids_only(self.lid_color)
                if e.side is "R":
                    lid.translate(0.5*self.head.r)
                self.elements.append(lid)

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
        title = "\n--- EYES ---\n"
        radius = "Radius: %d\n" % (self.eye_radius)
        center = "cx is %d, cy is %d\n" % (self.cx, self.cy)
        lashes = "Lashes: %s\n" % self.lashes
        lids = "Lids: %s\n" % self.lids
        return title + radius + center + lashes + lids + self.left.__str__() + self.right.__str__()

