window.addEventListener('load', function () {
	let timer = new AdvancedTimer(".timer", 5000, 0);
	timer.start();

	document.querySelector(".getSale").addEventListener("click", () => {
		timer.stop();
	});
});

class BaseTimer {
	constructor(selector, time) {
		this.box = document.querySelector(selector);
		this.time = time;
		this.interval = null;
	}

	start() {
		this.render();
		this.interval = setInterval(() => {
			this.tick();
		}, 1000);
	}

	stop() {
		clearInterval(this.interval);
	}

	tick() {
		this.time--;
		this.render();

		if (this.time < 1) {
			this.stop();
		}
	}

	render() {
		this.box.innerHTML = this.time;
	}
}
class AdvancedTimer extends BaseTimer {
	constructor(selector, time, stopTime) {
		super(selector, time);
		this.stopTime = stopTime;
	}

	splitTime() {
		let h = parseInt(this.time / 3600); // seconds / 3600 = hours
		let hs = this.time % 3600; // seconds % 3600 = remainder of the division
		let m = parseInt(hs / 60); // remainder / 60 = minutes
		let s = hs % 60; // remainder % 60 = remaining seconds

		return { h, m, s };
	}

	render() {
		let { h, m, s } = this.splitTime();

		let hw = this.wordVariants(h, "час", "часа", "часов"),
			mw = this.wordVariants(m, "минута", "минуты", "минут"),
			sw = this.wordVariants(s, "секунда", "секунды", "секунд");


		this.box.innerHTML = `
		<div class="timer__wrap__item">
			<div class="timer__item">
				<div class="time">
				${h < 10 ? `0${h}` : h}
				<div class="timer__name">${hw}</div>
				</div>:
			</div>
		</div>
		<div class="timer__wrap__item">
			<div class="timer__item">
				<div class="time">
				${m < 10 ? `0${m}` : m}
				<div class="timer__name">${mw}</div>
				</div>:
			</div>
		</div>
		<div class="timer__wrap__item">
			<div class="timer__item">
				<div class="time">
				${s < 10 ? `0${s}` : s}
				<div class="timer__name">${sw}</div>
				</div>
			</div>
		</div>
		`;

	}

	tick() {
		this.time--;
		this.render();

		if (this.time <= this.stopTime) {
			this.stop();
		}
	}

	wordVariants(number, variant1, variant234, variantOther) {
		let timeMod10 = number % 10; // last numb
		let timeMod100 = number % 100; // last 2 numbs
		let wordEnd = "";

		if (timeMod100 >= 11 && timeMod100 <= 14) {
			wordEnd = variantOther;
		}
		else if (timeMod10 == 1) {
			wordEnd = variant1;
		}
		else if (timeMod10 >= 2 && timeMod10 <= 4) {
			wordEnd = variant234;
		}
		else {
			wordEnd = variantOther;
		}

		return wordEnd;
	}
}


