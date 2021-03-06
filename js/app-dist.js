"use strict";

function showData(a) {
    useProxy && $.ajaxPrefilter(function(a) {
        a.crossDomain && jQuery.support.cors && (a.url = "https://cors-anywhere.herokuapp.com/" + a.url);
    }), $.ajax({
        url: a,
        dataType: "json",
        beforeSend: function() {
            $(".loader").show(), $(".count").hide(), $(".loader").addClass("animate"), $(".count").removeClass("animate");
        },
        success: function(t) {
            $("#total>div,#new>div").each(function() {
                var a;
                a = worldwide ? t.results[0][$(this)[0].id].toLocaleString() : t.countrydata[0][$(this)[0].id].toLocaleString(),
                $(this).find(".count").text(a);
            }), $(".loader").hide(), $(".count").show(), $(".loader").removeClass("animate"),
            $(".count").addClass("animate");
        }
    });
}

var worldwide = !1, url = new URL(document.location), params = url.searchParams, countryID = params.get("country"), apiURL = "https://thevirustracker.com/free-api", useProxy = !0;

countryID = countryID && 0 < $("#country option[value=" + countryID.toUpperCase() + "]").length ? countryID.toUpperCase() : "WW",
$(document).ready(function() {
    $("#country").val(countryID), "WW" == countryID ? (worldwide = !0, showData(apiURL + "?global=stats")) : showData(apiURL + "?countryTotal=" + countryID),
    $("#country").on("change", function() {
        worldwide = !1;
        var a = $(this).val();
        "WW" == a ? (worldwide = !0, showData(apiURL + "?global=stats")) : showData(apiURL + "?countryTotal=" + a),
        params.set("country", a), window.history.replaceState({}, "", "?country=" + a);
    });
    var a = .1;
    $(".has-animation").each(function() {
        $(this).css("transition-delay", a + "s"), $(this).removeClass("has-animation"),
        a += .1;
    });
});
