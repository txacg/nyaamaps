		var worlddir;
		var styles = {};
		var white = [255, 255, 255, 1];
		var blue = [0, 153, 255, 1];
		var width = 1.25;
		var getText = function (feature, resolution)
		{
		   var text = feature.get('name');
		   if (text && feature.get('autowrap')) return cross(text, 6, '\n');
		   else if (text) return [text, 0];
		   else return '';
		};
		var createTextStyle = function (feature, resolution)
		{
		   if (feature.get('fontsize') <= 16 && resolution >= 1) return new ol.style.Style();
		   var text = getText(feature, resolution);
		   return new ol.style.Text(
		   {
		      textAlign: 'center',
		      textBaseline: 'top',
		      font: 'Normal ' + feature.get('fontsize') + 'px Helvetica, Microsoft YaHei, sans-serif',
		      text: text[0],
		      //title: 'ttt',
		      fill: new ol.style.Fill(
		      {
		         color: '#000000'
		      }),
		      stroke: new ol.style.Stroke(
		      {
		         color: [255, 255, 255, .7],
		         width: 3
		      }),
		      offsetX: 0,
		      offsetY: feature.get('radius') + 2 + feature.get('fontsize') * (text[1]),
		      rotation: 0
		   });
		};

		styles["Polygon"] = function (feature, resolution)
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


		   return new ol.style.Style(
		   {
		      stroke: new ol.style.Stroke(
		      {
		         color: feature.get('color'),
		         width: 1.25
		      }),
		      //text: createTextStyle(feature, resolution),
		   })
		};
		styles["MultiLineString"] =
		   styles["LineString"];

		styles["Point"] = function (feature, resolution)
		{
		   if (feature.get('fontsize') <= 16 && resolution >= 5) return new ol.style.Style();
		   else if (feature.get('fontsize') < 25 && resolution >= 8) new ol.style.Style();
		   return new ol.style.Style(
		   {
		      image: new ol.style.RegularShape(
		      {
		         fill: new ol.style.Fill(
		         {
		            color: feature.get('color')
		         }),
		         points: 4,
		         radius: feature.get('radius'),
		      }),
		      text: createTextStyle(feature, resolution),
		      zIndex: 2
		   })
		};
		styles["MultiPoint"] =
		   styles["Point"];

		/*styles["GeometryCollection"] =
			styles["Polygon"].concat(
				styles["Point"]
			);*/

		//fine divider
		var namelengthfontspan = 1.8;
		var namelengthperline = 6 * namelengthfontspan;

		function cross(text, temp, spaceReplacer)
		{
		   var e = 0;
		   //var emax=0;
		   var text2 = "";
		   var at = 0;
		   var l = text.length;
		   if (l <= 6) return [text, 0];
		   for (var i = 0; i < l; ++i)
		   {
		      text2 += text.charAt(i);
		      if (text.charCodeAt(i) < 256)
		      {
		         e += 1;
		      }
		      else
		      {
		         e += namelengthfontspan;
		      }
		      if (e >= namelengthperline && i < l - 1)
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

		var styleFunction = function (feature, resolution)
		{
		   if (loaded == false)
		   {
		      loaded = true;
		      document.getElementById('nodes').innerHTML = vectorSource.getFeatures().length;
		   }
		   //console.log(feature.lastresolution+","+resolution);
		   //if(feature.lastresolution!=resolution)
		   //{
		   //feature.lastresolution=resolution;

		   if (resolution > 4 && tileLayer.getVisible() == true) tileLayer.setVisible(false);
		   else if (resolution <= 4 && tileLayer.getVisible() == false) refreshtile();
		   //feature.setStyle(styles[feature.getGeometry().getType()](feature, resolution));
		   //return undefined;
		   return styles[feature.getGeometry().getType()](feature, resolution);
		   //}
		   //else
		   //{
		   //return undefined;//feature.getStyle();
		   //}
		};


		//pixel projection
		var tileSize = 256;
		var projection0 = new ol.proj.Projection(
		{
		   code: 'ZOOMIFY',
		   units: 'pixel',
		   extent: [-10240, -10240, 10240, 10240],
		});
		var projection = new ol.proj.Projection(
		{
		   code: 'ZOOMIFY2',
		   units: 'pixel',
		   extent: [-10240, -10240, 10240, 10240],
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
		var mousePositionControl = new ol.control.MousePosition(
		{
		   projection: projection0,
		   coordinateFormat: ol.coordinate.createStringXY(4),
		   className: 'custom-mouse-position',
		   target: document.getElementById('mouse-position'),
		   undefinedHTML: '&nbsp;'
		});
		var projectionExtent = projection.getExtent();


		var tileLayer;
		var vectorSource;
		var vectorLayer;
		//var imageVectorSource;
		var view;
		var loaded;

		function createlayers()
		{
		   tileLayer = new ol.layer.Tile(
		   {
		      opacity: 0.25,
		      source: new ol.source.TileImage(
		      {
		         tileUrlFunction: function (tileCoord, pixelRatio, projection)
		         {
		            if (tileCoord === null) return undefined;

		            x = tileCoord[1];
		            y = -tileCoord[2] - 1;

		            return 'map/' + worlddir + '/' + x + ',' + y + '.png';
		         },
		         tileGrid: new ol.tilegrid.TileGrid(
		         {
		            extent: projectionExtent,
		            resolutions: [1],
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
		      url: 'data/' + worlddir + '.geojson',
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
		      maxResolution: 8,
		      minResolution: 1 / 8,
		      projection: projection,
		      //minZoom: 5,
		      //maxZoom: 16,
		      //zoomFactor: 1.5,
		      extent: projectionExtent
		   });
		}

		createlayers();
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
		      new ol.control.ZoomSlider(),
		      mousePositionControl
		   ],
		   view: view
		});
		//map.on('moveend', cache);
		var lastresolution;

		function cache(evt)
		{
		   /*var resolution=map.getView().getResolution();
		   console.log('cache '+resolution);
		   if(lastresolution!=resolution)
		   {
		   	lastresolution=resolution;
		   	var features=vectorSource.getFeatures();
		   	var l=features.length;
		   	for(var i=0;i<l;++i)
		   	{
		   		styleFunction(features[i],resolution);
		   	}
		   }*/
		}
		radio_r1(document.querySelector('input[name="r1"]:checked').value);

		function displaylegend(e)
		{
		   document.getElementById('legend').style.visibility = (e ? 'visible' : 'hidden');
		}

		function radio_r1(world)
		{
		   map.removeLayer(vectorLayer);
		   map.removeLayer(tileLayer);
		   worlddir = world;
		   createlayers();
		   map.addLayer(tileLayer);
		   map.addLayer(vectorLayer);
		   map.getView().setResolution(1);
		   map.getView().setCenter([203, -221]);
		   refreshtile();
		   cache();
		}

		function refreshtile(force)
		{
		   if (force === undefined) force = document.getElementById('displaybitmaptile').checked;
		   document.body.className = force ? 'bg1' : 'bg2';
		   tileLayer.setVisible(force);
		   displaylegend(document.getElementById('displaylegend').checked);
		}
		document.getElementById('search').addEventListener('keydown', function (e)
		{
		   if (e.keyCode == 13)
		   {
		      search(this.value);
		   }
		});
		var lastfind = 0;

		function search(w)
		{
		   var w = new RegExp(w, 'i');
		   var features = vectorSource.getFeatures();
		   var l = features.length;
		   var i = lastfind;
		   var searched;
		   for (;;)
		   {
		      var name = features[i].get('name');
		      if (name && w.test(name))
		      {
		         searched = features[i].getGeometry().getCoordinates();
		         lastfind = i + 1;
		         if (lastfind >= l) lastfind = 0;
		         break;
		      }
		      ++i;
		      if (i >= l) i = 0;
		      if (i == lastfind) break;
		   }
		   if (searched)
		   {
		      var pan = ol.animation.pan(
		      {
		         duration: 2000,
		         source: map.getView().getCenter()
		      });
		      //console.log(searched);
		      map.beforeRender(pan);
		      //view.setCenter(ol.proj.transform(searched,projection0,projection));
		      map.getView().setCenter(searched);
		   }
		}
		//console.log(tileLayer.getSource().getTileGrid());
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