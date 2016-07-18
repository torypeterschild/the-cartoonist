import svgwrite
import path_utilities as pu
import noise
import random, math

class Hair:
    def __init__(self, head):
        self.head = head
        self.fill = random.choice(['none', noise.rC()])
        self.elements = []
        # self.rx = self.head.outline['rx']
        # self.ry = self.head.outline['ry']
        self.shape_type = noise.rI(0,2)
        if self.shape_type == 0:
            self.outline = self.make_tube_hair()
        elif self.shape_type == 1:
            self.outline = self.make_line_hair()
        elif self.shape_type == 2:
            self.outline = self.make_triangle_hair()

    def make_tube_hair(self):
        path = svgwrite.path.Path()
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.r * math.cos(a)
            xp1 = self.head.cx + self.head.r
            yp = self.head.cy + self.head.r * math.sin(a)
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
        path.fill(noise.rC(), opacity=0.7).stroke('grey')
        return path

    def make_line_hair(self):
        path = svgwrite.path.Path()
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.r * math.cos(a)
            yp = self.head.cy + self.head.r * math.sin(a)
            path.push('M %d,%d' % (xp,yp))
            hair_width = noise.rI(10,30)
            if (270-hair_width) < ad < (270+hair_width):
                dx = xp + 0.2
                dy = yp - 20 * noise.rI(1,3)
                path.push('L %d,%d' % (xp+1,dy))
                path.push('L %d,%d' % (dx,dy))
                path.push('L %d,%d' % (xp+1,dy))
                path.push('L %d,%d' % (dx,dy))
                # path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
                # path.push('M %d,%d' % (xp,yp))
                # path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
        path.fill('black',opacity=0.7).stroke('grey')
        return path

    def make_triangle_hair(self):
        path = svgwrite.path.Path('M')
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.r * math.cos(a)
            yp = self.head.cy + self.head.r * math.sin(a)
            hair_width = noise.rI(10,30)
            if (270-hair_width) < ad < (270+hair_width):
                dx = xp
                dy = yp - 30 * noise.rI(1,3)
                path.push('%d,%d' % (xp,yp))
                path.push('L %d,%d' % (xp,yp))
                # path.push('L %d,%d' % (xp,yp))
                path.push('L %d,%d' % (dx,dy))
                # path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
                # path.push('M %d,%d' % (xp,yp))
                # path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
        path.fill('grey',opacity=0.7).stroke('orange', width='3')
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
        title = "\n--- HAIR ---\n"
        return title