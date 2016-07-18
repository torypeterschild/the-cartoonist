import random, sys, os, json, re
import numpy as np
import noise


COMMANDS = set('MmZzLlHhVvCcSsQqTtAa')
INSTR_RE = re.compile("([MmZzLlHhVvCcSsQqTtAa])")
COMPLETE_COMMAND_RE = re.compile("([a-zA-Z][^a-zA-Z]*)")
FLOAT_RE = re.compile("[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?")


""" HELPERS """
def get_string_from_list(li):
    return " ".join(li)


def inject_path_data(path_string):
    svg_start = '''
        <svg id="drawn" height="210" width="400" viewBox="0 -20 600 600">
            <path stroke="#000" stroke-width="1" fill="none" fill-rule="evenodd" d="'''
    svg_end = '''"/>
        </svg>
        '''
    new_svg = svg_start + path_string + svg_end
    return new_svg  


def combine_mult_paths(li_path_strings):
    all_paths = []
    path_start = '''<path stroke="#000" stroke-width="1" fill="none" fill-rule="evenodd" d="
        '''
    path_end = '''"/>
        '''
    for item in li_path_strings:
        p = path_start + item + path_end
        all_paths.append(p)

    paths_as_str = " ".join(all_paths)
    return paths_as_str


def inject_path_tags(paths_str):   
    svg_start = '''
        <svg id="drawn" height="210" width="400" viewBox="0 -20 600 600">
        '''
    svg_end = '''
        </svg>
        '''
    full_svg = svg_start + paths_str + svg_end
    return full_svg 

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
            noise_arr = noise.generate_noise_array(coords_list,1)
            alt = coords_list + noise_arr
            alt_arrstr = np.char.mod('%f', alt)
            alt_str = " ".join(alt_arrstr)
            new_command = instr + alt_str
            self.noisy_path.append(new_command)

    def make_noisy_svg(self):
        self.tokenize_path()
        self.get_pairs()
        self.add_noise_to_path()
        noisy_string = get_string_from_list(self.noisy_path)
        noisy_svg = inject_path_data(noisy_string)
        return noisy_svg

    def make_noisy_path_str(self):
        self.tokenize_path()
        self.get_pairs()
        self.add_noise_to_path()
        noisy_string = get_string_from_list(self.noisy_path)
        return noisy_string
