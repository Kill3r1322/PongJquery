$(function() {
    $("#darkMode").click(function() {
        $("body").removeClass("light").addClass("dark");
        $("div").removeClass("light").addClass("dark");
    });
});
$(function() {
    $("#lightMode").click(function() {
        $("body").removeClass("dark").addClass("light");
        $("div").removeClass("dark").addClass("light");
    });
});