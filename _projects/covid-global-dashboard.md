---
title: "COVID-19 Dashboard done right by cartographers"
excerpt: "A web map to track COVID-19 data with d3.js. Many dashboards are still using web-Mercator for global map and choropleth. With Yue Lin, Armita Kar, and Ningchuan Xiao.  <br/><img src='/images/covid-dashboard.gif'>"
collection: projects
link: "https://geog-gis.asc.ohio-state.edu/COVID19-Dashboard/"
---

 This dashboard aims to provide a comprehensive perspective of the pandemic by highlighting the spatial and temporal dimensions of the outbreak in its social and economic contexts. We use cutting-edge visualization and data science technology to make a highly interactive web-based platform. Please use our Tutorial to take a tour!

The statistics of COVID-19 (confirmed, deaths, and recovered if available) are shown as red proportional symbols at three scales for world regions (left), states of the United States (middle), and counties of a selected state (right). We use Ohio as the default state to show, but one can change the default state by adding something like ?state=NY to the end of the URL in the browser's address bar. At each scale, underneath the red circles are is a choropleth map that displays the data from relevant social-economic indicators. Three classes are used for the choropleth map and each class includes approximately 1/3 of the regions on each map. The line charts beneath the maps demonstrate the temporal change of the disease data, where each line corresponds to a circle in the map. The parallel coordinates plot and scatter plot in the third row can be used to explore the relationships between the disease and its social-economic contexts.

This dashboard will not be possible without the many data sources, and we are grateful to those who work on and provide these data sets! The country-level and US state-level COVID-19 data are from nssac.bii.virginia.edu/covid-19/dashboard and the github.com/CSSEGISandData/COVID-19. County-level COVID-19 data are from the usafacts.org. The COVID-19 data sets are updated daily. The world map is based on the 1:110M administrative data from the Natural Earth. Maps for the United States are based on the 2018 Census Bureau 1:20M Cartographic Boundary Files Shapefile. State and county social-economic indicators are collected from American Community Survey 5-year data (2014 -2018). Household income, poverty rate, and all jobs data for Rio Arriba, NM are missing in the ACS dataset and are replaced using the county level averages of the state.

Development Team: Luyu Liu, Yue Lin, Armita Kar, and Ningchuan Xiao.

Source code and license: github.com/luyuliu/COVID19-Dashboard under the MIT License. 