from app import db

class Cartoon(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    xml = db.Column(db.Text, index=True, unique=False)

    def __init__(self, xml):
        self.xml = xml

    def __repr__(self):
        return "<Cartoon %r>" % (self.xml)