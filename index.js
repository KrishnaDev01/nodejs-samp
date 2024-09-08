const express = require("express");
const query = require("samp-query");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/samp/details/:ip/:port", (req, res) => {
    const options = {
        host: req.params.ip,
        port: req.params.port
    };
    
    query(options, (error, results) => {
        if (res.headersSent) {
            return; // Prevent sending multiple responses
        }
        if (error) {
            return res.status(400).send({ message: "ไม่สามารถขอข้อมูลได้: " + error });
        }
        res.status(200).send(results);
    });
});


// Route to serve the index.html file
app.get("/", async (req, res) => {
    try {
        const filePath = path.join(__dirname, "index.html");
        const file = await fs.readFile(filePath, "utf8");
        res.send(file);
    } catch (error) {
        res.status(500).send("ไม่สามารถโหลดหน้าได้");
    }
});

// Custom 404 page
app.use((req, res) => {
    res.redirect("/")
});

// Start the server
app.listen(3000, () => {
    console.log("Hello, Server Running On port 3000");
});
