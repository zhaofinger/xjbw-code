class XjbPromise {
	constructor(fn) {
		this.status = 'PENDING';
		try {
			fn.call(this, this.resolve.bind(this), this.reject.bind(this));
		} catch (err) {
			console.log(err);
		}

	}

	then(fn) {
		this.next = fn;
		this.nextPromise = new XjbPromise(function () { });
		if (this.status === 'FINISH') {
			return this.next(this.result);
		}
		return this.nextPromise;
	}

	resolve(result) {
		this.result = result;
		if (!this.next) {
			this.status = 'FINISH';
			return this.result;
		}
		let temp = this.next(this.result);
		if (temp instanceof XjbPromise) {
			return temp.then(res => {
				this.result = res;
				this.status = 'FINISH';
				this.nextPromise.resolve(res);
				return res;
			});
		}
		this.result = temp;
		this.nextPromise.resolve(temp);
		this.status = 'FINISH';

	}

	reject(result) {
		this.err(result);

	}

	catch(fn) {
		this.err = fn;
	}
};
