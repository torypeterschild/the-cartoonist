from flask_wtf import Form
from wtforms import StringField, BooleanField, SubmitField, HiddenField
from wtforms.validators import DataRequired


class InputForm(Form):
    keyword = StringField("keyword", validators=[DataRequired()])


class SaveForm(Form):
    svg_id = HiddenField("svg_id")
    svg_data = HiddenField("svg_data")
    save = SubmitField("save")
