---
layout: post
title: CSS layout
---

##1. display 属性
*display*是CSS中最重要的用于控制布局的属性。大多数元素的默认值为**block** 和 **inline**，就是平常所说的块级元素和內连元素。

###block
一个块级元素会新开始一行并且尽可能撑满容器。块级元素，此元素前后会带有换行符。常用的块级元素为：**div**,**p**,**form**,以及HTML5中的，**section**，**header**，**footer**

###inline
一个行内元素可以在段落中<span\>像这样</span\>包裹一些文字而不会打乱段落的布局,元素前后没有换行符。

###none
另一个常用的值是**none**。通常结合Javascript来实现一些效果，它和 visibility 属性不一样。把 display 设置成 none 不会保留元素本该显示的空间，但是 visibility: hidden; 还会保留。

##2. margin
设置块级元素的**width**可以阻止它从左到右撑满整个容器。随后设置左右外边距为**auto** 来使它居中。
当浏览器的宽度小于这个元素的宽度会怎么样呢？解决这个问题的办法是将**width**，换成**max-width**。很奇怪，为什么不是min-width呢？

##3. 盒模型
{% highlight CSS %}
.simple {
  width: 500px;
  margin: 20px auto;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;
}
{% endhighlight %}

上面这段代码一样的**width**,结果得到图形却是不一样宽的。以前代代相传的终极法宝是用数学计算。现在你终于不用再这样做了，可以通过设置**box-sizing**值为**border-box**来解决:
{% highlight CSS %}
.simple {
  width: 500px;
  margin: 20px auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border: solid blue 10px;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
{% endhighlight %}
现在它们一样大了。

##4. position
为了制作更复杂的布局，我们需要讨论**position**属性。属性值为**static,relative,absolute,fixed**。我们分别看一下：

###static
**static**是默认值，satic元素表示它不会被特殊定位。

###relative
{% highlight CSS %}
.relative1 {
  position: relative;
}
{% endhighlight %}
**relative**表现得不是和**static**一样吗？如果你设置了**top,right,bottom,left**之后呢？
{% highlight CSS %}
.relative2 {
  position: relative;
  top: -20px;
  left: 20px;
  background-color: white;
  width: 500px;
}
{% endhighlight %}
现在是不是能体会到**relative**属性的表现了。另外，其他元素不会调整位置来弥补它偏离后剩下的空隙。

###fixed
一个**fixed**元素会相对于视窗来定位，这意味着即便页面滚动，它还是会停留在相同的位置。和 **relative** 一样， **top 、 right 、 bottom** 和 **left** 属性都可用。

###absolute
**absolute** 是最棘手的position值。 **absolute** 与 **fixed** 的表现类似，除了它不是相对于视窗而是相对于最近的“positioned”祖先元素。如果绝对定位（position属性的值为absolute）的元素没有 “positioned” 祖先元素，那么它是相对于文档的 body 元素，并且它会**随着页面滚动而移动**。记住一个“positioned”元素是指 **position** 值**不是** **static** 的元素。

##5. float
另一个布局中常用的CSS属性是 **float** 。**Float** 可用于实现文字环绕图片，如下：
{% highlight CSS %}
img {
  float: right;
  margin: 0 0 1em 1em;
}
{%  endhighlight%}
**float**经常和**clear**一起出现，**clear** 元素用来清除遮挡住它的 **float** 元素。

试想一下如果一个浮动元素比容器还高，它溢出到了容器外面！这该怎么办才好呢？有一种比较丑陋的方法来解决这个问题
{% highlight CSS %}
.clearfix {
  overflow: auto;
}
{%  endhighlight%}
清除浮动是一个比较难的问题，[Which method of ‘clearfix’ is best？](http://stackoverflow.com/questions/211383/which-method-of-clearfix-is-best)

##6. 媒体查询
“响应式设计（Responsive Design）”是一种让网站针对不同的浏览器和设备“响应”不同显示效果的策略，这样可以让网站在任何情况下显示的很棒！

媒体查询是做此事所需的最强大的工具。让我们使用百分比宽度来布局，然后在
浏览器变窄到无法容纳侧边栏中的菜单时，把布局显示成一列：
{% highlight CSS %}
@media screen and (min-width:600px) {
  nav {
    float: left;
    width: 25%;
  }
  section {
    margin-left: 25%;
  }
}
@media screen and (max-width:599px) {
  nav li {
    display: inline;
  }
}
{%  endhighlight%}
使用[meta viewport](https://dev.opera.com/articles/an-introduction-to-meta-viewport-and-viewport/)可以让布局在移动浏览器上显示效果更好。

###Viewport
可以在<head>标签中增加一个viewport的<meta>标签来覆盖默认的viewport 。
{% highlight HTML %}
<meta name="viewport" content="width=320, initial-scale=0.5"\>
{%  endhighlight%}
将**width**设置为320，浏览器会将内容以320px像素的宽度渲染到屏幕上。如果屏幕实际宽度为360px,内容放大到1.125倍；如果实际宽度为240px,则缩小到0.75倍。
![](https://dev.opera.com/articles/an-introduction-to-meta-viewport-and-viewport/specific-width_small.jpg) 
建议将宽度设置成设备屏幕的宽度
{% highlight HTML %}
<meta name="viewport" content="width=device-width"\>
{%  endhighlight%}
这就告诉浏览器不需要放缩，只要按照屏幕大小来渲染就好了。
![](https://dev.opera.com/articles/an-introduction-to-meta-viewport-and-viewport/device-width_small.jpg)
而initial-scale参数是来设置渲染最初的缩放比例。浏览器首先以设置的宽度进行渲染，然后再根据**initial-scale**进行缩放。
###更高DPI的屏幕
接下来我们简单看一下如何在更高DPI的屏幕下优化页面。现在移动端设备屏幕有极高的DPI。实际屏幕上的像素值和我们设置的像素值如果等同的话，那么在PC浏览器上正常显示的内容在手机屏幕上就会非常的小。也就是说1个CSS像素包含更多的设备像素。
如何解决非矢量图放大之后出现马赛克的现象呢？我们可以设置一个高像素的图，设置他的宽度为一半。在高DPI屏幕上放大2倍后，图片依然能保持清晰。

回到布局的内容。接下来我们谈一谈inline-block
##inline-block
如何创建很多网格来铺满浏览器？使用float是一种选择，将所有网格float设置为left，在利用清除浮动的clear元素让显示效果更好。现在我们有更好的选择是 **inline-block** 。将网格的display设置为 **inline-block** 就能实现这个效果，并且不需要清除浮动。使用 **inline-block** 有些你要记住:
  
* **vertical-align**属性会影响到 **inline-block**
* 你需要设置每一列的宽度
* 如果HTML源码中元素有空格，那么列与列之间会有空隙


##7. 新的CSS
CSS columns可以实现文字的分列显示，[flexbox](http://www.w3.org/TR/css3-flexbox/)的布局。


参考[CSS没有布局](http://zh.learnlayout.com/index.html)