import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let createNewPackageService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.name || !data.imageBase64 || !data.descriptionHTML ||
                        !data.descriptionMarkdown || !data.address || !data.price || !data.description) {
                        resolve({
                              errCode: 1,
                              errMessage: 'Missing parameters'
                        })
                  } else {

                        await db.Package.create({
                              name: data.name,
                              price: data.price,
                              address: data.address,
                              image: data.imageBase64,
                              description: data.description,
                              descriptionHTML: data.descriptionHTML,
                              descriptionMarkdown: data.descriptionMarkdown,
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

let getAllPackageService = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let data = await db.Package.findAll();

                  if (data && data.length > 0) {
                        data.map(item => {
                              item.image = new Buffer(item.image, 'base64').toString('binary');
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

let getDetailClinicByIdService = (inputId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!inputId) {
                        resolve({
                              errCode: 1,
                              errMessage: 'Missing parameters'
                        })
                  } else {
                        let data = await db.Package.findOne({
                              where: {
                                    id: inputId
                              },
                              attributes: ['name', 'image', 'address', 'price', 'description', 'descriptionHTML', 'descriptionMarkdown']
                        })

                        if (data && data.image) {
                              data.image = new Buffer(data.image, 'base64').toString('binary');
                        }

                        if (!data) data = {};

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

let bulkCreateSchedulePackageService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.arrSchedulePackage || !data.packageId || !data.formatedDate) {
                        resolve({
                              errCode: 1,
                              errMessage: 'Missing required parameters'
                        })
                  } else {
                        let schedulePackage = data.arrSchedulePackage;
                        if (schedulePackage && schedulePackage.length > 0) {
                              schedulePackage = schedulePackage.map(item => {
                                    item.maxNumber = MAX_NUMBER_SCHEDULE;
                                    return item;
                              })
                        }

                        // get all existing data 
                        let existing = await db.Package_Schedule.findAll(
                              {
                                    where: { packageId: data.packageId, date: data.formatedDate },
                                    attributes: ['timeType', 'date', 'packageId', 'maxNumber'],
                                    raw: true
                              }
                        );

                        //compare differenceWith
                        let toCreate = _.differenceWith(schedulePackage, existing, (a, b) => {
                              return a.timeType === b.timeType && +a.date === +b.date;
                        });

                        //create data
                        if (toCreate && toCreate.length > 0) {
                              await db.Package_Schedule.bulkCreate(toCreate);
                        }
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

let getSchedulePackageByDateService = (packageIdId, date) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!packageIdId || !date) {
                        resolve({
                              errCode: 1,
                              errMessage: 'Missing required parameters'
                        })
                  } else {
                        let dataSchedulePackage = await db.Package_Schedule.findAll({
                              where: {
                                    packageIdId: packageIdId,
                                    date: date
                              },
                              include: [
                                    { model: db.Allcode, as: 'timeTypeDataPackage', attributes: ['valueEn', 'valueVi'] },
                                    { model: db.Package, as: 'packageData', attributes: ['name'] },
                              ],
                              raw: false,
                              nest: true
                        })
                        console.log('check dataSchedulePackage', dataSchedulePackage)

                        if (!dataSchedulePackage) dataSchedulePackage = [];

                        resolve({
                              errCode: 0,
                              data: dataSchedulePackage
                        })
                  }

            } catch (e) {
                  reject(e);
            }
      })
}

module.exports = {
      createNewPackageService: createNewPackageService,
      getAllPackageService: getAllPackageService,
      getDetailClinicByIdService: getDetailClinicByIdService,
      bulkCreateSchedulePackageService: bulkCreateSchedulePackageService,
      getSchedulePackageByDateService: getSchedulePackageByDateService
}