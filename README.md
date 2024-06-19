# Leaflet Tracking

Angular application for tracking and representing user positions and tower information. <br>

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Documentation](#documentation)

## Technologies

- Angular
- Leaflet
- OpenStreetMap
- MongoDB `PostGIS`
- Express

## Installation

To install the project, follow these steps:

1. Clone the repository: <br>
   `git clone https://github.com/David-Szczepanik/LeafletTracking.git`
2. Install the dependencies: <br>
   `npm install`
3. To start the server, run the following command: <br>
   `npm start` `=>` http://localhost:4200 <br>

## Documentation

[IRowData Interface](interfaces/app_IRowData.default.html) <br>
[Marker Service](classes/app_marker_service.MarkerService.html) <br>
[Popup Service](classes/app_popup_service.PopupService.html) <br>

[Load Tower](classes/app_marker_service.MarkerService.html#loadTower) <br>

[File Upload](classes/app_file_upload_file_upload_component.FileUploadComponent.html) <br>
[Database](classes/app_database_database_component.DatabaseComponent.html) <br>

## Apps

| App         | Format         |
|-------------|:---------------| 
| Net Monitor | csv, json, kml |
| Cell Signal | csv            |  


