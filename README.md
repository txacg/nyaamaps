#Ilse in Nyaacatland
Ilse环游世界o.o不一定实用。（<s>其实是旅行强迫症发作了|||一个月150小时在线是什么情况（</s>

##Intro
此项目使用 Openlayers 3 + GeoJSON 显示基于 voxelmap ( for Minecraft ) 和 Waypoint 转换而来的 [地形图]，超细分的 [地点标记] 以及 [路线图]。

关于转换的方式，参阅 Used Tools & Libraries

由于是私密服务器，数据仅限于用户范围公开，请参阅 Original Wiki 的链接

##Usage

* 通过顶部 *search* （定位某个人的家很方便||||但好像没什么用？
* 为了节省流量（没有图形压缩），可以关闭地形的图层，点击 *show tile layer* 显示...
* 缩放和全屏的功能。
* 放大显示出更细节的物体命名，缩小会自动隐藏。

##Source
矢量数据通过 voxelmap 的路径点转换而来（命名约定参阅 voxelmap_namingconvention.md ）。因此比较精确的和地图匹配（考虑要不要通过不同颜色来标识y轴数据，不过也不是太需要的样子）。

## Data
####包含世界：
* world (主世界)
* world_nether (下界)

####包含所有的
* 铁路；人工建造的路径；
* 农场，牧场；
* 私人住宅名称；未居住房屋；
* 公共设施；大型建筑；未完成建筑；废弃建筑；有命名的区域
* 商店和所属人，市场，回收站；Villager
* 车站，地铁站，中转站，停靠点；
* 下界传送门（串流到其它传送门的标记-X）；瞬时传送牌
* 标识牌，Flag；
* 可免费拿取的装备，食品，建材，特定道具，horse；
* 矿坑，要塞，地下通路；非系统生成的海底建筑；
* 很多无法简单的从游戏自带地图或服务器数据里辨识的有人类建造痕迹的房屋，山洞或者地下农场，补给箱等

总共 3295 个路径点 = 1599 个 Feature (2016.2.8统计)

####Description

部分在wiki无法考究的地名，很可能是依据个人感受和脑洞起的名字||；有一些没有挂牌的私人房间，根据 private 箱子和附近的标识判定的所有者；还有一些地名含有别名。 所以一定是错误百出|||如果发现可以指正。

由于是徒步旅行，地形的图形数据不完善。

除此之外，地图标记出了尽可能多**值得注意**的地方，如：未在wiki记载的玩家自建地铁，地下迷宫；一些比较难找到的下界传送门和可走的路线；未开通的地铁；大量食品建材和一些罕见的装备所在地

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

## Used Tools & Libraries
* [voxelmap2geojson (another repository by Miz)](https://github.com/Mizilse/voxelmap2geojson)
* [GeoJson](http://geojson.org/)
* [OpenLayers 3](http://openlayers.org/)

## Licence
* program: GNU GPLv3
* data: nyaa.cat玩家限定公开

## Original Wiki
* [https://wiki.nyaa.cat/](https://wiki.nyaa.cat/)
