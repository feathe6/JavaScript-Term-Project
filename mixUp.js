


$(document).ready(function() {  // This first function is setting the grid for my sliced image.
var rows = 4, columns = 4;          // I am declaring three variables here. Column and Rows are declared and given the value of four. In order to
                                // create a 4 by 4, 16 square container.
var pieces = " ";                   //I also declare the variable pieces next, and set it equal to an emprty string.\
                                
for (var i = 0, top = 0; i < rows; i++, top -=100) {  //
for (var j = 0, left = 0; j < columns; j++, left -=100) {
    pieces += "<div style='background-position:" + left + "px " + top + "px;' class='piece'></div>";
}
}

$("#fixed").html(pieces);
$("#startbtn").click(function() {
var pieces = $("#fixed div");
pieces.each(function() {
    var leftPosition = 
    Math.floor(Math.random()*290) + "px";
    var topPosition = 
    Math.floor(Math.random()*290) + "px";
    $(this).addClass("puzzlePiece").css({
        position:"absolute",
        left:leftPosition,
        top:topPosition
    })
    $("#mixed").append($(this));
});
var emptyString = " "
for (var i = 0; i < rows; i++) 
{
    for (var j = 0; j < columns; j++) 
    {
        emptyString += "<div style='background-image:none;' class='piece dropspace'></div>";
    }
}
$("#fixed").html(emptyString);
$(this).hide();
$("#resetbtn").show()
gameLogic()
});
function gameLogic() {
$(".puzzlePiece").draggable();
$(".dropspace").droppable({
    hoverClass:"ui-state-highlight",
    drop:function(event,ui)
    {
        var draggableElement = ui.draggable;
        var droppedOn = $(this);
        droppedOn.addClass("piPre")
        $(draggableElement)
            .addClass("droppedP")
            .css({
                top:0,
                left:0,
                position:"relative"
            }).appendTo(droppedOn);
    }
});
}
});
