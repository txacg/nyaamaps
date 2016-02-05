#Ilse in Nyaacatland
Miz环游世界地图....不一定实用。（<s>其实是旅行强迫症发作了|||一个月150小时在线是什么情况（</s>

##Intro
这是一个通过徒步旅行制成的关于“喵窝” ( Minecraft ) 的地图作品。

####包含世界：
* world (主世界)
* world_nether (下界)

####包含所有的
* 铁路；人工建造的路径；
* 农场，牧场；
* 私人住宅名称；未居住房屋；
* 公共设施；大型建筑；未完成建筑；废弃建筑；有命名的区域
* 商店和所属人，市场，回收站；可与Villager交易的地点
* 车站，地铁站，中转站，停靠点；
* 下界传送门（串流到其它传送门的标记-X）；瞬时传送牌
* 标识牌，Flag；
* 可免费拿取的装备，食品，建材，特定道具，马；
* 矿坑，要塞，地下通路；非系统生成的海底遗迹；
* 很多肉眼难以辨识的偏远山区房屋或者地下农场等
* 一些罕见的有人类痕迹的地方

总共 3295 个路径点 = 1586 个 Feature (2016.2.4统计)

地图Snapshot为2016.1.31  

##Usage

* 通过顶部 *search* （定位某个人的家很方便||||但好像没什么用？
* 为了节省流量（没有图形压缩），可以关闭地形的图层，只看矢量层，点击 *show tile layer* 可以显示...
* 缩放和全屏的功能。为了防止客户端卡顿，缩放到最小的程度会强行隐藏地形。。
* 放大显示出更细节的物体命名，缩小会自动隐藏。

##Description

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

##Source
矢量数据通过 voxelmap 的路径点转换而来（命名约定参阅 voxelmap_namingconvention.md ）。因此比较精确的和地图匹配（考虑要不要通过不同颜色来标识y轴数据，不过也不是太需要的样子）。

可能的情况下开源或者做成可多人贡献的交互式地图会好一些（？）


## Progress
* 2016.1.1 - 2016.1-31: path node data & program finished
* 2016.2.4 Test Preview
* 2016.2.5 Preview

## Used Tools & Libraries
* [voxelmap2geojson (another repository by Miz)](https://github.com/Mizilse/voxelmap2geojson)
* [GeoJson](http://geojson.org/)
* [OpenLayers 3](http://openlayers.org/)

## Licence
* program: GNU GPLv3
* data: nyaa.cat玩家限定公开

## Preview URL:
* （由于是私密服务器，所以仅限于用户范围公开，请参阅 Original Project 的链接）

## Original Project
* [https://nyaa.cat/](https://nyaa.cat/)
* [https://wiki.nyaa.cat/](https://wiki.nyaa.cat/)
