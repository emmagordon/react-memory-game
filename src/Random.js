class Random {
    static choice(arr) {
        const arrIdx = Math.floor(Math.random() * arr.length);
        return arr[arrIdx];
    }

    static shuffle(arr) {
        // note this is inefficient - don't use for large arrays!
        return arr
            .map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.value);
    }
}

export default Random;
