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

// ----Submit----------------------------------------------------------------------------
$("#student-btns>button[type='button']").eq(0).on("click", () => {
    // collect data from the array
    let student_id = $("#student-id").val();
    let first_name = $("#first-name").val();
    let last_name = $("#last-name").val();
    let email = $("#email").val();
    let mobile = $("#mobile").val();
    let address = $("#address").val();
    let program = $("input[name='flexRadioDefault']:checked").val();

    let cust_id = $("#id").val();
    let cust_name = $("#customer_name").val();
    let cust_address = $("#customer_address").val();
    let cust_mobile = $("#customer_mobile").val();


    if(student_id) {
        if(first_name) {
            if(last_name) {

                var emailValid = emailPattern.test(email);

                if(email && emailValid) {

                    var mobileValid = regMobile.test(mobile);

                    if(mobile && mobileValid) {
                        if(address) {
                            let student_obj = new StudentModel(student_id, first_name, last_name, email, mobile, address, program);
                            // save in the db
                            student_db.push(student_obj);

                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Student saved successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            // clear();
                            $("#student-btns>button[type='reset']").click();

                            // load student data
                            loadStudentData();

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Invalid Input',
                                text: 'Please enter student Address'
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Input',
                            text: 'Please enter valid student Mobile'
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Input',
                        text: 'Please enter valid student Email'
                    })
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter student Last Name'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter student First Name'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter student id'
        })
    }



    if(cust_id){
        if(cust_name){
           if(cust_address){
               var mobileValid = regMobile.test(cust_mobile);

               if(cust_mobile && mobileValid){

               }else{

               }
           }else{

           }
        }else{

        }
    }else{

    }

});