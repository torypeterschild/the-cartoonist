from flask import render_template, flash, redirect, request, url_for
from app import app
from .forms import InputForm, SaveForm
from textblob import TextBlob
import random, sys, os, json, re
import numpy as np

cmd_re = re.compile("[a-z][^a-z]*")
num_re = re.compile("[+-]?\d+(\.\d+)?")
instr_re = re.compile("^[a-zA-Z]*")


class svgObject:
  def __init__(self, d):
    self.path_def = d
    self.commands = []

  def get_commands(self):
    self.commands = cmd_re.match(d)
    



""" Parse SVG path """
def parsePath():
  pass


""" Add noise """
def add_noise():
  pure = np.linspace(-1, 1, 100)
  noise = np.random.normal(0, 1, 100)
  signal = pure + noise

