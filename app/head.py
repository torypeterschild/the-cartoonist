import svgwrite
import path_utilities as pu
import noise, mouth, nose, eye, hair
import random, math

class Head:
    def __init__(self, n, r, cx, cy):
        self.n = n
        self.r = r
        self.cx = cx
        self.cy = cy
        self.shape_id = random.choice([0,1,2])
        self.hair = random.random() > 0.3
        self.mouth = random.random() > 0.5
        self.nose = random.random() > 0.3
        self.eyes = eye.Eyes(self)
        self.eyes.create()
        self.types = [pu.create_asym_blob(n, r, cx, cy), 
            pu.create_misshapen_head(n, r, cx, cy),
            pu.create_misshapen_head_x(n, r, cx, cy),
            pu.create_rect_head(n, r, cx, cy),
            pu.create_ellipse(n, r, cx, cy)]
        self.shape_type = noise.rI(0,4)
        self.outline, self.rx, self.ry = self.types[self.shape_type]
        # self.outline = self.info[0]
        self.elements = [self.outline]
        if self.hair:
            h = hair.Hair(self)
            self.elements.append(h.outline)
        if self.mouth:
            m = mouth.Mouth(self)
            self.elements.append(m.outline)
        if self.nose:
            no = nose.Nose(self)
            for e in no.elements:
                self.elements.append(e)
        for elem in self.eyes.elements:
            self.elements.append(elem)

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
        shape = "Shape is type %s: %s\n" % (
            self.shape_type, 
            self.types[self.shape_type].__class__.__name__)
        hair = "Hair: %s\n" % self.hair
        eyes = self.eyes.__str__()
        return title + num_points + radius + center + shape + hair + eyes