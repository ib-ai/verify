// jQuery ready function - initialize event listeners.
$(document).ready(function() {
    $('#year-role').change(function() {
        checkSubmitCriteria(); // check criteria when the dropdown has been changed.
    });
    $('#rules').click(function() {
        checkSubmitCriteria(); // check criteria when the rules button has been changed.
    });
});

// checks if the criteria to show the submit button is met.
function checkSubmitCriteria() {
    var criteriaRules = document.getElementById('rules').checked;
    var dropdownMenu = document.getElementById('year-role');
    var criteriaSelect = dropdownMenu.options[dropdownMenu.selectedIndex].value !== '__select';
    var displayType = criteriaRules && criteriaSelect ? 'inline-flex' : 'none';
    document.getElementById('ninja').style.display = displayType;
}