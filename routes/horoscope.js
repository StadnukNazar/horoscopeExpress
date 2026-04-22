import express from "express";
const router = express.Router();
import db from "../db/connector.js";

router.get('/', async function(req, res, next) {
    try {
        const result = await db.query('SELECT * FROM horoscope');
        res.render('horoscope', { horoscope: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Помилка бази даних");
    }
});

router.get('/generate', (req, res) => {
    res.render('generate_form'); 
});

router.post('/generate', async (req, res) => {
    const { sign } = req.body;
    const month = ``;
    const text = `Для знаку ${sign} сьогодні буде чудовий день!`;

    try {
        await db.query(
            'INSERT INTO horoscope (sign, month, text) VALUES ($1, $2, $3)'
            [sign, month, text]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Помилка при збереженні");
    }
});

export default router;
