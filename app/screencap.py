from selenium import webdriver
from pyvirtualdisplay import Display

display = Display(visible=0, size=(1000, 1000))
display.start()

browser = webdriver.Firefox()
browser.get('http://torypeterschild.io/')
browser.save_screenshot('screenie.png')
browser.quit()

display.stop()