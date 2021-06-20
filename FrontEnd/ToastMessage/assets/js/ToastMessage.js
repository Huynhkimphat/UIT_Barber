// A $( document ).ready() block.
$(document).ready(function () {

    // Success Message
    $("#showSuccessToast").click(function () {
        $('.successToast').toast('show');
    });

    // Error Message
    $("#showErrorToast").click(function () {
        $('.errorToast').toast('show');
    });

    // Info Message
    $("#showInfoToast").click(function () {
        $('.infoToast').toast('show');
    });

    // Warning Message
    $("#showWarningToast").click(function () {
        $('.warningToast').toast('show');
    });
});