#!/usr/bin/env python
import os
import unittest

from config import basedir
from app import app, db
from app.models import Cartoon

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test.db')
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_xml(self):
        c = Cartoon(xml='<div>TestXML</div>')
        xml = c.xml
        expected = '<div>TestXML</div>'
        assert xml[0:len(expected)] == expected


if __name__ == '__main__':
    unittest.main()