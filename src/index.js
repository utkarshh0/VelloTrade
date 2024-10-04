const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
    return res.json({
        "msg" : "Heylo"
    })
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))