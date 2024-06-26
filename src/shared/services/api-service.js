import httpCommon from "../http-common/http-common";

class APIService {
    postLogInOwner(data) {
        return httpCommon.post("/API/Owner/Login", data)
    }
    postRegisterOwner(data) {
        return httpCommon.post("/API/Owner/Register", data)
    }
    deleteOwner(id){
        return httpCommon.delete(`/API/Owner/${id}`)
    }
    postCustomer(data) {
        return httpCommon.post("/API/Customer", data)
    }
    putCustomer(data) {
        return httpCommon.put("/API/Customer", data)
    }
    getCustomer(id){
        return httpCommon.get(`/API/Customer/${id}`)
    }
    deleteCustomer(id){
        return httpCommon.delete(`/API/Customer/${id}`)
    }
    putBalanceCustomer(id){
        return httpCommon.put(`/API/Customer/Balance/${id}`)
    }
    postBill(data){
        return httpCommon.post("/API/Bill", data)
    }
    getNominalBill(id){
        return httpCommon.get(`/API/Bill/Nominal/${id}`)
    }
    getEffectiveBill(id){
        return httpCommon.get(`/API/Bill/Effective/${id}`)
    }
    getFrenchBill(id){
        return httpCommon.get(`/API/Bill/French/${id}`)
    }
    getBill(id){
        return httpCommon.get(`/API/Bill/${id}`)
    }
    deleteBill(id){
        return httpCommon.delete(`/API/Bill/${id}`)
    }
    putBalanceBill(id){
        return httpCommon.put(`/Api/Bill/Balance/${id}`)
    }
    getTransfer(id){
        return httpCommon.get(`/API/Transfer/${id}`)
    }
    postTransfer(data){
        return httpCommon.post("/API/Transfer", data)
    }
    deleteTransfer(id){
        return httpCommon.delete(`/API/Transfer/${id}`)
    }

}

export default new APIService()