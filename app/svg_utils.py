from flask import render_template, flash, redirect, request, url_for
from app import app
from .forms import InputForm, SaveForm
from textblob import TextBlob
import random, sys, os, json, re
import numpy as np

COMMANDS = set('MmZzLlHhVvCcSsQqTtAa')
INSTR_RE = re.compile("([MmZzLlHhVvCcSsQqTtAa])")
COMPLETE_COMMAND_RE = re.compile("([a-zA-Z][^a-zA-Z]*)")
FLOAT_RE = re.compile("[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?")

p = "M150 0 L75 200 L225 200 Z"
q = "M25,0 C60,0, 60,50, 25,50 C-10,50, -10,0, 25,0"
b = "M130 110 C 120 140, 180 140, 170 110"
a = "M30 80 A 30 80 0 0 1 162.55 162.45 Z"
test = "M158.45 362.672c-22.142-5.708-34.002-11.19-61.248-28.39-40.382-25.534-59.372-43.484-75.36-71.572C6.83 236.574.075 207.36 0 168.906c0-30.116 6.38-50.319 24.244-76.98 7.13-10.59 20.191-26.511 27.097-32.97 1.276-1.277 4.878-4.657 8.031-7.586 13.436-12.692 33.251-26.736 48.563-34.472C131.655 4.957 158-.75 185.171.15c18.315.526 29.8 3.155 43.085 9.839 28.147 14.194 52.466 39.954 67.778 71.873 13.136 27.187 18.615 55.576 19.74 101.314.376 15.246.226 19.827-.825 26.661-3.903 25.16-12.685 45.663-31.074 72.475-21.017 30.717-40.157 49.417-69.806 68.494-17.714 11.34-22.968 13.218-38.055 13.743-8.106.3-9.908.075-17.564-1.877zm30.55-6.985c2.326-.976 5.78-2.328 7.656-3.004 1.876-.676 5.254-2.779 7.506-4.656 2.552-2.103 5.704-3.906 8.181-4.582 9.007-2.703 35.278-25.685 49.164-43.109 22.293-27.938 36.028-53.473 41.358-76.605 3.753-16.823 4.578-29.215 3.452-52.947-1.876-38.303-7.13-63.237-18.39-86.443-14.71-30.342-40.306-56.628-67.628-69.47-20.116-9.464-46.537-11.341-75.885-5.558-11.709 2.403-20.116 5.257-32.35 11.34-18.315 9.013-34.152 20.654-51.341 37.852-17.113 17.048-28.523 32.22-37.68 50.019-10.208 20.052-13.36 34.547-13.36 61.434.075 34.622 4.803 57.679 16.963 82.688 12.835 26.511 31.375 47.99 56.295 65.415 16.288 11.415 46.311 27.187 61.323 32.219 4.279 1.427 12.16 3.38 17.489 4.43a2608.639 2608.639 0 0 0 11.259 2.179c4.578 1.051 11.86.45 15.988-1.202z"

""" HELPERS """
def generate_noise_array(pure_array):
  noise = np.random.normal(0, 5, len(pure_array))
  return noise

def get_string_from_list(li):
  return " ".join(li)

def inject_path(path_string):
  svg_start = '''
    <svg height="210" width="400" viewBox="0 0 316 365">
      <path stroke="red" stroke-width="3" fill="#afafaf" d="'''
  svg_end = '''"/>
    </svg>
    '''
  new_svg = svg_start + path_string + svg_end
  return new_svg  

""" END HELPERS """

class svgObject:

  def __init__(self, d):
    self.path_def = d
    self.commands = []
    self.pairs = []
    self.noisy_path = []

  def tokenize_path(self):
    for x in COMPLETE_COMMAND_RE.split(self.path_def):
      if x:
        self.commands.append(x)

  """ Get instruction, list_of_coords pairs """
  def get_pairs(self):
    instr = None
    floats = []
    coords_FL64 = []
    for item in self.commands:
      li = INSTR_RE.split(item)
      for i in li:
        if INSTR_RE.match(i):
          instr = i
        else:
          floats = np.array(FLOAT_RE.findall(i))
          coords_FL64 = floats.astype(np.float)
      self.pairs.append((instr, coords_FL64))    

  def add_noise_to_path(self):
    for index, item in enumerate(self.pairs):
      instr = item[0]
      coords_list = item[1]
      # noise = np.random.normal(0, 1, len(coords_list))
      noise = generate_noise_array(coords_list)
      alt = coords_list + noise
      alt_arrstr = np.char.mod('%f', alt)
      alt_str = " ".join(alt_arrstr)
      new_command = instr + alt_str
      self.noisy_path.append(new_command)

  def make_noisy_svg(self):
    self.tokenize_path()
    self.get_pairs()
    self.add_noise_to_path()
    noisy_string = get_string_from_list(self.noisy_path)
    noisy_svg = inject_path(noisy_string)
    return noisy_svg


# if __name__ == "__main__":
#   p = "M269.6,787.7 C297.7,785.8 339.7,784.5 387,783.8 L435.3,783.1 L437.3,778.1 C440.6,769.7 445,751.9 448.1,734.1 C456,688.1 458.9,653.3 461.1,574.6 C461.7,553.4 463.7,503 465.6,462.6 C469.6,376.8 469.9,365.8 471.2,261.1 C471.8,217.7 472.6,175.8 473.1,168.1 C473.6,160.4 474.3,144.4 474.7,132.6 C475.3,112.4 475.3,111 473.5,108.9 C472.1,107.3 463.9,104.1 443.7,97.6 C411,86.9 390,81.4 344.1,71.6 C308.3,63.9 280,57.2 208.8,39.7 C184.2,33.6 153.2,26.3 139.8,23.5 C116,18.5 99.4,14.5 77.6,8.6 C66.1,5.4 58.7,4.6 57,6.3 C56.4,6.9 53.9,19.9 51.5,35.2 C33,151.1 30.6,195.3 27.6,486.6 C26.1,624.7 22.3,675.5 9.1,730.7 C4.3,750.6 4,757.1 7.6,761.4 C13.6,768.6 40.2,777.5 72.1,783 C87.3,785.6 116.2,788.4 134.1,789 C152.7,789.6 255.2,788.6 269.6,787.7 L269.6,787.7 Z M127.1,793.6 C76.7,791.2 32.6,782.4 10.5,770.2 C-1.5,763.6 -2.5,757.4 4.1,729.8 C17.3,674.1 21.1,623.7 22.6,485.1 C25.7,193.5 27.9,150.9 46.1,36.7 C51.3,3.7 51.9,1.9 58.1,0.3 C62,-0.7 70.5,1 90.1,6.6 C97.5,8.8 110.4,11.9 118.6,13.6 C149.9,20.1 179.9,27 220,37.1 C276.8,51.3 305.8,58.1 351.6,68 C397.4,77.9 409.1,81 442.6,91.8 C472.2,101.3 474.3,102.1 477.3,105.3 C479.5,107.7 479.6,108.2 479.5,127.9 C479.5,139 478.9,156.7 478.3,167.1 C477.6,177.6 476.7,222.3 476.2,266.6 C475,365.3 474.8,371 470.6,464.1 C468.7,505.4 466.7,555.3 466.1,575.1 C464.2,644.9 462.3,673.2 457,710.6 C452.8,740.7 448.4,761.7 443.1,777.1 C442.1,780.1 441.5,782.7 441.9,783 C442.8,783.4 450.6,782.3 458.8,780.6 C463.7,779.5 465.4,779.5 466.3,780.4 C467.3,781.4 467.2,781.9 466.1,783 C464.4,784.5 453.5,787.2 444.7,788.2 C439.8,788.8 438.3,789.4 436.3,791.8 C434.4,794 433.6,794.4 432.5,793.5 C431.7,792.9 431.1,791.4 431.1,790.3 C431.1,788.3 430.9,788.3 380.4,789 C331.2,789.7 304,790.6 270.6,792.7 C250,794 148.6,794.7 127.1,793.6 L127.1,793.6 Z"
#   svg = svgObject(p)
#   svg.tokenize_path()
#   print("\nCOMMAND TEST\n")
#   for x in svg.commands:
#     print("x is %s" % x)

#   svg.get_pairs()
#   svg.add_noise_to_path()

#   print("\nNOISY PATH")
#   print(type(svg.noisy_path))
#   for j in svg.noisy_path:
#     print(j + "\n")

#   pstring = get_string_from_list(svg.noisy_path)
#   test_html = inject_path(pstring)
#   print(test_html)
