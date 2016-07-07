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