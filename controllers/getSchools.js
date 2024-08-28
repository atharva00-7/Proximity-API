const dbConnection = require('../config/databaseConnection');

exports.getSchools = (req,res)=>{
    try {
        const {latitude,longitude} = req.query;
        if(!latitude || !longitude) {
            return res.status(422).json({
                message: 'Wrong parameters',
            });
        }
        if(isNaN(latitude) || isNaN(longitude)) {
            return res.status(422).json({
                message: 'Incorrect parameter datatype',
            })
        }
        const lati = parseFloat(latitude);
        const longi = parseFloat(longitude);

        const query = 'SELECT *, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance FROM schools HAVING distance < 100 ORDER BY distance ASC';

        dbConnection.query(query,[lati,longi,lati],(err,result)=>{
            if(err) {
                throw err;
            }
            if(result.length ===0) {
                return res.status(200).json({
                    message: 'No schools in diameter of 100km',
                });
            } 
            res.status(200).json(result);
        })
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
        })
    }
}