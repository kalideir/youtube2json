import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

class ChannelScraper:
    def __init__(self) -> None:
        self.driver = webdriver.Chrome()

    def scrape(self, url):
        
        results = []

        self.driver.get(url)

        ht = self.driver.execute_script("return document.documentElement.scrollHeight;")
        while True:
            prev_ht = self.driver.execute_script("return document.documentElement.scrollHeight;")
            self.driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
            time.sleep(2)
            ht = self.driver.execute_script("return document.documentElement.scrollHeight;")
            if prev_ht == ht:
                break

        links = self.driver.find_elements_by_xpath('//*[name() = "ytd-grid-video-renderer" and @class="style-scope ytd-grid-renderer"]')
        for link in links: 
            duration = link.find_element_by_xpath('.//span[contains(@class,"time-status")]').text
            video = link.find_element_by_xpath('.//a[contains(@id,"video-title")]')
            href = video.get_attribute('href')
            title = video.text
            v = href.split('=')[1]
            item = {
                'href': href,
                'duration': duration,
                'title': title,
                'v': v
            }
            results.append(item)
        return results
