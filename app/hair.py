import svgwrite
import path_utilities as pu
import noise
import random, math

class Hair:
    def __init__(self, head):
        self.head = head
        self.fill = random.choice(['none', noise.rC()])
        self.elements = []
        self.shape_type = noise.rI(0,3)
        if self.shape_type == 0:
            self.outline = self.make_tube_hair()
        elif self.shape_type == 1:
            self.outline = self.make_line_hair()
        elif self.shape_type == 2:
            self.outline = self.make_triangle_hair()
        elif self.shape_type == 3:
            self.outline = self.make_slanty_line_hair()

    def make_tube_hair(self):
        path = svgwrite.path.Path()
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.rx * math.cos(a)
            yp = self.head.cy + self.head.ry * math.sin(a)
            if self.head.shape_type == 0:
                xp = self.head.cx + self.head.rx * math.cos(a) - i*.5
                yp = self.head.cy + self.head.ry * math.sin(a) + i*.5
            hair_width = noise.rI(10,30)
            if (270-hair_width) < ad < (270+hair_width):
                dx = xp
                dy = yp - 20 * noise.rI(1,5)
                if self.head.shape_type == 2:
                    xp -= math.cos(a) * (self.head.r * 0.2)
                    yp -= math.sin(a) * (self.head.r * 0.3)
                path.push('M %d,%d' % (xp,yp))
                path.push('L %d,%d' % (dx,dy))
                path.push('M %d,%d' % (xp-5,yp))
                path.push('L %d,%d' % (dx-5,dy))
                path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
                path.push('M %d,%d' % (xp,yp))
                path.push("S %d,%d %d,%d " % (dx*noise.rN(),dy*noise.rN(),dx,dy))
        path.fill(noise.rC(), opacity=0.7).stroke('grey')
        return path

    def make_slanty_line_hair(self):
        path = svgwrite.path.Path()
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.rx * math.cos(a)
            yp = self.head.cy + self.head.ry * math.sin(a)
            if self.head.shape_type == 0:
                xp = self.head.cx + self.head.rx * math.cos(a) - i*.5
                yp = self.head.cy + self.head.ry * math.sin(a) + i*.5
            elif self.head.shape_type == 2:
                xp -= math.cos(a) * (self.head.r * 0.2)
                yp -= math.sin(a) * (self.head.r * 0.3)
            path.push('M %d,%d' % (xp,yp))
            hair_width = noise.rI(10,30)
            if (270-hair_width) < ad < (270+hair_width):
                dx = xp * noise.rN()
                dy = yp - 20 * noise.rI(1,5)
                if self.head.shape_type == 2:
                    xp -= math.cos(a) * (self.head.r * 0.2)
                    yp -= math.sin(a) * (self.head.r * 0.3)
                path.push('L %d,%d' % (dx,dy))
        path.fill('none',opacity=0.7).stroke(noise.rC())
        return path

    def make_line_hair(self):
        path = svgwrite.path.Path()
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.rx * math.cos(a)
            yp = self.head.cy + self.head.ry * math.sin(a)
            if self.head.shape_type == 0:
                xp = self.head.cx + self.head.rx * math.cos(a) - i*.5
                yp = self.head.cy + self.head.ry * math.sin(a) + i*.5
            elif self.head.shape_type == 2:
                xp -= math.cos(a) * (self.head.r * 0.2)
                yp -= math.sin(a) * (self.head.r * 0.3)
            path.push('M %d,%d' % (xp,yp))
            hair_width = noise.rI(10,30)
            if (270-hair_width) < ad < (270+hair_width):
                dx = xp
                dy = yp - 20 * noise.rI(1,5)
                if self.head.shape_type == 2:
                    xp -= math.cos(a) * (self.head.r * 0.2)
                    yp -= math.sin(a) * (self.head.r * 0.3)
                path.push('L %d,%d' % (xp+1,dy))
                path.push('L %d,%d' % (dx,dy))
                path.push('L %d,%d' % (xp+1,dy))
                path.push('L %d,%d' % (dx,dy))
        path.fill('none',opacity=0.7).stroke(noise.rC())
        return path

    def make_triangle_hair(self):
        path = svgwrite.path.Path('M')
        s = (2 * math.pi)/self.head.n
        for i in range(self.head.n):
            a = s * i
            ad = math.degrees(a)
            xp = self.head.cx + self.head.rx * math.cos(a)
            yp = self.head.cy + self.head.ry * math.sin(a)
            if self.head.shape_type == 0:
                xp = self.head.cx + self.head.rx * math.cos(a) - i*.5
                yp = self.head.cy + self.head.ry * math.sin(a) + i*.5
            hair_width = noise.rI(10,30)
            if (270-hair_width) < ad < (270+hair_width):
                dx = xp * noise.rN()
                dy = yp - 30
                if self.head.shape_type == 2:
                    xp -= math.cos(a) * (self.head.r * 0.2)
                    yp -= math.sin(a) * (self.head.r * 0.3)
                path.push('%d,%d' % (xp,yp))
                path.push('L %d,%d' % (xp,yp))
                path.push('L %d,%d' % (dx,dy))
                path.push('M %d,%d' % (xp,yp))
        path.fill(noise.rC(),opacity=0.7).stroke('orange', width='3')
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