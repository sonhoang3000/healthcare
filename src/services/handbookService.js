const db = require("../models")


let createHandbook = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {

                        resolve({
                              errCode: 1,
                              errMessage: 'Missing parameters'
                        })
                  } else {
                        await db.Handbook.create({
                              name: data.name,
                              image: data.imageBase64,
                              descriptionHTML: data.descriptionHTML,
                              descriptionMarkdown: data.descriptionMarkdown
                        })

                        resolve({
                              errCode: 0,
                              errMessage: 'OK'
                        })
                  }
            } catch (e) {
                  reject(e)
            }
      })
}

let getAllHandbook = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let data = await db.Handbook.findAll({

                  });

                  // encode :file => binary , decode binary => string 

                  if (data && data.length > 0) {
                        data.map(item => {
                              item.image = new Buffer(item.image, 'base64').toString('binary');
                              //BLOB => binary duoi dang base 64 (chuoi~ string)
                              return item;
                        })
                  }
                  resolve({
                        errMessage: 'OK',
                        errCode: 0,
                        data
                  })
            } catch (e) {
                  reject(e)
            }
      })
}

let getDetailHandbookById = (inputId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!inputId) {
                        resolve({
                              errCode: 1,
                              errMessage: 'Missing parameters'
                        })
                  } else {
                        let data = await db.Handbook.findOne({
                              where: {
                                    id: inputId
                              },
                              attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                        })

                        if (data) {
                              let doctorHandbook = [];
                              doctorHandbook = await db.Doctor_Infor.findAll({
                                    where: { clinicId: inputId },
                                    attributes: ['doctorId',]
                              })
                              data.doctorHandbook = doctorHandbook;

                        } else data = {}

                        resolve({
                              errMessage: 'OK',
                              errCode: 0,
                              data
                        })
                  }
            } catch (e) {
                  reject(e)
            }
      })
}

module.exports = {
      createHandbook: createHandbook,
      getAllHandbook: getAllHandbook,
      getDetailHandbookById: getDetailHandbookById
}