class MusicQueue {

    constructor() {
        this.queue = [];
        this.current = null;
        this.loop = false;
        this.volume = 100;
    }

    add(song) {
        this.queue.push(song);
    }

    next() {
        if (this.loop && this.current)
            return this.current;

        this.current = this.queue.shift() || null;
        return this.current;
    }

    clear() {
        this.queue = [];
        this.current = null;
    }

    skip() {
        return this.next();
    }

    size() {
        return this.queue.length;
    }

    list() {
        return this.queue;
    }
}

module.exports = MusicQueue;