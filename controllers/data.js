
const User = require('../models/user');

// exports.data = async (req, res) => {
//     try {
//         const { WIntech } = req.body;
//         const currentDate = new Date().toISOString().slice(0, 10); 
//         console.log('Received WIntech:', WIntech); 

//         // Validate WIntech input
//         if (typeof WIntech !== 'number') {
//             return res.status(400).json({
//                 success: false,
//                 message: "WIntech must be a number",
//             });
//         }
//         if (WIntech !== 250) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid WIntech value. Expected 250.",
//             });
//         }

       
//         const existingRecord = await User.findOne({ date: currentDate });

//         if (!existingRecord) {
//             // Create new record
//             const WaterIntech = 250;
//             if (WaterIntech > 3000) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "WaterIntech exceeds maximum capacity of 3000.",
//                 });
//             }
//             await User.create({ date: currentDate, WaterIntech });

//             return res.status(200).json({
//                 success: true,
//                 message: "Data Sent Successfully",
//             });
//         } else {
//             // Update existing record
//             const newWaterIntech = existingRecord.WaterIntech + 250;
//             if (newWaterIntech > 3000) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "WaterIntech exceeds maximum capacity of 3000.",
//                 });
//             }
//             await User.findByIdAndUpdate(existingRecord._id, { WaterIntech: newWaterIntech }, { new: true });

//             return res.status(200).json({
//                 success: true,
//                 message: "Data Updated Successfully",
//             });
//         }
//     } catch (error) {
//         console.error('Error details:', error.message); 
//         return res.status(500).json({
//             success: false,
//             message: "Error in Sending Details",
//         });
//     }
// }

// exports.data = async (req, res) => {
//     try {
//         const { WIntech } = req.body;
//         const currentDate = new Date().toISOString().slice(0, 10); 
//         const currentTime = new Date(); // Capture the current time
//         console.log('Received WIntech:', WIntech); 

//         // Validate WIntech input
//         if (typeof WIntech !== 'number') {
//             return res.status(400).json({
//                 success: false,
//                 message: "WIntech must be a number",
//             });
//         }
//         if (WIntech !== 250) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid WIntech value. Expected 250.",
//             });
//         }

//         const existingRecord = await User.findOne({ date: currentDate });

//         if (!existingRecord) {
//             // Create new record
//             const WaterIntech = 250;
//             if (WaterIntech > 3000) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "WaterIntech exceeds maximum capacity of 3000.",
//                 });
//             }
//             await User.create({ date: currentDate, WaterIntech, lastSubmission: currentTime });

//             return res.status(200).json({
//                 success: true,
//                 message: "Data Sent Successfully",
//             });
//         } else {
//             // Check if an hour has passed since the last submission
//             const oneHour = 1000 * 60 * 60; // 1 hour in milliseconds
//             const lastSubmissionTime = new Date(existingRecord.lastSubmission);
//             const timeDifference = currentTime - lastSubmissionTime;

//             if (timeDifference < oneHour) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "You must wait at least one hour before sending new data.",
//                 });
//             }

//             // Update existing record
//             const newWaterIntech = existingRecord.WaterIntech + 250;
//             if (newWaterIntech > 3000) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "WaterIntech exceeds maximum capacity of 3000.",
//                 });
//             }
//             await User.findByIdAndUpdate(existingRecord._id, { WaterIntech: newWaterIntech, lastSubmission: currentTime }, { new: true });

//             return res.status(200).json({
//                 success: true,
//                 message: "Data Updated Successfully",
//             });
//         }
//     } catch (error) {
//         console.error('Error details:', error.message); 
//         return res.status(500).json({
//             success: false,
//             message: "Error in Sending Details",
//         });
//     }
// }


// exports.getData = async (req, res)=>{
//     try {
//         // fetch all todo items
//         const data = await User.find({});
//         res.status(200).json(
//             {
//                 success: true ,
//                 data : data ,
//                 message : 'Data is fetch'
//             }
//         );
//     }
//      catch (error) {
//         console.log(error);
//         console.error(error)
//         res.status(500)
//         .json({
//             success: false ,
//             data : "Internal server error" ,
//             message : error.message
//         })
//     }
// }


exports.data = async (req, res) => {
    try {
        const { WIntech } = req.body;
        const currentDate = new Date().toISOString().slice(0, 10); 
        const currentTime = new Date();
        console.log('Received WIntech:', WIntech);

        // Validate WIntech input
        if (typeof WIntech !== 'number') {
            return res.status(400).json({
                success: false,
                message: "WIntech must be a number",
            });
        }
        if (WIntech !== 250) {
            return res.status(400).json({
                success: false,
                message: "Invalid WIntech value. Expected 250.",
            });
        }

        const existingRecord = await User.findOne({ date: currentDate });

        if (!existingRecord) {
            // Create new record if no record exists for the current day
            const WaterIntech = 250;
            if (WaterIntech > 3000) {
                return res.status(400).json({
                    success: false,
                    message: "WaterIntech exceeds maximum capacity of 3000.",
                });
            }
            await User.create({ date: currentDate, WaterIntech, lastSubmission: currentTime });

            return res.status(200).json({
                success: true,
                message: "Data Sent Successfully",
            });
        } else {
            // Check if an hour has passed since the last submission
            const oneHour = 1000 * 60 * 30; // 1 hour in milliseconds
            const lastSubmissionTime = new Date(existingRecord.lastSubmission);
            const timeDifference = currentTime - lastSubmissionTime;

            if (timeDifference < oneHour) {
                return res.status(400).json({
                    success: false,
                    message: "You must wait at least one hour before sending new data.",
                });
            }

            // Update existing record
            const newWaterIntech = existingRecord.WaterIntech + 250;
            if (newWaterIntech > 3000) {
                return res.status(400).json({
                    success: false,
                    message: "WaterIntech exceeds maximum capacity of 3000.",
                });
            }
            await User.findByIdAndUpdate(existingRecord._id, { WaterIntech: newWaterIntech, lastSubmission: currentTime }, { new: true });

            return res.status(200).json({
                success: true,
                message: "Data Updated Successfully",
            });
        }
    } catch (error) {
        console.error('Error details:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error in Sending Details",
        });
    }
}

exports.getData = async (req, res) => {
    try {
        // Fetch all records
        const data = await User.find({});
        res.status(200).json({
            success: true,
            data: data,
            message: 'Data fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
