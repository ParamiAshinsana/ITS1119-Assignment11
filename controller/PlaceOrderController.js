import {PlaceOrderModel} from "../model/PlaceOrderModel.js";
import {order_db} from "../db/db.js";

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
});