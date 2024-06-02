const axios = require('axios');
const express = require('express');
const Color = require('color');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Function to fetch CSS file and extract colors
async function extractColorsFromCSS(url) {
    try {
        const response = await axios.get(url);
        const cssContent = response.data;
        const colorRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b/g;
        const colors = [];
        let match;

        while ((match = colorRegex.exec(cssContent)) !== null) {
            colors.push(match[0]);
        }

        return colors;
    } catch (error) {
        console.error('Error fetching CSS:', error);
        return [];
    }
}

// Function to save RGB codes to a text file
function saveRGBToFile(colors) {
    const filePath = path.join(__dirname, 'colors.txt');
    const rgbLines = colors.map(color => {
        const colorObj = Color(color);
        return `Color: ${color}, RGB: ${colorObj.rgb().string()}`;
    }).join('\n');
    
    fs.writeFileSync(filePath, rgbLines);
    console.log(`RGB codes saved to ${filePath}`);
}

// Endpoint to serve the color palette
app.get('/', async (req, res) => {
    const cssUrl = req.query.url;
    if (!cssUrl) {
        res.send('Please provide a CSS URL using the "url" query parameter.');
        return;
    }
    
    const colors = await extractColorsFromCSS(cssUrl);
    
    // Save RGB codes to a file
    saveRGBToFile(colors);

    // Generate HTML content
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Color Palette</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .color { display: inline-block; width: 100px; height: 100px; margin: 10px; }
                .color-info { text-align: center; margin-top: 10px; }
            </style>
        </head>
        <body>
            <h1>Color Palette</h1>
            <div class="palette">
    `;

    colors.forEach(color => {
        const colorObj = Color(color);
        htmlContent += `
            <div class="color" style="background-color: ${color};">
                <div class="color-info">${color}</div>
                <div class="color-info">RGB: ${colorObj.rgb().string()}</div>
                <div class="color-info">HSL: ${colorObj.hsl().string()}</div>
            </div>
        `;
    });

    htmlContent += `
            </div>
        </body>
        </html>
    `;

    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Color palette generator running at http://localhost:${port}`);
});
