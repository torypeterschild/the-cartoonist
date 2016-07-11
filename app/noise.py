import random, sys, os, json, re
import numpy as np

""" 
  Generate noise array to add to original array
  pure_array: array with no noise
  n: level of noise (usually between 1 and 10)
"""
def generate_noise_array(pure_array, n):
  noise = np.random.normal(0, n, len(pure_array))
  return noise


def get_noisy_path_str(pure_ps):
  obj = svg_utils.svgObject(pure_ps)
  noisy_ps = obj.make_noisy_path_str()
  return noisy_ps


def rN():
  return random.uniform(0.95,1.05)


def rNUnit():
  return random.uniform(0.5, 1.0)


def rC():
  r = lambda: random.randint(0,255)
  return "#%02X%02X%02X" % (r(),r(),r())


def rI(a,b):
  return random.randint(a,b)


def rS():
  sc = [1, random.uniform(0.5,1.05)]
  return random.choice(sc)