from selenium import webdriver

driver = webdriver.PhantomJS()
driver.set_window_size(1024, 768) # set the window size that you need 
driver.get('https://github.com/torypeterschild/the-cartoonist')
driver.save_screenshot('github.png')