export class CustomerModel{
    constructor(cust_id,cust_name,cust_mobile,cust_address){
        this._cust_id = cust_id;
        this._cust_name = cust_name;
        this._cust_mobile = cust_mobile;
        this._cust_address = cust_address;
    }

    get cust_id() {
        return this._cust_id;
    }

    set cust_id(value) {
        this._cust_id = value;
    }

    get cust_name() {
        return this._cust_name;
    }

    set cust_name(value) {
        this._cust_name = value;
    }

    get cust_mobile() {
        return this._cust_mobile;
    }

    set cust_mobile(value) {
        this._cust_mobile = value;
    }

    get cust_address() {
        return this._cust_address;
    }

    set cust_address(value) {
        this._cust_address = value;
    }
}