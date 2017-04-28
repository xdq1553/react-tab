/**
 * Created by huanghaojie on 2017/4/28.
 * Tab选项卡
 */
import React, {Component} from 'react';
import './tab.css'
import $ from 'jquery';
export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.titles = [];
        this.contents = [];
        this.timer = null;//全局定时器
        this.loop = 0;//计数器
    }

    static defaultProps = {
        triggerType: "click",  //用来定义鼠标的触发类型，是click还是 mouseover
        effect: "default",         //用来定义内容切换效果,是直接切换还是淡入淡出效果
        invoke: 1,                 //默认显示第几个tab
        auto: false                //用来定义tab是否自动切换，当指定了时间间隔，就表示自动切换，且切换时间就是指定时间
    }

    componentDidMount() {
        this.titles = $('.title-ul li');//标签列表
        this.contents = $('.content-item');//内容列表
        let config = this.props;
        if (config.triggerType === "click") {
            this.handleClick();
        } else if (config.triggerType === "mouseover") {
            this.handleMouseOver();
        }
        if (this.props.auto && this.props.auto != 0) {
            this.handleAutoPaly();
            this.handleClearTimer();
        }
    }

    //鼠标点击事件
    handleClick = () => {
        let _this = this;
        this.titles.bind("click", function () {
            _this.handleInvoke($(this));
        });
    }
    //鼠标悬浮事件
    handleMouseOver = () => {
        let _this = this;
        this.titles.bind("mouseover", function () {
            _this.handleInvoke($(this));
        });
    }
    //事件驱动函数
    handleInvoke = (currentItem) => {
        let index = currentItem.index();//当前点击的item,在titles集合里的位置
        currentItem.addClass("active").siblings().removeClass("active"); //把点击的item上添加了 active class属性，并且把其他的兄弟元素的 active属性 移除
        let effect = this.props.effect;
        if (effect === "fade") {
            this.contents.eq(index).fadeIn().siblings().fadeOut();
        } else {
            this.contents.eq(index).addClass("current").siblings().removeClass("current");
        }
        //配置了自动切换，当前的loop值和当前的tab的index保持一致
        if (this.props.auto && this.props.auto != 0) {
            this.loop = index;
        }
    }
    //自动切换
    handleAutoPaly = () => {
        let auto = this.props.auto;
        let _this = this;
        let length = this.titles.length;
        let tabItem = this.titles;
        if (auto && auto != 0) {
            this.timer = window.setInterval(function () {
                _this.loop++;
                if (_this.loop >= length) {
                    _this.loop = 0;
                }
                tabItem.eq(_this.loop).trigger(_this.props.triggerType);//触发被选元素的指定事件类型。
            }, auto);
        }
    }
    //清除定时器
    handleClearTimer = () => {
        let _this = this;
        this.contents.hover(function () {
            window.clearInterval(_this.timer);
        }, function () {
            _this.handleAutoPaly();
        });
    }

//判断是否是pc
handleIsPc = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
render()
{
    return (
        <div {...this.props} className="tab">
            <ul className="title-ul">
                <li className="active"><a href="#">新闻</a></li>
                <li><a href="#">娱乐</a></li>
                <li><a href="#">电影</a></li>
                <li><a href="#">科技</a></li>
            </ul>
            <div className="content">
                <div className="content-item current"><img src="image/b.jpg"/></div>
                <div className="content-item"><img src="image/c.jpg"/></div>
                <div className="content-item"><img src="image/d.jpg"/></div>
                <div className="content-item"><img src="image/e.jpg"/></div>
            </div>
        </div>
    );
}
}