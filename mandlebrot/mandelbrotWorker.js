// Function to calculate whether a point is in the Mandelbrot set
function mandelbrot(c, maxIterations) {
    let zr = 0, zi = 0, zr2 = 0, zi2 = 0;
    for (let i = 0; i < maxIterations; i++) {
        zi = 2 * zr * zi + c[1];
        zr = zr2 - zi2 + c[0];
        zr2 = zr * zr;
        zi2 = zi * zi;
        if (zr2 + zi2 > 4) {
            return i / maxIterations;
        }
    }
    return 1; // Point is in the Mandelbrot set
}

// Listen for messages from the main thread
self.onmessage = function(e) {
    const { x0, y0, tileSize, xScale, yScale, maxIterations, tileId } = e.data;
    const result = new Float32Array(tileSize * tileSize); // Store the result for each pixel

    // Loop through each pixel and calculate its Mandelbrot value
    for (let x = 0; x < tileSize; x++) {
        for (let y = 0; y < tileSize; y++) {
            const real = x0 + (x / tileSize) * xScale;
            const imaginary = y0 + (y / tileSize) * yScale;
            result[y * tileSize + x] = mandelbrot([real, imaginary], maxIterations);
        }
    }

    // Send the result and the tile ID back to the main thread
    self.postMessage({ result: result, tileId: tileId });
};
