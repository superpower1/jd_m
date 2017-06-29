window.onload = function () {
	left_scroll();
	right_scroll();
}

function left_scroll() {
	var leftSider = document.querySelector('.main_left');
	var header = document.querySelector('.header');

	var leftHight = leftSider.offsetHeight;
	var bodyHight = document.body.offsetHeight;
	var headerHight = header.offsetHeight;
	// 初始位置是最大值
	var max = 0;
	// 向下移动到底部就是最小值
	var min = bodyHight - leftHight - headerHight;
	// 定义一个额外可以移动的距离以实现吸附效果
	var extra = 100;
	var distanceY = 0;

	leftSider.addEventListener('touchstart', function(event) {
		startY = event.touches[0].clientY;
		// 关闭过渡效果使其紧跟着手指动
		transitionOff();
	})

	leftSider.addEventListener('touchmove', function(event) {

		moveY = event.touches[0].clientY - startY;

		if ((moveY+distanceY) > (max+extra)) {
			moveY = 0;
			distanceY = max+extra;
		} else if ((moveY+distanceY) < (min-extra)) {
			moveY = 0;
			distanceY = min-extra;
		}
		// 移动的最大距离是（最大值+超出阈值），最小距离是（最小值-超出阈值）
		leftSider.style.transform = 'translateY('+(moveY+distanceY)+'px)';
	})

	leftSider.addEventListener('touchend', function(event) {
		distanceY += moveY;
		// 开启过渡效果
		transitionOn();
		// 如果超出了回到最大值或最小值
		if (distanceY > max) {
			leftSider.style.transform = 'translateY('+max+'px)';
			distanceY = max;
		} else if (distanceY < min){
			leftSider.style.transform = 'translateY('+min+'px)';
			distanceY = min;
		}
		


	})

	function transitionOn() {
        leftSider.style.transition = 'all 0.3s';
    }

    function transitionOff() {
        leftSider.style.transition = '';
    }

}

function right_scroll() {
	var rightSider = document.querySelector('.main_right');
}