from flask import Flask, render_template
import xml.dom.minidom
import xml.etree.ElementTree as ET

app = Flask(__name__)


@app.route('/')
def show_post():
	doc = xml.dom.minidom.parse("d_lat.xml")
	root = ET.parse("d_lat.xml").getroot()
	title = doc.getElementsByTagName("title")
	title = root.iter('title')
	title = ET.tostring(next(title), method="text").strip().decode("utf-8") 
	milestone = ''
	for e in root.iter('milestone'):
		milestone += ET.tostring(e, method="text").strip().decode("utf-8") 
	return render_template('dashboard.html', title = title, milestone = milestone)

if __name__ == '__main__':
    app.run()