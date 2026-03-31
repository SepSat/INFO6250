const administrator = { melon: "admin", cat: "superuser" };

function isValidAdministrator(administratorName) {
    let isValid = true;
    isValid = isValid && administrator[administratorName];
    return isValid;
}
function checkAdminLevel(administratorName) {
    return administrator[administratorName] || "";
}

export default {
    isValidAdministrator,
    checkAdminLevel,
    administrator,
};