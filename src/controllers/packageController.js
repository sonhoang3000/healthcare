import packageService from '../services/packageService'

let createNewPackage = async (req, res) => {
      try {
            let infor = await packageService.createNewPackageService(req.body);
            return res.status(200).json(infor)
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: 'Error from the server'
            })
      }
}

let getAllPackage = async (req, res) => {
      try {
            let infor = await packageService.getAllPackageService();
            return res.status(200).json(infor)

      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: 'Error from the server'
            })
      }
}

let getDetailPackageById = async (req, res) => {
      try {
            let infor = await packageService.getDetailClinicByIdService(req.query.id);
            return res.status(200).json(infor)

      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: 'Error from the server'
            })
      }
}

let bulkCreateSchedulePackage = async (req, res) => {
      try {
            let infor = await packageService.bulkCreateSchedulePackageService(req.body);
            return res.status(200).json(
                  infor
            )

      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: 'Error from the server packages'
            })
      }
}

let getSchedulePackageByDate = async (req, res) => {
      try {
            let infor = await packageService.getSchedulePackageByDateService(req.query.packageId, req.query.date);
            return res.status(200).json(infor)

      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: 'Error from the server getSchedulePackageByDate'
            })
      }
}

module.exports = {
      createNewPackage: createNewPackage,
      getAllPackage: getAllPackage,
      getDetailPackageById: getDetailPackageById,
      bulkCreateSchedulePackage: bulkCreateSchedulePackage,
      getSchedulePackageByDate: getSchedulePackageByDate
}