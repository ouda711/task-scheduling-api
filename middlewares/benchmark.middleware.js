exports.benchmark =  (req, res, next) => {
    const startTime = new Date().getTime();
    res.on('finish', (event) => {
       const elapsed = (new Date().getTime() - startTime) / 1000;
       console.log(`It took ${elapsed} seconds`);
    });
    next();
    const elapsed = (new Date().getTime() - startTime) / 1000;
    res.set('X-Perf-Time', elapsed);
};