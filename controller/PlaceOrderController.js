import {PlaceOrderModel} from "../model/PlaceOrderModel.js";
import {order_db} from "../db/db.js";
import {customer_db} from "../db/db.js";
import {item_db} from "../db/db.js";

// this variables for validations
var row_index = null;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
const regEmail = new RegExp(emailPattern);
const regMobile = new RegExp(sriLankanMobileNumberRegex);



function GetTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate = dd + "-" + (MM + 1) + "-" + yyyy;

    // return currentDate;

    $("#orderDate").val(currentDate);
}
$('#place_order').click(function () {
    GetTodayDate();
    loadCustomerID();
    loadItemID()
});

function makeTotal() {
    let subTotal = $('#subTotal').text();
    let total = $('#total').text();
    let main = Number(total) + Number(subTotal);
    $('#total').text(main);
}

$('#btnSubmitOrder').click(function () {

    let total = $('#total').text();
    let cash = $('#txtCash').val();
    let discount = $('#txtDiscount').val();
    if (discount == 0) {
        let balance = cash - total;
        $('#txtBalance').val(balance);
    } else {
        let discountPrice = total / 100 * discount;
        let totalWithDiscount = total - discountPrice;
        let balance = cash - totalWithDiscount;
        $('#txtBalance').val(balance);
    }
    OrderIDAutoMake();

});

const clear = () => {
    $("#or_id").val("");
    $("#or_date").val("");
    $("#or_cId").val("");
    $("#or_cName").val("");
    $("#or_iCode").val("");
    $("#or_iName").val("");
    $("#or_price").val("");
    $("#or_qty").val("");
}

// ----load orders data----------------------------------------------------------------------------
const loadOrderData = () => {
    $('#order-tbl-body').empty(); // make tbody empty
    order_db.map((item, index) => {
        let record = `<tr><td class="or_iCode">${item.or_iCode}</td><td class="or_iName">${item.or_iName}</td><td class="or_price">${item.or_price}</td><td class="or_qty">${item.or_qty}</td><td class="total">${item.total}</td></tr>`;
        $("#order-tbl-body").append(record);
    });
};

// ----Submit------------------------------------------------------------------------------------
$("#customer-btns>button[type='button']").eq(0).on("click", () => {
    console.log("Hello-submit");
    let or_id = $("#order_id").val();
    let or_date = $("#orderDate").val();
    let or_cId = $("#oCid").val();
    let or_cName = $("#customerName").val();

    let or_iCode = $("#itemCode").val();
    let or_iName = $("#oItemName").val();
    let or_price = $("#unit_price").val();
    let or_qty = $("#qty").val();
    let total =  or_price* or_qty;

    if(or_id){
        if(or_date){
            if(or_cId){
                if(or_cName){
                    if(or_iCode){
                        if(or_iName){
                            if(or_price){
                                if(or_qty){
                                    let order_obj = new PlaceOrderModel(or_id,or_date,or_cId,or_cName,or_iCode,or_iName,or_price,or_qty,total);
                                    // save in the db
                                    order_db.push(order_obj);

                                    Swal.fire(
                                        'Success!',
                                        'Order has been saved successfully!',
                                        'success'
                                    )

                                    // clear();
                                    $("#order-btns>button[type='reset']").click();

                                    // load customer data
                                    loadOrderData();
                                }else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Invalid Input',
                                        text: 'Please enter valid Customer Mobile'
                                    })
                                }
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Invalid Input',
                                    text: 'Please enter valid Customer Mobile'
                                })
                            }
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Invalid Input',
                                text: 'Please enter valid Customer Mobile'
                            })
                        }
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Input',
                            text: 'Please enter valid Customer Mobile'
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Input',
                        text: 'Please enter valid Customer Mobile'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter valid Customer Mobile'
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter valid Customer Mobile'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid Customer Mobile'
        })
    }

});

function loadItemID() {
 console.log("item");
    $('#inputItem').empty();
    item_db.map((item, index) => {
        let record = `<option value="${item.it_code}">${item.it_code}</option>`;
        $("#inputItem").append(record);
    });
}
function loadCustomerID() {
    console.log("customer");
    $('#oCid').empty();
    customer_db.map((item, index) => {
        let record = `<option value="${item.cust_id}">${item.cust_id}</option>`;
        $("#oCid").append(record);
    });
}