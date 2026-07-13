const windows = new Map();

function rateLimit({ windowMs = 15 * 60 * 1000, max = 10 } = {}) {
  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const entry = windows.get(key);
    const current = !entry || entry.resetAt <= now ? { count: 0, resetAt: now + windowMs } : entry;
    current.count += 1;
    windows.set(key, current);
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", Math.max(0, max - current.count));
    if (current.count > max) {
      res.setHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000));
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }
    next();
  };
}

module.exports = rateLimit;
