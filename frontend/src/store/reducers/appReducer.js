
const initContentOfConfirmModal = {
    isOpen: false
}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default appReducer;