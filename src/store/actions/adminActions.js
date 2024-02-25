import actionTypes from './actionTypes';
import {
      getAllCodeService,
      createNewUserService, getAllUsersService, deleteUserService, editUserService,
      getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService
} from '../../services/userService';
import { toast } from "react-toastify"

export const fetchGenderStart = () => {
      return async (dispatch, getState) => {
            try {
                  dispatch({ type: actionTypes.FETCH_GENDER_START })

                  let res = await getAllCodeService("GENDER")
                  if (res && res.errCode === 0) {
                        dispatch(fetchGenderSuccess(res.data))
                  } else {
                        dispatch(fetchGenderFailed())
                  }
            } catch (e) {
                  dispatch(fetchGenderFailed())
                  console.log("fetch Gender Start error: ", e)
            }
      }

}


export const fetchGenderSuccess = (genderData) => ({
      type: actionTypes.FETCH_GENDER_SUCCESS,
      data: genderData
})

export const fetchGenderFailed = () => ({
      type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionSuccess = (positionData) => ({
      type: actionTypes.FETCH_POSITION_SUCCESS,
      data: positionData,
})

export const fetchPositionFailed = () => ({
      type: actionTypes.FETCH_POSITION_FAILED,
})


export const fetchRoleSuccess = (roleData) => ({
      type: actionTypes.FETCH_ROLE_SUCCESS,
      data: roleData
})

export const fetchRoleFailed = () => ({
      type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllCodeService("POSITION")
                  if (res && res.errCode === 0) {
                        dispatch(fetchPositionSuccess(res.data))
                  } else {
                        dispatch(fetchPositionFailed())
                  }
            } catch (e) {
                  dispatch(fetchPositionFailed())
                  console.log("fetch Position Start error: ", e)
            }
      }

}

export const fetchRoleStart = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllCodeService("ROLE")
                  if (res && res.errCode === 0) {
                        dispatch(fetchRoleSuccess(res.data))
                  } else {
                        dispatch(fetchRoleFailed())
                  }
            } catch (e) {
                  dispatch(fetchRoleFailed())
                  console.log("fetch Role Start error: ", e)
            }
      }

}

export const createNewUser = (data) => {
      return async (dispatch, getState) => {
            try {
                  let res = await createNewUserService(data);
                  if (res && res.errCode === 0) {
                        toast.success("Create a new user succeed")
                        dispatch(saveUserSuccess())
                        dispatch(fetchAllUsersStart());
                  } else {
                        dispatch(saveUserFailed())
                  }
            } catch (e) {
                  dispatch(saveUserFailed())
                  console.log("createNewUser error: ", e)
            }
      }
}

export const saveUserSuccess = () => ({
      type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
      type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllUsersService("ALL")
                  if (res && res.errCode === 0) {
                        dispatch(fetchAllUsersSuccess(res.users.reverse()))
                  } else {
                        toast.error("Fetch all users error")
                        dispatch(fetchAllUsersFailed())
                  }
            } catch (e) {
                  toast.error("Fetch all users error")
                  dispatch(fetchAllUsersFailed())
                  console.log("fetchAllUsersFailed Start error: ", e)
            }
      }
}

export const fetchAllUsersSuccess = (data) => ({
      type: actionTypes.FETCH_ALL_USERS_SUCCESS,
      users: data
})

export const fetchAllUsersFailed = () => ({
      type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteAUser = (userId) => {
      return async (dispatch, getState) => {
            try {
                  let res = await deleteUserService(userId);
                  if (res && res.errCode === 0) {
                        toast.success("Delete a user succeed")
                        dispatch(deleteUserSuccess())
                        dispatch(fetchAllUsersStart());
                  } else {
                        toast.error("Delete a user error")
                        dispatch(deleteUserFailed())
                  }
            } catch (e) {
                  toast.error("Delete a user error")
                  dispatch(deleteUserFailed())
                  console.log("createNewUser error: ", e)
            }
      }
}

export const deleteUserSuccess = () => ({
      type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
      type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
      return async (dispatch, getState) => {
            try {
                  let res = await editUserService(data);
                  if (res && res.errCode === 0) {
                        toast.success("Update a user succeed")
                        dispatch(editUserSuccess())
                        dispatch(fetchAllUsersStart());
                  } else {
                        toast.error("Update a user error")
                        dispatch(editUserFailed())
                  }
            } catch (e) {
                  toast.error("Update a user error")
                  dispatch(editUserFailed())
                  console.log("editUserFailed error: ", e)
            }
      }
}

export const editUserSuccess = () => ({
      type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
      type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getTopDoctorHomeService('')
                  if (res && res.errCode === 0) {
                        dispatch({
                              type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                              dataDoctors: res.data
                        })
                  }
                  else {
                        dispatch({
                              type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                        })
                  }
            } catch (e) {
                  console.log('FETCH_TOP_DOCTORS_FAILED error: ', e)
                  dispatch({
                        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                  })
            }
      }
}

export const fetchAllDoctors = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllDoctors();
                  if (res && res.errCode === 0) {
                        dispatch({
                              type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                              dataDr: res.data
                        })
                  }
                  else {
                        dispatch({
                              type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                        })
                  }
            } catch (e) {
                  console.log('FETCH_ALL_DOCTORS_FAILED error: ', e)
                  dispatch({
                        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                  })
            }
      }
}

export const saveDetailDoctor = (data) => {
      return async (dispatch, getState) => {
            try {
                  let res = await saveDetailDoctorService(data);
                  if (res && res.errCode === 0) {
                        toast.success("Save infor detail doctor succeed")
                        dispatch({
                              type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                        })
                  }
                  else {
                        console.log('error detail doctor: ', res)
                        toast.error("Save infor detail doctor error")
                        dispatch({
                              type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                        })
                  }
            } catch (e) {
                  toast.error("Save infor detail doctor error")
                  console.log('SAVE_DETAIL_DOCTOR_FAILED error: ', e)
                  dispatch({
                        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                  })
            }
      }
}

export const fetchAllScheduleTime = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllCodeService('TIME');
                  if (res && res.errCode === 0) {
                        dispatch({
                              type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                              dataTime: res.data
                        })
                  }
                  else {
                        dispatch({
                              type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                        })
                  }
            } catch (e) {
                  console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED error: ', e)
                  dispatch({
                        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                  })
            }
      }
}

export const getRequiredDoctorInfor = () => {
      return async (dispatch, getState) => {
            try {
                  dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

                  let resPrice = await getAllCodeService("PRICE")
                  let resPayment = await getAllCodeService("PAYMENT")
                  let resProvince = await getAllCodeService("PROVINCE")

                  if (resPrice && resPrice.errCode === 0
                        && resPayment && resPayment.errCode === 0
                        && resProvince && resProvince.errCode === 0) {
                        let data = {
                              resPrice: resPrice.data,
                              resPayment: resPayment.data,
                              resProvince: resProvince.data,
                        }
                        dispatch(fetchRequiredDoctorInforSuccess(data))
                  } else {
                        dispatch(fetchRequiredDoctorInforFailed())
                  }
            } catch (e) {
                  dispatch(fetchRequiredDoctorInforFailed())
                  console.log("fetch DoctorPrice Start error: ", e)
            }
      }

}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
      type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
      data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
      type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})