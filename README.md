# <PartitionDataDashboard>

## Purpose

<A dashboard that showcases metrics like attributed conversions, revenue, advertising spend for a brand >

## Prerequisites

-   node.js latest version from website: https://nodejs.org/en/download
-   npm
-   typescript

## Steps to run the project

### `npm install`

Installs the dependencies of the project
Navigate to 'interactive_dashboard' folder(root folder) where you will find package.json file. Then run the above mentioned command to install the project dependencies.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Code Structure 
/src
  /components               # All components
    /dataDashboard.tsx      # Dashboard component
    /filters                # Filter components
    /PartitionData          # Partition Data Graphs components
    /PerfReport             # Performance Report Graph component
    /Statistics             # Statistics Graph component
  /lib                      
    /api                    # API Handlers
    /models                 # Data models
    /store                  # Context files
  /App.tsx                  # Main file
  /index.tsx                # Starting file
