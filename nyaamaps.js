var opacity = .39;
var worlddir;
var styles = {};
var white = [255, 255, 255, 1];
var blue = [0, 153, 255, 1];
var width = 1.25;
var maxresolution = 8;
var orgfix = "";

var draglock = true;
var getText = function (feature, resolution)
{
   var text = feature.get('name');
   if (text && feature.get('autowrap')) return cross(text, 6, '\n');
   else if (text) return [text, 0];
   else return '';
};

var defaultstyle_text = new ol.style.Text(
{
   textAlign: 'center',
   textBaseline: 'top',
   //font: 
   //text: text[0],
   fill: new ol.style.Fill(
   {
      color: '#000000'
   }),
   stroke: new ol.style.Stroke(
   {
      color: [255, 255, 255, .72],
      width: 2.5
   }),
   offsetX: 0,
   //offsetY: feature.get('radius') + 2 + fs * (text[1]),
   rotation: 0
});
var style_point_cache = {
   0.03125:
   {},
   0.0625:
   {},
   0.125:
   {},
   0.25:
   {},
   0.5:
   {},
   1:
   {},
   2:
   {},
   4:
   {},
   8:
   {},
   16:
   {},
};
var cate_cache = {
   0: "未分类",
   1: "传送",
   2: "标识",
   3: "商业区",
   4: "地区",
   5: "城市/村落",
   6: "农场/牧场",
   7: "房屋（空）",
   8: "房屋",
   9: "商店",
   10: "建筑（未完成）",
   11: "公共建筑",
   12: "车站/停靠点",
   13: "路线",
   18: "地下通路",
   14: "铁路",
   15: "大型建筑",
   16: "",
   17: "坑",
}

var createTextStyle = function (feature, resolution)
{
   var fs = feature.get('fontsize');
   if (fs <= 11 && resolution >= 1) return undefined;
   else if (fs <= 13 && resolution >= 2) return undefined;
   else if (fs <= 16 && resolution > 4) return undefined;

   if (resolution >= 16) fs /= 2;
   else if (resolution >= 8) fs *= .72;
   var text = getText(feature, resolution);
   defaultstyle_text.setFont('Bold ' + fs + 'px Helvetica, "Open Sans", "WenQuanYi Microhei", "Microsoft YaHei", sans-serif');
   defaultstyle_text.setText(text[0]);
   defaultstyle_text.setOffsetY(feature.get('radius') + 2 + fs * (text[1]));
   return defaultstyle_text;
   /*return new ol.style.Text(
   {
      textAlign: 'center',
      textBaseline: 'top',
      font: 'Bold ' + fs + 'px Helvetica, "Open Sans", "WenQuanYi Microhei", "Microsoft YaHei", sans-serif',
      text: text[0],
      fill: new ol.style.Fill(
      {
         color: '#000000'
      }),
      stroke: new ol.style.Stroke(
      {
         color: [255, 255, 255, .72],
         width: 2.5
      }),
      offsetX: 0,
      offsetY: feature.get('radius') + 2 + fs * (text[1]),
      rotation: 0
   });
   */
};

/*styles["Polygon"] = function (feature, resolution)
{
   return new ol.style.Style(
   {
      stroke: new ol.style.Stroke(
      {
         color: '#3399CC',
         width: 1.25
      }),
      fill: new ol.style.Fill(
      {
         color: [129, 129, 129, 0.5]
      })
   })
};
styles["MultiPolygon"] =
   styles["Polygon"];
*/

styles["LineString"] = function (feature, resolution)
{
   /*var color=feature.get('color');
	var color2=hexToRgb(color);
	var zss=feature.get('ys');
	var zs;
	var styles=[];
	var i = 0, geometry = feature.getGeometry();
	geometry.forEachSegment(function (start, end) {
     zs=Math.min(zss[i]/60,1.5);
	  console.log(zs);
     styles.push(new ol.style.Style({
         geometry: new ol.geom.LineString([start, end]),
         stroke: new ol.style.Stroke({
             //color: 'rgb('+Math.round(color2[0]*zs)+','+Math.round(color2[1]*zs)+','+Math.round(color2[2]*zs)+')',
             color: [color2[0]*zs,color2[1]*zs,color2[2]*zs,1],
             width: 1.25
         })
     }));

     i++;
 });

 return styles;*/
   var cate;
   if (style_point_cache[resolution].hasOwnProperty(cate = feature.get('cate')))
   {
      //console.log("ret cache "+resolution+","+cate);
      return style_point_cache[resolution][cate];
   }
   else
   {
      //console.log("ret ncache "+resolution+","+cate);
      return style_point_cache[resolution][cate] =
         new ol.style.Style(
         {
            stroke: new ol.style.Stroke(
            {
               color: feature.get('color'),
               width: 1.25
            }),
            //text: createTextStyle(feature, resolution),
         });
   }
};
//styles["MultiLineString"] =
//   styles["LineString"];

styles["Point"] = function (feature, resolution)
{
   var fs = feature.get('fontsize');
   if (fs <= 16 && resolution >= 16) return undefined;

   var key = 0;
   if (fs <= 13 && resolution >= 5) key = 1; //new ol.style.Style();
   else if (fs <= 16 && resolution >= 8) key = 1; //new ol.style.Style();
   else if (resolution >= 8) key = 2;

   var cate;
   if (style_point_cache[resolution].hasOwnProperty(cate = feature.get('cate')))
   {
      if (key == 0)
      {
         return [style_point_cache[resolution][cate],
            new ol.style.Style(
            {
               text: createTextStyle(feature, resolution)
            })
         ];
      }
      else if (key == 1)
      {
         return style_point_cache[resolution][cate];
      }
      else if (key == 2)
      {
         return [style_point_cache[resolution][cate],
            new ol.style.Style(
            {
               text: createTextStyle(feature, resolution)
            })
         ];
      }
   }
   else
   {
      if (key == 0)
      {
         return [style_point_cache[resolution][cate] = new ol.style.Style(
            {
               image: new ol.style.RegularShape(
               {
                  fill: new ol.style.Fill(
                  {
                     color: feature.get('color')
                  }),
                  stroke: new ol.style.Stroke(
                  {
                     color: [0, 0, 0, .72],
                     width: 1.25
                  }),
                  points: 4,
                  radius: feature.get('radius'),
               }),
               //zIndex: 2
            }),
            new ol.style.Style(
            {
               text: createTextStyle(feature, resolution)
            })
         ];
      }
      else if (key == 1)
      {
         return style_point_cache[resolution][cate] = new ol.style.Style(
         {
            image: new ol.style.RegularShape(
            {
               fill: new ol.style.Fill(
               {
                  color: feature.get('color')
               }),
               points: 4,
               radius: feature.get('radius') / 3,
            }),
            //zIndex: 2
         });
      }
      else if (key == 2)
      {
         return [style_point_cache[resolution][cate] = new ol.style.Style(
            {
               image: new ol.style.RegularShape(
               {
                  fill: new ol.style.Fill(
                  {
                     color: feature.get('color')
                  }),
                  points: 4,
                  radius: feature.get('radius') / 2,
               }),

               //zIndex: 2
            }),
            new ol.style.Style(
            {
               text: createTextStyle(feature, resolution)
            })
         ];
      }
   }
};
/*styles["MultiPoint"] =
   styles["Point"];*/

/*styles["GeometryCollection"] =
	styles["Polygon"].concat(
		styles["Point"]
	);*/


var styleFunction = function (feature, resolution)
{
   return styles[feature.getGeometry().getType()](feature, resolution);
};


//pixel projection
var tileSize = 256;
var projection0 = new ol.proj.Projection(
{
   code: 'ZOOMIFY',
   units: 'pixel',
   extent: [-10400, -10400, 10400, 10400],
});
var projection = new ol.proj.Projection(
{
   code: 'ZOOMIFY2',
   units: 'pixel',
   extent: [-10400, -10400, 10400, 10400],
   //axisOrientation: 'esu'
});
//ol.proj.addProjection(projection);
ol.proj.addCoordinateTransforms(projection, projection0,
   function (coordinate)
   {
      return [coordinate[0], -coordinate[1]];
   },
   function (coordinate)
   {
      return [coordinate[0], -coordinate[1]];
   });
/*var mousePositionControl = new ol.control.MousePosition(
{
   projection: projection0,
   coordinateFormat: ol.coordinate.createStringXY(4),
   className: 'custom-mouse-position',
   target: document.getElementById('mouse-position'),
   undefinedHTML: '&nbsp;'
});*/
var projectionExtent = projection.getExtent();


var tileLayer;
var vectorSource;
var vectorLayer;
//var imageVectorSource;
var view;
var loaded;

var tilefnc = function (tileCoord, pixelRatio, projection)
{
   if (tileCoord === null) return undefined;

   //console.log(tileCoord[0]);
   var x, y, z;
   x = tileCoord[1];
   y = -tileCoord[2] - 1;
   z = Math.pow(2, tileCoord[0]) / 16;
   //console.log(tileCoord[0]);
   //console.log(z);

   return 'map/' + worlddir + orgfix + "/images/z" + z + '/' + x + ',' + y + '.png?d=' + (Math.floor(Date.now() / 14400000));
};

function createlayers()
{
   tileLayer = new ol.layer.Tile(
   {
      opacity: opacity,
      source: new ol.source.TileImage(
      {
         tileUrlFunction: tilefnc,
         tileGrid: new ol.tilegrid.TileGrid(
         {
            extent: projectionExtent,
            resolutions: [16, 8, 4, 2, 1],
            tileSize: [256, 256],
            origin: [0, 0],
         }),

         projection: projection,
         tilePixelRatio: 1,
         wrapX: false
      }),
      extent: projectionExtent,
      name: "pnglayer",
   });
   vectorSource = new ol.source.Vector(
   {
      url: 'data/' + worlddir + '.geojson?d=' + (Math.floor(Date.now() / 14400000)),
      format: new ol.format.GeoJSON(
      {
         projection: projection,
      }),
      updateWhileAnimating: true,
      updateWhileInteracting: false,
      projection: projection
   });
   loaded = false;
   vectorLayer = new ol.layer.Vector(
   {
      source: vectorSource,
      extent: projectionExtent,
      name: "svglayer",
      style: styleFunction,
   });

   view = new ol.View(
   {
      center: [203, -221],
      //zoom: 9,
      resolution: 1,
      maxResolution: maxresolution,
      minResolution: 1 / 8,
      projection: projection,
      //minZoom: 5,
      //maxZoom: 16,
      //zoomFactor: 1.5,
      extent: projectionExtent
   });
}

createlayers();



/**
 * Elements that make up the popup.
 */
var popup_container = document.getElementById('popup');
var popup_content = document.getElementById('popup-content');
var popup_closer = document.getElementById('popup-closer');


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
popup_closer.onclick = function ()
{
   overlay.setPosition(undefined);
   popup_closer.blur();
   return false;
};


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ (
{
   element: popup_container,
   autoPan: false,
   autoPanAnimation:
   {
      duration: 250
   }
}));









var map = new ol.Map(
{
   target: 'map',
   loadTilesWhileAnimating: true,
   controls: [
      /*new ol.control.TouchNavigation({
			dragPanOptions: {
				enableKinetic: true
			}
      }),*/
      new ol.control.Zoom(),
      new ol.control.Rotate(
      {
         autoHide: false
      }),
      new ol.control.FullScreen(),
      //new ol.control.ScaleLine (),
      new ol.control.ZoomSlider() //,
      //mousePositionControl
   ],
   overlays: [overlay],
   view: view
});
map.on('singleclick', function (evt)
{
   clg(evt.pixel, evt.coordinate);
});

map.on('pointerdrag', function (evt)
{
   //console.log("draglock");
   draglock = true;
});
map.on('moveend', function (evt)
{

   //console.log("dragunlock "+evt.dragging);
   draglock = false;
});

var lastresolution = -1;

function onchange(evt)
{
   if (loaded == false)
   {
      if (vectorSource.getState() == 'ready')
      {
         if (vectorSource.getFeatures().length)
         { //known issue
            loaded = true;
            document.getElementById('features').innerHTML = vectorSource.getFeatures().length;
         }
      }
   }
   //var resolution = map.getView().getResolution();
   //console.log(resolution+","+lastresolution);
   /*if (resolution > lastresolution)
   {
      lastresolution = resolution;
      if (resolution > 3 && tileLayer.getVisible() == true) tileLayer.setVisible(false);
   }
   else if (resolution < lastresolution)
   {
      lastresolution = resolution;
      if (resolution <= 3 && tileLayer.getVisible() == false) refreshtile();
   }*/
}

function displaylegend(e)
{
   document.getElementById('legend').style.visibility = (e ? 'visible' : 'hidden');
}

function radio_r1(world)
{
   document.getElementById('features').innerHTML = '';
   map.removeLayer(vectorLayer);
   map.removeLayer(tileLayer);
   worlddir = world;
   createlayers();
   map.addLayer(tileLayer);
   map.addLayer(vectorLayer);
   map.getView().setResolution(1);
   map.getView().setCenter([203, -221]);
   refreshtile();
   vectorSource.on('change', onchange);
   //cache();
}

function chgtristate()
{
   ++tristate;
   if (tristate > 2) tristate = 0;
   settristate();
   refreshtile();
   if (tristate == 0)
   {
      document.body.className = 'bg2';
      tileLayer.setVisible(false);
   }
   else if (tristate == 1)
   {
      document.body.className = 'bg1';
      tileLayer.setVisible(true);
      orgfix = "";
      tileLayer.getSource().setTileUrlFunction(tilefnc);
   }
   else
   {
      orgfix = "_org";
      tileLayer.getSource().setTileUrlFunction(tilefnc);
   }
}

function settristate()
{
   if (tristate == 1) document.getElementById('displaybitmaptile').indeterminate = true;
   else document.getElementById('displaybitmaptile').indeterminate = false;
   if (tristate != 0) document.getElementById('displaybitmaptile').checked = "checked";
   else document.getElementById('displaybitmaptile').checked = null;
}

function refreshtile()
{
   //console.log("Refresh Tile");
   var force;
   //force = document.getElementById('displaybitmaptile').checked ? 1 : 0;
   force |= document.getElementById('displayvector').checked ? 2 : 0;
   force |= document.getElementById('displayuser').checked ? 4 : 0;
   //force |= document.getElementById('displaybitmaptile').indeterminate ? 8 : 0;

   vectorLayer.setVisible(force & 2);
   if (!(force & 2) && !(force & 4))
   {
      if (tileLayer.getOpacity() != 1)
      {
         tileLayer.setOpacity(1);
      }
   }
   else
   {
      if (tileLayer.getOpacity() != opacity)
      {
         tileLayer.setOpacity(opacity);
      }
   }

   displaylegend(document.getElementById('displaylegend').checked);
}


//execute
var tristate = 0;
if (document.getElementById('displaybitmaptile').indeterminate) tristate = 1;
else if (document.getElementById('displaybitmaptile').checked) tristate = 2;
if (tristate == 2)
{
   tristate = 1;
}
settristate();

radio_r1(document.querySelector('input[name="r1"]:checked').value);

document.getElementById('search').addEventListener('keydown', function (e)
{
   if (e.keyCode == 13)
   {
      search(this.value);
   }
});
document.getElementById('map').focus();

// change mouse cursor when over marker

var positionctrl = document.getElementById("mouse-position");
var positionlastmove = 0;
var lastcoord, lastpixel;
setInterval(getcursor, 240);
map.on('pointermove', function (e)
{
   lastpixel = map.getEventPixel(e.originalEvent);
   lastcoord = map.getEventCoordinate(e.originalEvent);
   positionlastmove = Date.now();

   if (e.dragging)
   {
      //$(element).popover('destroy');
      return;
   }
   var coord = ol.proj.transform(lastcoord, projection0, projection)
   positionctrl.innerHTML = Math.round(coord[0]) + ", " + Math.round(coord[1]) + " / ";
});

function getcursor()
{
   if (!lastpixel || draglock) return;
   if (Date.now() - positionlastmove >= 240)
   {
      clg(lastpixel, lastcoord);
   }
}

function clg(pixel, coordinate)
{
   //console.log("clg");
   var hit = map.forEachFeatureAtPixel(pixel, function (feature, layer)
   {
      var ys = feature.get('ys'); //ispath
      if (!ys)
      {
         coordinate = feature.getGeometry().getCoordinates();
         popup_content.innerHTML =
            '<p class="popup">' +
            feature.get("name") + " (" + cate_cache[feature.get("cate")] + ")" +
            "</p><code>" +
            "( " + Math.round(coordinate[0]) + ", " + Math.round(-coordinate[1]) + ", " + feature.get("y") + " )" +
            "</code>";
      }
      else
      {
         //var coordinate = coordinate;
         popup_content.innerHTML =
            '<p class="popup">' +
            feature.get("name") + " (" + cate_cache[feature.get("cate")] + ")" +
            "</p><code>" +
            "( " + Math.round(coordinate[0]) + ", " + Math.round(-coordinate[1]) + ", " + feature.get("ys")[0] + " )" +
            "</code>";
      }
      overlay.autoPan = true;
      overlay.setPosition(coordinate);
      overlay.autoPan = false;
      return true;
   });
}




/* search */
var lastfind = 0;

function search(w)
{
   var w = new RegExp(w, 'i');
   var features = vectorSource.getFeatures();
   var l = features.length;
   var i = lastfind;
   var searched;
   var feature;
   for (;;)
   {
      var name = features[i].get('name');
      if (name && w.test(name))
      {
         feature = features[i];
         //searched = feature.getGeometry().getCoordinates();
         lastfind = i + 1;
         if (lastfind >= l) lastfind = 0;
         break;
      }
      ++i;
      if (i >= l) i = 0;
      if (i == lastfind) break;
   }
   if (feature)
   {
      //foreachafter=Date.now()+2000;
      var pan = ol.animation.pan(
      {
         duration: 2000,
         source: map.getView().getCenter()
      });
      //console.log(searched);
      map.beforeRender(pan);


      var ys = feature.get('ys'); //ispath
      if (!ys)
      {
         var coordinate = feature.getGeometry().getCoordinates();
         console.log(coordinate);
         popup_content.innerHTML =
            '<p class="popup">' +
            feature.get("name") + " (" + cate_cache[feature.get("cate")] + ")" +
            "</p><code>" +
            "( " + Math.round(coordinate[0]) + ", " + Math.round(-coordinate[1]) + ", " + feature.get("y") + " )" +
            "</code>";
      }
      else
      {
         //vconsole.log(feature.getGeometry().getCoordinates());
         var coordinate = feature.getGeometry().getCoordinates(); //evt.coordinate;
         var al = Math.floor(coordinate.length / 2);
         coordinate = coordinate[al];
         console.log(coordinate);
         popup_content.innerHTML =
            '<p class="popup">' +
            feature.get("name") + " (" + cate_cache[feature.get("cate")] + ")" +
            "</p><code>" +
            "( " + Math.round(coordinate[0]) + ", " + Math.round(-coordinate[1]) + ", " + feature.get("ys")[al] + " )" +
            "</code>";
      }
      overlay.setPosition(coordinate);
      //return true;





      //view.setCenter(ol.proj.transform(searched,projection0,projection));
      map.getView().setCenter(coordinate);
   }
}





/* common funcs */

//fine divider
var namelengthfontspan = 1.8;
var namelengthperline = 6 * namelengthfontspan;

function cross(text, temp, spaceReplacer)
{
   var e = 0;
   //var emax=0;
   var text2 = "";
   var at = 0;
   var cat;
   var l = text.length;
   if (l <= 6) return [text, 0];
   cat = text.charCodeAt(0);
   for (var i = 0; i < l; ++i)
   {
      text2 += text.charAt(i);
      if (cat < 256)
      {
         e += 1;
      }
      else
      {
         e += namelengthfontspan;
      }
      if (e >= namelengthperline && i < l - 1 && ((cat = text.charCodeAt(i + 1)) >= 256 || cat < 40))
      {
         e = 0;
         ++at;
         text2 += spaceReplacer; //.push("");
      }
   }
   //text2.push(emax);//max text
   return [text2, at];
}

function stringDivider(str, width, spaceReplacer)
{
   if (str.length > width)
   {
      var p = width;
      while (p > 0 && (str[p] != ' ' && str[p] != '-'))
      {
         p--;
      }
      if (p > 0)
      {
         var left;
         if (str.substring(p, p + 1) == '-')
         {
            left = str.substring(0, p + 1);
         }
         else
         {
            left = str.substring(0, p);
         }
         var right = str.substring(p + 1);
         return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
      }
   }
   return str;
}

function hexToRgb(hex)
{
   // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
   var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
   hex = hex.replace(shorthandRegex, function (m, r, g, b)
   {
      return r + r + g + g + b + b;
   });

   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
   ] : null;
}

function rgbToHex(r, g, b)
{
   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

