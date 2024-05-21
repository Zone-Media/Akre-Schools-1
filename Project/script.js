
require(["esri/Map", "esri/views/MapView", "esri/layers/CSVLayer", "esri/widgets/Locate", "esri/widgets/BasemapToggle", "esri/layers/support/LabelClass", "esri/widgets/Compass", "esri/widgets/Print", "esri/widgets/Popup", "esri/widgets/Legend", "esri/widgets/Bookmarks", "esri/webmap/Bookmark"], (Map, MapView, CSVLayer, Locate, BasemapToggle, LabelClass, Compass, Print, Popup, Legend, Bookmarks, Bookmark) => {

    const map = new Map({
        basemap: "topo-vector"
    });
    const view = new MapView({
        container: "viewDiv", // Reference to the view div created in step 5
        map: map, // Reference to the map object created before the view
        zoom: 14, // Sets zoom level based on level of detail (LOD)
        center: [43.874608, 36.726875] // Sets center point of view using longitude,latitude
    });
    let layer = new CSVLayer({

        // URL to the CSV file
        url: "akre-schools.csv",
        latitudeField: "x",
        longitudeField: "y"
    });
    layer.renderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "black",
            outline: {  // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        }
    };

    let locateWidget = new Locate({
        view: view,   // Attaches the Locate button to the view

    });

    view.ui.add(locateWidget, "top-right");

    map.add(layer);

    function filterschool() {

        const searchtext = document.getElementById("lname").value
        layer.definitionExpression = `lower(schoolname) like '%${searchtext}%'`
        console.log(layer.definitionExpression)
    }

    document.getElementById("garan").addEventListener("click", filterschool)

    function clearfilter() {

        const searchtext = document.getElementById("lname").value
        layer.definitionExpression = ""
        console.log(layer.definitionExpression)
    }

    document.getElementById("clear").addEventListener("click", clearfilter)



    let basemapToggle = new BasemapToggle({
        view: view,  // The view that provides access to the map's "streets-vector" basemap
        nextBasemap: "hybrid"  // Allows for toggling to the "hybrid" basemap
    });
    view.ui.add(basemapToggle, "top-right");

    const statesLabelClass = new LabelClass({
        labelExpressionInfo: { expression: "$feature.schoolname" },
        symbol: {
            type: "text",  // autocasts as new TextSymbol()
            color: "black",
            haloSize: 1,
            haloColor: "white",
            font: {  // autocast as new Font()
                size: 9,
            }
        }
    });

    layer.labelingInfo = [statesLabelClass];




    let compass = new Compass({
        view: view
    });

    // Add the compass to the top left corner of the MapView
    view.ui.add(compass, "top-left");

    /////////////////


    layer.popupTemplate = {
        title: "{schoolname}",
        content: [
            {
                type: "fields", // Autocasts as new FieldsContent()
                // Autocasts as new FieldInfo[]
                fieldInfos: [
                    {
                        fieldName: "schoolcode",
                        label: "School Code",

                    },
                    {
                        fieldName: "address",
                        label: "Address",

                    },
                    {
                        fieldName: "id",
                        label: "ID",

                    },
                    {
                        fieldName: "x",
                        label: "X",

                    },
                    {
                        fieldName: "y",
                        label: "Y",

                    },

                ]
            }
        ]

    };

    view.popupEnabled = true;


    let legend = new Legend({
        
        view: view
    });

    view.ui.add(legend, "bottom-right");


    const bookmarks = new Bookmarks({
        view: view,
        bookmarks: [ // array of bookmarks defined manually
            new Bookmark({
                name: "Aylul Primary School",
                viewpoint: {
                    targetGeometry: {
                        type: "extent",
                        spatialReference: {
                            wkid: 4326
                        },
                        ymin: 36.727603,
                        xmin: 43.881516,
                        ymax: 36.727603,
                        xmax: 43.881516
                    }
                }
            }),

        ]
    });
    view.ui.add(bookmarks, "top-right");


});

