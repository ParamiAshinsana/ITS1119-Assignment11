import {CustomerModel} from "../model/CustomerModelModel.js";
import {customer_db} from "../db/db.js";

// this variables for validations
var row_index = null;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
const regEmail = new RegExp(emailPattern);
const regMobile = new RegExp(sriLankanMobileNumberRegex);

// --------------------------------------------------------------------------------
const clear = () => {
    $("#cust_id").val("");
    $("#cust_name").val("");
    $("#cust_address").val("");
    $("#cust_mobile").val("");
}

// ----load customer data----------------------------------------------------------------------------
const loadCustomerData = () => {
    $('#customer-tbl-body').empty(); // make tbody empty
    customer_db.map((item, index) => {
        let record = `<tr><td class="cust_id">${item.cust_id}</td><td class="cust_name">${item.cust_name}</td><td class="cust_address">${item.cust_address}</td><td class="cust_mobile">${item.cust_mobile}</tr>`;
        $("#customer-tbl-body").append(record);
    });
};