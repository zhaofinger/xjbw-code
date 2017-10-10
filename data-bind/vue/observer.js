const observe = data => {
	if (!data || typeof data !== 'object') {
		return;
	}
	/* 遍历所有属性 */
	Object.keys(data).forEach(key => {
		defineReactive(data, key, data[key]);
	});
};

const defineReactive = (data, key, val) => {
	observe(val);								// 监听子属性
	Object.defineProperty(data, key, {
		enumerable: true,						// 可枚举
		configurable: false,					// 不能再define
		get() {
			return val;
		},
		set(newVal) {
			if (val === newVal) {
				return;
			}
			console.log(val, '变成了', newVal);
			val = newVal;
		}
	});
};

let data = { name: 'zhao' };
observe(data);
data.name = 'finger';