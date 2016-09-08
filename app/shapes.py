""" 
    NOTE: DON'T NEED THIS MODULE ANYMORE -- USING PATH_UTILITIES TO GENERATE
    SHAPES 
"""

""" Define all shapes for head and features """

circle = "M148 1.3c-3.6.5-13.9 1-23 1.1-12.7.2-18.4.7-25 2.4-10.4 2.5-25.9 8.7-33.5 13.3-8.1 4.8-22.5 17.1-32.6 27.5C19.1 61.1 11 75 5.1 95 .5 110.9-.3 121.3.3 161.2c.4 30.8.7 36.7 2.6 46.3 4 20.5 11.3 45.1 18.7 62.6C40.2 314.7 63 340.7 99.5 359c31.5 15.7 59.3 22 103.7 23.6 26.7.9 42.1-1.3 61.6-9 41.9-16.5 78-57.9 114.9-132.1 13.8-27.6 20.7-49.6 24.4-77.5 2.1-16.3 2.6-44.9.8-54.6-2.4-13.6-7.2-24.6-15.5-35.4-4.7-6.1-28.8-30-37.4-37.2-22-18.1-47.5-28.9-79-33.3C251.3.5 165.8-1 148 1.3z m124 7.1 c41.7 6.1 67.5 20.4 102.5 56.8 21.5 22.3 26.5 35 26.5 66.6 0 46-10 80.1-38.7 132-23.5 42.6-50.4 75.7-74.8 91.8-26.3 17.5-48.8 23.3-85 22-40.3-1.6-69.8-8.1-98-21.6-45.6-22-73-60.1-91.5-127.6-6.6-24.2-7.2-29.7-7.7-67.9-.6-37.9 0-46.1 4.3-62.5 5-18.7 14-34.4 28.7-49.7C55.8 30.1 71.9 19.4 92 12.6c11.2-3.7 28.4-6.3 34.5-5.2 3.2.6 3.4.9 2.4 2.8-.8 1.6-.8 2.4.3 3.4 1.2 1.3 1.9 1 4.7-1.6l3.2-3.1 11.2.3c10.4.3 11.2.2 11-1.5-.1-1.8 1.9-1.9 50.5-1.4 40.5.3 53 .8 62.2 2.1z"
small_circle = "M25,0 C60,0, 60,50, 25,50 C-10,50, -10,0, 25,0"
alt_circle = "M158.45 362.672c-22.142-5.708-34.002-11.19-61.248-28.39-40.382-25.534-59.372-43.484-75.36-71.572C6.83 236.574.075 207.36 0 168.906c0-30.116 6.38-50.319 24.244-76.98 7.13-10.59 20.191-26.511 27.097-32.97 1.276-1.277 4.878-4.657 8.031-7.586 13.436-12.692 33.251-26.736 48.563-34.472C131.655 4.957 158-.75 185.171.15c18.315.526 29.8 3.155 43.085 9.839 28.147 14.194 52.466 39.954 67.778 71.873 13.136 27.187 18.615 55.576 19.74 101.314.376 15.246.226 19.827-.825 26.661-3.903 25.16-12.685 45.663-31.074 72.475-21.017 30.717-40.157 49.417-69.806 68.494-17.714 11.34-22.968 13.218-38.055 13.743-8.106.3-9.908.075-17.564-1.877z m30.55-6.985c2.326-.976 5.78-2.328 7.656-3.004 1.876-.676 5.254-2.779 7.506-4.656 2.552-2.103 5.704-3.906 8.181-4.582 9.007-2.703 35.278-25.685 49.164-43.109 22.293-27.938 36.028-53.473 41.358-76.605 3.753-16.823 4.578-29.215 3.452-52.947-1.876-38.303-7.13-63.237-18.39-86.443-14.71-30.342-40.306-56.628-67.628-69.47-20.116-9.464-46.537-11.341-75.885-5.558-11.709 2.403-20.116 5.257-32.35 11.34-18.315 9.013-34.152 20.654-51.341 37.852-17.113 17.048-28.523 32.22-37.68 50.019-10.208 20.052-13.36 34.547-13.36 61.434.075 34.622 4.803 57.679 16.963 82.688 12.835 26.511 31.375 47.99 56.295 65.415 16.288 11.415 46.311 27.187 61.323 32.219 4.279 1.427 12.16 3.38 17.489 4.43a2608.639 2608.639 0 0 0 11.259 2.179c4.578 1.051 11.86.45 15.988-1.202z"
tall_ellipse = "M102 2.3c-3 1.3-9.5 5.3-14.5 8.9-11.1 8.1-23.6 15.9-29.2 18.1-2.3.9-8.8 2.8-14.4 4.2-5.7 1.5-11.8 3.3-13.6 4-1.8.8-3.3 1.1-3.3.7 0-.4 2.3-2.8 5.1-5.3 3.7-3.2 5.1-5.1 4.6-6.2-1.1-3-3.8-1.8-10.1 4.5-5.5 5.6-6.6 7.5-10.4 17.3C11.3 61.3 7.8 77.3 5.1 99 .7 133.9.5 139.8.5 218.5v76l3.3 25C14.7 403 18.6 424.8 28.2 454c11 33.6 24.2 57.7 37.6 68.5 12.4 9.9 30.5 16.2 43.8 15.2 15.1-1.1 22.7-7.8 35.1-30.7 18.8-34.7 45-121.9 55.4-184.5 4.7-28.4 6.1-50.2 6.8-108 .7-63.8 0-99.7-2.3-111.5-3-15.1-8.8-31.9-17.4-50.1-10.5-22.5-22.9-36.9-40.3-46.7C139.3 1.9 130.5 0 118 0c-8.6 0-11.5.5-16 2.3zm30.2 3.8c19 4.1 38.2 22.5 50.3 48.6 9.9 21.1 16.5 42.7 18.5 60.2 1.8 15.3.7 146.6-1.4 170.1-4.5 50.6-21.4 121.8-42.3 179-15.9 43.1-29.2 65.2-40.9 67.7-11.8 2.5-27.5-.7-40.1-8.1-7.1-4.2-17.5-14.9-22.7-23.5-9.9-16.2-21.8-47.9-27.9-74.1-5.1-21.7-8.3-42.7-18.4-119.5C5.7 294 5.5 284.4 5.5 218c0-53.7.4-78.3 1.3-88 4.8-49.8 9.1-71.2 16-80 4.5-5.8 9.1-8.2 21.9-11.4 18.2-4.6 23.9-7.5 44.6-22.4 6.6-4.6 13.8-9.1 16-9.8 5.2-1.6 19.9-1.8 26.9-.3z"
wide_ellipse = "M205.5 1.1c-20.5.8-35.2 2.8-51.7 6.9C83.7 25.5 19.5 59.9 6.6 86.9 1.5 97.5-.3 106.8.2 119.8c.3 10.2.6 11.1 4.3 18.1 7.4 13.9 25.5 30.5 44.8 41 24.2 13.1 61.6 23 105.2 27.7 18.9 2.1 96 3.1 111.7 1.5 26.6-2.7 58.5-10.4 99.3-23.8 28.4-9.4 53.2-21 77.2-36.1 29.1-18.4 48-35.7 55.8-51.2 4.7-9.4 6.9-27.3 4.5-36.2-.6-2-3.1-5.9-5.5-8.6-7.7-8.6-33.2-25.8-50.8-34.3-4.4-2.1-9-4.8-10.2-5.9-5.7-5.4-27.1-8.8-58.6-9.5-7.9-.2-36.9-.8-64.4-1.4-54.5-1.1-81.8-1.1-108 0zm177 7.3c28.4 1.9 38.3 3.8 54.2 10.6 11.9 5.1 22.2 10.9 37.4 21.1 14.8 10 20.2 14.8 22.9 20.5 2 4 2.2 5.7 1.7 13.2-.6 10.8-3.2 19.1-8.3 26.8-16.5 25.1-70.8 59.9-119.4 76.6-30.7 10.5-69.9 20.7-94 24.5-9.8 1.5-18 1.8-56.5 1.8-29.2 0-49.9-.5-59-1.3-66.1-6.2-114.9-23.7-139.9-50.3C8.2 137.6 5 130.8 5 116c0-8.7 2.4-20 5.7-26.4C18 75.2 36.9 60.5 68.5 45c38.7-19.1 78.7-32.2 113-37 11.9-1.7 19.8-1.8 94.5-1.6 63.3.2 87.1.7 106.5 2z"
large_curve = "M100,200 C100,100  400,100  400,200"
small_curve = "M130 110 C 120 140, 180 140, 170 110"
triangle = "M150 0 L75 200 L225 200 Z"
rectangle = "M270.5 6.9c28.1 1.9 70.1 3.2 117.4 3.9l48.3.7 2 5c3.3 8.4 7.7 26.2 10.8 44 7.9 46 10.8 80.8 13 159.5.6 21.2 2.6 71.6 4.5 112 4 85.8 4.3 96.8 5.6 201.5.6 43.4 1.4 85.3 1.9 93 .5 7.7 1.2 23.7 1.6 35.5.6 20.2.6 21.6-1.2 23.7-1.4 1.6-9.6 4.8-29.8 11.3-32.7 10.7-53.7 16.2-99.6 26-35.8 7.7-64.1 14.4-135.3 31.9-24.6 6.1-55.6 13.4-69 16.2-23.8 5-40.4 9-62.2 14.9-11.5 3.2-18.9 4-20.6 2.3-.6-.6-3.1-13.6-5.5-28.9C33.9 643.5 31.5 599.3 28.5 308 27 169.9 23.2 119.1 10 63.9 5.2 44 4.9 37.5 8.5 33.2c6-7.2 32.6-16.1 64.5-21.6 15.2-2.6 44.1-5.4 62-6 18.6-.6 121.1.4 135.5 1.3zM128 1C77.6 3.4 33.5 12.2 11.4 24.4-.6 31-1.6 37.2 5 64.8c13.2 55.7 17 106.1 18.5 244.7 3.1 291.6 5.3 334.2 23.5 448.4 5.2 33 5.8 34.8 12 36.4 3.9 1 12.4-.7 32-6.3 7.4-2.2 20.3-5.3 28.5-7 31.3-6.5 61.3-13.4 101.4-23.5 56.8-14.2 85.8-21 131.6-30.9 45.8-9.9 57.5-13 91-23.8 29.6-9.5 31.7-10.3 34.7-13.5 2.2-2.4 2.3-2.9 2.2-22.6 0-11.1-.6-28.8-1.2-39.2-.7-10.5-1.6-55.2-2.1-99.5-1.2-98.7-1.4-104.4-5.6-197.5-1.9-41.3-3.9-91.2-4.5-111-1.9-69.8-3.8-98.1-9.1-135.5-4.2-30.1-8.6-51.1-13.9-66.5-1-3-1.6-5.6-1.2-5.9.9-.4 8.7.7 16.9 2.4 4.9 1.1 6.6 1.1 7.5.2 1-1 .9-1.5-.2-2.6-1.7-1.5-12.6-4.2-21.4-5.2-4.9-.6-6.4-1.2-8.4-3.6-1.9-2.2-2.7-2.6-3.8-1.7-.8.6-1.4 2.1-1.4 3.2 0 2-.2 2-50.7 1.3-49.2-.7-76.4-1.6-109.8-3.7C250.9.6 149.5-.1 128 1z"
tall_w_noise = "M102.454944 2.555670 c-3.589769 1.795121 -7.622258 5.155590 -14.425107 9.656101 -12.299238 8.019378 -24.431587 15.574862 -30.177244 16.663912 -0.824679 1.120577 -7.815190 3.730805 -14.642729 3.607725 -6.999967 0.904932 -11.491314 4.404351 -13.641872 2.983866 -2.472949 0.234601 -1.587521 1.210460 -2.823959 -0.327788 -1.537210 -3.136345 2.894458 -1.127647 5.101550 -5.942214 3.661816 -4.334447 4.452084 -5.489037 4.182665 -6.168666 -0.931636 -2.361100 -4.485246 -2.023723 -11.851315 3.418615 -4.755608 4.147446 -5.123345 8.857012 -11.961195 17.840219 C10.164080 61.347010 6.566065 77.503449 5.122566 101.116355 -0.299629 134.400519 -0.650850 139.314667 -0.014732 217.854005 v74.702083 l4.875016 26.743633 C14.389545 401.808873 19.087360 425.713425 30.081368 455.058826 c11.538741 34.360562 22.887308 55.935802 37.898223 69.747311 12.332717 9.016128 30.275635 17.020164 43.699263 14.563842 14.855447 -0.383405 22.555976 -7.155361 35.243242 -32.298094 20.735067 -35.149230 46.434574 -122.367471 54.358235 -185.783146 5.965223 -28.494624 6.113647 -50.757115 5.711365 -105.312045 0.322388 -64.863661 -0.582867 -97.514889 -0.277772 -112.924238 -3.455436 -13.624484 -8.890752 -33.843986 -18.828283 -51.174172 -11.030562 -22.128980 -23.118833 -35.084463 -39.856432 -46.707867 C139.300263 1.886763 131.950203 1.336475 117.035710 -0.605748 c-8.929419 1.121403 -11.313968 -0.180688 -16.223283 1.454166 z m29.388337 4.006772 c20.199058 4.599937 36.750585 22.435286 51.237784 47.650323 8.385157 21.663782 15.137794 42.301132 18.741729 59.462814 1.288376 17.138117 0.547226 147.179572 -0.130838 168.656274 -6.053358 51.065203 -21.745054 122.807296 -45.397149 179.899959 -15.288977 41.528063 -29.948270 64.432294 -40.376838 67.043287 -13.120558 4.369385 -27.863313 -0.658716 -39.571696 -8.345382 -8.620935 -3.274199 -18.006652 -15.759734 -25.273744 -22.908186 -8.935354 -14.273760 -22.439973 -48.373358 -28.655259 -73.534496 -6.642189 -22.816059 -9.130875 -42.728310 -18.988126 -119.113282 C5.415792 294.300813 5.840821 283.043359 5.068258 216.426672 c0.739357 -53.004545 1.877202 -77.796668 -0.374230 -86.412992 4.223696 -49.126309 9.296241 -70.749417 15.344604 -81.203221 3.274512 -7.052725 7.906031 -7.325338 19.879188 -11.249007 18.471903 -3.458527 22.408286 -6.308023 43.218447 -22.673316 6.356311 -4.360582 14.836374 -9.338605 15.001849 -10.334457 3.298643 -1.363330 21.101819 -2.591856 25.817941 0.856611 z"

""" List of head styles """
head_dict = dict(circle=circle, t_ellipse=tall_ellipse, w_ellipse=wide_ellipse,)

""" List of eye styles (NOT COMPLETE) """
# eyes = [circle, small_circle, tall_ellipse, wide_ellipse]
eye_dict = dict(sm_circle=small_circle)


""" List of mouth styles (NOT COMPLETE) """
mouth_dict = dict(circle=circle, lg_curve=large_curve, w_ellipse=wide_ellipse, sm_curve=small_curve)


""" List of nose styles (NOT COMPLETE) """
nose_dict = dict(sm_circle=small_circle, w_ellipse=wide_ellipse, sm_curve=small_curve)


""" List of cheek styles (NOT COMPLETE) """
cheeks_dict = dict(circle=circle,sm_circle=small_circle, t_ellipse=tall_ellipse, w_ellipse=wide_ellipse)


""" List of eyebrow styles [TODO] """
eyebrows = []

"""List of eyelash styles [TODO] """
eyelashes = []

"""List of hair styles [TODO] """
hair = []

