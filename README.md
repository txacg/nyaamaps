##Intro
此项目使用 Openlayers 3 + GeoJSON 显示基于 voxelmap ( for Minecraft ) 和 Waypoint 转换的 [地形图]，超细分的 [地点标记] 以及 [路线图]。

关于转换的方式，参阅 Used Tools & Libraries

##Usage

* 通过顶部 *search* 定位路径点/路径
* 可开启/关闭Tile,Vector,User图层
* 缩放和全屏的功能。
* 热键：上下左右＋－  Alt+Shift+Drag
* 放大显示出更细节的物体命名，缩小自动隐藏。

##Source
矢量数据通过 voxelmap 的路径点转换（命名约定参阅 voxelmap_namingconvention.md ）。因此比较精确的和地图匹配（考虑要不要通过不同颜色来标识y轴数据，不过也不是太需要的样子）。

## Data
####包含世界：
* world (主世界)
* world_nether (下界)

####分类
* A
  * #F8F8F8 城市/村落
* B
  * #F8F8F8 地区
  * #A16946 商业区
* C
  * #B8B8B8 大型建筑；未分类建筑
  * #BA8BAF 下界传送门（串流到其它传送门的标记-X）；瞬时传送牌
  * #7CAFC2 车站，地铁站，中转站，停靠点；
  * #86C1B9 标识牌，Flag；
* D
  * #A1B56C 农场，牧场
  * #DC9656 私人住宅名称；未居住房屋
  * #B8B8B8 公共设施；未完成建筑；废弃建筑；有命名的区域；非自然生成的海底建筑
  * #A16946 商店和所属人，市场，回收站；Villager
  * #AB4642 有装备，食品，建材或值得注意的地点；地牢
  * #996A67 坑，摔落点，地下通路入口
* 路径
  * #A8A8A8 铁路
  * #CC8646 人工建造的路径
  * #80542C 地下通路
配色方案基于 Base16 的扩展

##Naming convention
* TELE-TO-A = 到A的传送点
* TELE-A = 下界传送门（当前地点A）
* TELE-A-X-B = 下界传送门（当前地点A，传回来会到地点B）
* ?开头，?结束的地址是不确定名字
* 有 (e) 标记的名称 = 空房
* 有 uncon 标记的名称 = Under Construction
* 灰色的Node是没有经过归类的建筑

## Progress
* 2016.1.1 - 2016.1-31: path node data & program finished
* 2016.2.4 Test Preview
* 2016.2.5 Preview
* 2016.2.8 1st Release
* 2016.2.18
 - Add Arrow & + - Hotkeys
 - add mouse click event
 - Better search
 - Better view
* 2016.2.23
 - Fix memory leak issues
* 2016.2.24
 - Mouse hover Tooltips
 - Categorized tooltip title
* 2016.2.25
 - Mouse hover lag fix

## Used Tools & Libraries
* [voxelmap2geojson (another repository by Miz)](https://github.com/Mizilse/voxelmap2geojson)
* [GeoJson](http://geojson.org/)
* [OpenLayers 3](http://openlayers.org/)
* [Dia Diagram Editor](http://dia-installer.de/)
* [ImageMagick](http://www.imagemagick.org/)

## Licence
* program: GNU GPLv3
