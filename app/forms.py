from flask_wtf import Form
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class InputForm(Form):
    keyword = StringField("keyword", validators=[DataRequired()])


class SaveForm(Form):
    save = SubmitField("save")
