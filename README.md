# Visualization-COVID-19
<a href="https://gh920.github.io/Visualization-COVID-19/">Click Here To See the Webpage<br><img src="images/preview.png"></a>
## Abstract
COVID-19 is the abbreviation of Coronavirus Disease 2019. It is an infectious respiratory disease caused by a novel coronavirus, which was first detected in Wuhan City, Hubei Province of China. The World Health Organization (WHO) has alerted a Public Health Emergency of International Concern (PHEIC) for COVID-19 outbreak. Everyone in the world cares a lot about this health emergency event. Up to 1/May/2020, there are over 3,300,000 confirmed cases over the world. This project uses visualizations to help to understand the spread of COVID-19.

## Functional Requirements
This project must be able to preprocess data, consolidate multiple datasets, summarize useful data, analyze the spread of COVID-19, and make comparisons. The summarized data must be formatted so that it could be read effectively into the JavaScript functions. Besides, end users can interactively play with the visualized charts and even change some of data to view updated charts. The interactions include the ability to hover, emphasize, select, zoom, switch chart type, and add data.

## System Architecture and Description
The raw data was downloaded in the form of CSV files from Kaggle. The data preprocessing, consolidation, and summarization are conducted by Python. There are three groups of data, which are confirmed cases, deaths cases, recovered cases. The daily growth datasets are simply calculated from the original three groups of data. All of this datasets are stored into separate CSV files in the local path and read by d3.csv function in JS and directly read in Tableau.

## Development Platforms
The basic framework of web page is based on HTML. The style is designed in CSS. The visualized charts and animation are created by JavaScript and Tableau. In specific, the dashboard is created by Tableau. The data is read by D3 JavaScript library. The charts is created by ECharts JavaScript library. The map API is connected to Baidu Map API.
