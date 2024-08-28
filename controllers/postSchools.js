const dbConnection = require('../config/databaseConnection');
exports.postSchool = (req,res) => {
    try {
        const {name, address, latitude, longitude} = req.body;
        if(!name || !address || !latitude || !longitude) {
            return res.status(422).json({
                message:'Fill all fields!',
            });
        } 
        const lati = parseFloat(latitude);
        const longi = parseFloat(longitude);
        if(isNaN(lati) || isNaN(longi)) {
            return res.status(422).json({
                message:'Enter valid latitude and longitude',
            });
        }
        const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?,?,?,?)`;
        dbConnection.query(query,[name,address,lati,longi],(err,result)=> {
            if(err) {
                return res.status(400).json({
                    message: err,
                })
            }
            return res.status(200).json({
                message: 'New school added successfully!',
                result,
            });
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error while inserting!',
        });
    }
}