import svgwrite
import path_utilities as pu
import noise
import random, math


class Mouth:
    def __init__(self, head):
        self.head = head
        self.fill = 'white'
        self.types = [self.curve(),
            self.slant(),
            self.circle()] 
        self.shape_type = noise.rI(0,2)
        self.outline = self.types[self.shape_type]
        self.elements = [self.outline]

    def slant(self):
        start_x = self.head.cx
        start_y = self.head.cy + (.5 * self.head.r)
        end_x = start_x + (.4 * self.head.r)
        end_y = start_y - (.2 * self.head.r)

        if self.head.shape_type == 1:
            start_y -= (self.head.r * .3)
            end_x -= (self.head.r * .1)
            end_y -= (self.head.r * .3)
            
        path = svgwrite.path.Path('M %d,%d' % (start_x, start_y))
        path.push('L %d,%d' % (end_x, end_y))
        path.fill('grey').stroke('grey', width='1')
        return path

    def circle(self):
        mr = self.head.r / 10
        mcx = self.head.cx
        mcy = self.head.cy + (.5 * self.head.r)

        if self.head.shape_type == 1:
            mcy -= (self.head.r * .35)

        path = pu.create_circ_points(self.head.n, mr, mcx, mcy)
        path.fill(self.fill, opacity=0.3).stroke('grey', width='1')
        return path

    def curve(self):
        start_x = self.head.cx
        start_y = self.head.cy + (.5 * self.head.r)
        end_x = start_x + (.4 * self.head.r)
        end_y = start_y - (.2 * self.head.r)
        cx1 = start_x + 10
        cy1 = start_y + 10
        cx2 = cx1 + 40
        cy2 = cy1 + 40

        if self.head.shape_type == 1:
            start_y -= (self.head.r * .3)
            end_y -= (self.head.r * .3)
            cy1 -= (self.head.r * .3)
            cy2 -= (self.head.r * .3)

        path = svgwrite.path.Path('M %d,%d' % (start_x, start_y))
        path.push('C %d,%d %d,%d %d,%d' % (cx1, cy1, cx2, cy2, end_x, end_y))
        path.fill(self.fill, opacity=0.3).stroke('grey', width='1')
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
        title = "\n--- MOUTH ---\n"
        return title