window.onload = function() {
    // 顶部通栏效果：
    // 一开始透明，拖动到导航栏后逐渐变成不透明
    headerScroll();

    // 轮播图
    banner();

    // 倒计时
    countDown();

}

function headerScroll() {
    // 导航栏高度
    var navi = document.querySelector('.jd_nav');
    var header = document.querySelector('.jd_header');
    // 从顶部到导航栏底部的距离即是要变化的距离
    maxDistance = navi.offsetHeight + navi.offsetTop;

    header.style.backgroundColor = 'rgba(201,21,35,0)';

    window.onscroll = function() {
        // 获取滚动距离
        var scrollDistance = window.document.body.scrollTop;
        // console.log(scrollDistance);
        // 计算出的比例（0-1）就可以直接应用到透明度的修改上
        var percentage = scrollDistance / maxDistance;

        // 如果比例大于1说明已经完全不透明，直接赋值1
        if (percentage > 1) percentage = 1;

        header.style.backgroundColor = 'rgba(201,21,35,' + percentage + ')';
    }

}

function countDown() {
    // 倒计时的总时间
    totalHour = 3;
    totalSec = totalHour * 60 * 60;
    var timeArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
    // console.log(timeArr);

    // 用定时器
    var timer = setInterval(function() {
        // 倒计时完毕清除定时器
        if (totalSec <= 0) {
            clearInterval(timer);
            return;
        }

        totalSec--;
        remainHour = Math.floor(totalSec / 3600);
        remainMin = Math.floor(totalSec % 3600 / 60);
        remainSec = totalSec % 60;

        // 显示的小时数
        timeArr[0].innerHTML = Math.floor(remainHour / 10);
        timeArr[1].innerHTML = remainHour % 10;
        // 显示的分钟数
        timeArr[3].innerHTML = Math.floor(remainMin / 10);
        timeArr[4].innerHTML = remainMin % 10;
        // 显示的秒数
        timeArr[6].innerHTML = Math.floor(remainSec / 10);
        timeArr[7].innerHTML = remainSec % 10;

    }, 1000);

}

function banner() {
    var bannerImgs = document.querySelector('.banner_images');
    var indexLiArr = document.querySelectorAll('.banner_index li');
    // body的宽度即是每张图的宽度
    var width = document.body.offsetWidth;
    // 设置过渡
    transitionOn();

    // 索引从1开始，因为索引为0的是为了无限轮播放置的最后一张图片
    var index = 1;
    // 自动轮播
    initTimer();

    // 过渡结束事件
    bannerImgs.addEventListener('webkitTransitionEnd', function() {
        if (index > 8) {
            index = 1;
            // 向右移动到最后一张时，关闭过渡并瞬移到第一张
            transitionOff();
            bannerImgs.style.transform = 'translateX(' + (-index * width) + 'px)';

        } else if (index < 1) {
            index = 8;
            // 从第一张向左移动到时，关闭过渡并瞬移到最后一张
            transitionOff();
            bannerImgs.style.transform = 'translateX(' + (-index * width) + 'px)';
        }

        console.log(index);

        // 修改底部小圆点
        // 先清空所有
        for (var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].classList.remove('current');
        }
        // 再为当前的添加
        indexLiArr[index - 1].classList.add('current');

    })

    // 手动切换
    var startX = 0;
    var moveX = 0;
    // touchstart，touchmove和touchend只在移动端触发
    bannerImgs.addEventListener('touchstart', function(event) {
        // 手动切换时清除自动轮播的定时器
        clearInterval(timer);

        // 清除过渡效果使得图片跟随手指移动时不延迟
        transitionOff();

        startX = event.touches[0].clientX;
    })

    bannerImgs.addEventListener('touchmove', function(event) {
        moveX = event.touches[0].clientX - startX;

        // -index*width是原本移动的距离
        bannerImgs.style.transform = 'translateX(' + (moveX - index * width) + 'px)';

    })

    bannerImgs.addEventListener('touchend', function(event) {
        // 松开手指恢复设定滑动过渡效果
        transitionOn();

        if (Math.abs(moveX) < (width / 2)) {
            // 如果向左或向右的移动值没有大于图片的一半，则滑回原本的图片
            bannerImgs.style.transform = 'translateX(' + (-index * width) + 'px)';
        } else {
            // 否则判断是向左滑动还是向右滑动一幅图
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            bannerImgs.style.transform = 'translateX(' + (-index * width) + 'px)';
        }
        // 松开手指后重新开启定时器
        initTimer();

    })

    function initTimer() {
        timer = setInterval(function() {
            index++;

            transitionOn();

            bannerImgs.style.transform = 'translateX(-' + index * width + 'px)';

        }, 2000);
    }

    function transitionOn() {
        bannerImgs.style.transition = 'all 0.3s';
    }

    function transitionOff() {
        bannerImgs.style.transition = '';
    }

}
