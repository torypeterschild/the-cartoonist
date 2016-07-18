import svgwrite



""" 
  Make filter for outline of head 
"""
def make_shape_filter(dwg):
  shape_filt = dwg.filter(id="FN", start=(0, 0), size=('100%', '100%'),
    filterUnits="userSpaceOnUse", color_interpolation_filters="sRGB")
  shape_filt.feGaussianBlur(stdDeviation="1", result="BLUR")
  shape_filt.feTurbulence(x='0%', y='0%', width='100%',
    height='100%', baseFrequency=.03, numOctaves=4, seed=47,
    stitchTiles='stitch', type='fractalNoise', result="NOISE")
  shape_filt.feDisplacementMap(in_="SourceGraphic", xChannelSelector="A", 
    yChannelSelector="A", scale="23.5", result="DISPL")
  shape_filt.feComponentTransfer(in_="DISPL", result="OPAQ").feFuncA(type_="linear",
    slope=".9")
  shape_filt.feMerge(["OPAQ"])
  return shape_filt


""" 
  Make filter for facial features 
"""
def make_feature_filter(dwg):
  feature_filt = dwg.filter(id="Fx", start=(0, 0), size=('100%', '100%'),
    filterUnits="userSpaceOnUse", color_interpolation_filters="sRGB")
  feature_filt.feTurbulence(x='0%', y='0%', width='100%',
    height='100%', baseFrequency=.04, numOctaves=4, seed=47,
    stitchTiles='stitch', type='fractalNoise')
  feature_filt.feDisplacementMap(in_="SourceGraphic", xChannelSelector="A", 
    yChannelSelector="A", scale="13.5", result="DISPL2")
  return feature_filt